import cheerio from 'cheerio';
import fileType from 'file-type';
import fs from 'fs';
import { first, get, identity, isArray, set, uniqWith } from 'lodash';
import memoize from 'memoizee';
import nodeFetch from 'node-fetch';
import R from 'ramda';
import { v4 as uuidv4 } from 'uuid';

import { appConfig, IAppConfig } from '@server/app/appConfig';
import { runHandlerWithTaskRunnerRole } from '@server/core/tasks/lib';
import { MONGOID } from '@server/domains/collection/lib/mongo/lib/models';
import { SUPER_ADMIN, TASK_RUNNER } from '@server/domains/lib/auth/roles';
import { contextHasSomeRole } from '@server/domains/lib/context';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import {
  EMetricCounter,
  EMetricResultLabel,
} from '@server/domains/lib/prometheus/models';
import { getDomainFromEmailAddress } from '@server/domains/threat/pipeline/lib/categorizationPolicies/becIncidentPolicy';
import {
  ICustomHeader,
  IEmailDomainMapping,
  IOrganization,
} from '@server/lib/typedSchemas/Organization/models';
import { EEmailRecordType } from '@server/lib/typedSchemas/User/models';
import { IUser } from '@server/lib/typedSchemas/User/User';
import {
  EMAIL_CERT_FILES,
  USE_SMTP_DIRECT_CONNECT,
} from '@server/tags/features';
import { inlineCss } from '@server/util/css';

import { ISmtpOptions } from './defaultEmailClient.models';
import { parseConnectionOptions } from './deliver.lib';
import { IDeliverPayload, IDeliverResult } from './deliver.models';
import {
  IAttachmentObject,
  IEmailDeliveryArgs,
  IHeader,
  IImgData,
  ISendMailOptions,
  ISentMessageInfo,
  THeaders,
} from './legacyEmailServiceModels';
import { TSendContext } from './send.models';

export const parseAddress = (to: string | string[]) => {
  if (!to) {
    throw new Error('To address is not specified for integration.email.send');
  }
  const addresses = isArray(to) ? to : to.split(',');
  if (addresses.length > 1) {
    throw new Error(
      'Currently integration.email.send can only handle single receiver'
    );
  }
  return getNormalizedEmailAddress(addresses[0]);
};

export const parseHeaders = (headers: THeaders = []): IHeader[] => {
  return isArray(headers)
    ? headers
    : Object.entries(headers)
        .map(([key, value]) => ({ key, value }))
        .filter(h => !!h);
};

export const getSendToAddress = (
  emailDomainMappings: IEmailDomainMapping[] = [],
  to: string[] | string
) => {
  const address = parseAddress(to);
  const mapping = emailDomainMappings.find(
    ({ from }) => from === address.split('@')[1]
  );

  return mapping ? address.replace(mapping.from, mapping.to) : address;
};

const getNormalizedEmailAddress = (emailAddress: string) => {
  return emailAddress.toLowerCase();
};

const getUser = async (
  ctx: TSendContext,
  emailAddress: string,
  organizationId: string
): Promise<IUser | undefined> => {
  const selector = {
    'emails.address': getNormalizedEmailAddress(emailAddress),
  };

  if (organizationId) {
    set(selector, 'organizationId', organizationId);
  }

  return ctx.handlers.collection.user
    .find(ctx, {
      params: {
        selector,
      },
    })
    .then(cursor => cursor.fetch())
    .then(first);
};

const getOrganization = (
  ctx: TSendContext,
  emailAddress: string,
  organizationId: string,
  emailType?: EEmailRecordType
) => {
  const selector =
    emailType === EEmailRecordType.THREAT_DELETED_FROM_MAILBOX
      ? { 'domains.name': getDomainFromEmailAddress(emailAddress) }
      : { 'notifications.threatEscalationEmails': emailAddress };

  if (organizationId) {
    set(selector, '_id', organizationId);
  }

  return ctx.handlers.collection.organization
    .find(ctx, {
      params: {
        selector,
      },
    })
    .then(cursor => cursor.fetch())
    .then(first);
};

/**
 * Allow sending to users in own org & some special addresses defined in org.
 * SUPER_ADMINS and TASK_RUNNER can send to any user or org.
 */
export const getUserAndOrg = async (
  ctx: TSendContext,
  emailAddress: string,
  emailType?: EEmailRecordType
) => {
  const organizationId = contextHasSomeRole(ctx, [SUPER_ADMIN, TASK_RUNNER])
    ? undefined
    : ctx.identity.organizationId;

  const user = await getUser(ctx, emailAddress, organizationId);

  const organization = await (user
    ? ctx.handlers.collection.organization.get(ctx, { id: user.organizationId })
    : getOrganization(ctx, emailAddress, organizationId, emailType));

  if (!user && !organization) {
    throw new Error(`To address is invalid (${emailAddress})`);
  }

  return {
    user,
    organization,
  };
};

const allowedImageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'bmp'];

const fetchImageData = (src: string): Promise<Partial<IImgData>> =>
  nodeFetch(src)
    .then(res => res.buffer())
    .then(buffer => ({
      content: buffer,
      src,
      ...fileType(buffer),
    }))
    .catch(e => ({ src }));

const memoizedfetchImageData = memoize(fetchImageData, {
  promise: true, // failed results are not put into cache
  maxAge: 1000 * 60 * 10, // 10 minutes
  preFetch: 0.2, // Image will be fetched again if it's accessed when < 0.2 * maxAge is remaining
});

const imagesToAttachments = async (
  wrapper: CheerioStatic,
  baseCid: string,
  existingAttachments: IAttachmentObject[]
) => {
  const attachments = [...existingAttachments];
  const imageSources = getImageSources(wrapper);
  const images = await getValidImages(
    appConfig.isTest ? fetchImageData : memoizedfetchImageData
  )(imageSources);
  // Mutate img src's to cids where image is valid & create attachments
  wrapper('img').each((i, el) => {
    const $el = wrapper(el);
    const imgIndex = images.findIndex(({ src }) => src === $el.attr('src'));
    if (imgIndex !== -1) {
      const img = images[imgIndex];
      const attachmentIndex = attachments.findIndex(
        ({ src }) => src === img.src
      );
      if (attachmentIndex !== -1) {
        const { cid } = attachments[attachmentIndex];
        $el.attr('src', `cid:${cid}`);
      } else {
        const cid = `image${attachments.length}@${baseCid}`;
        $el.attr('src', `cid:${cid}`);
        attachments.push({
          filename: `${cid}.${img.ext}`,
          content: img.content,
          contentType: img.mime,
          contentDisposition: 'inline',
          src: img.src,
          cid,
        });
      }
    }
  });
  return { wrapper, attachments };
};

const getImageSources = (wrapper: CheerioStatic) => {
  const imageSources: string[] = [];
  wrapper('img').each((i, el) => {
    imageSources.push(wrapper(el).attr('src'));
  });
  return imageSources;
};

const getValidImages =
  (fetchImg: (src: string) => Promise<Partial<IImgData>>) =>
  (sources: string[]) =>
    Promise.all(
      sources.filter(src => src.indexOf('http') === 0).map(fetchImg)
    ).then(imgData =>
      imgData.filter(
        ({ ext }) => !!ext && allowedImageExtensions.indexOf(ext) !== -1
      )
    );

const includesConditionalComment = (wrapper: CheerioStatic) => {
  return wrapper.html('body').match(RegExp('\\<!--(\\s?)\\[(\\s?)if')) !== null;
};

const isConditionalComment = (cheerioObject: CheerioElement) => {
  return (
    cheerioObject.type === 'comment' && cheerioObject.data.startsWith('[if ')
  );
};

const htmlToCheerio = (givenHtml: string) => {
  return cheerio.load(givenHtml, { decodeEntities: false });
};

export const useReturnPath =
  (returnPath: string) =>
  (
    mailOptions: ISendMailOptions // Assumes underlying nodemailer and this feature https://github.com/nodemailer/nodemailer/issues/174#issuecomment-21395144
  ) => ({
    envelope: {
      from: returnPath,
      to: mailOptions.to,
    },
  });

export const inlineImages = async (mailOptions: ISendMailOptions) => {
  if (typeof mailOptions.html !== 'string') {
    return;
  }
  const baseCid = uuidv4();
  const cheerioWrapper = htmlToCheerio(mailOptions.html);
  let commentImgAttachments: IAttachmentObject[] = [];

  if (includesConditionalComment(cheerioWrapper)) {
    const promises = cheerioWrapper('*')
      .contents()
      .map(async (i, el) => {
        if (isConditionalComment(el)) {
          const commentWrapper = htmlToCheerio(el.data);
          const commentReturnObject = await imagesToAttachments(
            commentWrapper,
            baseCid,
            commentImgAttachments
          );
          commentImgAttachments = [...commentReturnObject.attachments];
          el.data = commentReturnObject.wrapper
            .html('body')
            .replace('<body>', '')
            .replace('</body>', '');
        }
      })
      .toArray();
    await Promise.all(promises);
  }
  const { wrapper, attachments } = await imagesToAttachments(
    cheerioWrapper,
    baseCid,
    commentImgAttachments
  );
  const combinedImgAttachments = [].concat(attachments, commentImgAttachments);

  return {
    html: wrapper.html(),
    attachments: [].concat(
      mailOptions.attachments || [],
      uniqWith(combinedImgAttachments, (a, b) => a.cid === b.cid)
    ),
  };
};

type TTransformerP<T extends Partial<ISendMailOptions>> = (
  mailOptions: ISendMailOptions
) => Promise<T>;
type TTransformer<T extends Partial<ISendMailOptions>> = (
  mailOptions: ISendMailOptions
) => T;

const combineTransformers =
  (
    transformers: Array<
      | TTransformer<Partial<ISendMailOptions>>
      | TTransformerP<Partial<ISendMailOptions>>
    >
  ): TTransformerP<ISendMailOptions> =>
  async mailOptions => {
    let mail = mailOptions;

    for (const transform of transformers) {
      mail = { ...mail, ...(await transform(mail)) };
    }

    return mail;
  };

const inlineStyles: TTransformer<ISendMailOptions> = ({ html }) => ({
  html: inlineCss(html),
});

const addReceiver =
  (org: IOrganization): TTransformer<ISendMailOptions> =>
  opts => ({
    to: getSendToAddress(org.emailDomainMappings, opts.to),
  });

const cleanMessageId = (messageId: string) =>
  `<${messageId.replace(/[<>]/g, '')}>`;

const getDomainPart = (emailAddress: string) =>
  R.pipe(R.defaultTo('localhost'), R.split('@'), R.last)(emailAddress);

const addMessageId =
  (ctx: TSendContext): TTransformer<ISendMailOptions> =>
  opts => ({
    messageId: cleanMessageId(
      opts.messageId ||
        `<${ctx.getGlobal('newUuidV4')()}@${getDomainPart(opts.from)}>`
    ),
  });

export const getTrackingUrl = (
  rootUrl: string,
  orgId: string,
  messageId: string
) => `${rootUrl}/track/email?organizationId=${orgId}&messageId=${messageId}`;
/**
 * Make sure the outbound mail includes tracking headers so the MTA report response codes
 */
const ensureTrackingHeaders =
  (ctx: TSendContext, org: IOrganization): TTransformerP<ISendMailOptions> =>
  async opts => {
    const headers = (opts.headers || []) as IHeader[];
    const includesTrackingHeaders = headers.some(
      header => header.key === 'X-hox-email-delivery-success-callback'
    );

    // Quest delivery adds tracking headers for all outbound vectors. No need to add anything.
    if (includesTrackingHeaders) {
      return {};
    }

    const rootUrl = await ctx.getConfig('hoxhuntApiUrl');

    const callbackUrl = getTrackingUrl(rootUrl, org._id, opts.messageId);

    const withTrackingHeaders = headers.concat([
      {
        key: 'X-hox-email-delivery-success-callback',
        value: callbackUrl,
      },
      {
        key: 'X-hox-email-delivery-failure-callback',
        value: callbackUrl,
      },
    ]);

    return { headers: withTrackingHeaders };
  };

const addHeaders =
  (org: IOrganization): TTransformer<ISendMailOptions> =>
  opts => {
    const customHeaders: ICustomHeader[] = get(
      org,
      'delivery.email.customHeaders',
      []
    );
    const parsedHeaders = parseHeaders(opts.headers);
    const headers = [...parsedHeaders, ...customHeaders];

    return headers.length ? { headers } : {};
  };

const getMail = async (
  ctx: TSendContext,
  org: IOrganization,
  defaultDeliveryOptions: IAppConfig['emailDelivery'],
  mailOptions: ISendMailOptions
): Promise<IEmailDeliveryArgs['mail']> => {
  const shouldInlineImages = get(org, 'delivery.email.inlineImages', false);
  const shouldUseReturnPath = get(org, 'delivery.email.useReturnPath', false);

  const buildMail = combineTransformers([
    shouldInlineImages ? inlineImages : identity,
    inlineStyles,
    shouldUseReturnPath
      ? useReturnPath(defaultDeliveryOptions.defaultReturnPath)
      : identity,
    addHeaders(org),
    addReceiver(org),
    addMessageId(ctx),
    ensureTrackingHeaders(ctx, org),
  ]);

  return buildMail(mailOptions);
};

const readFileMemoized = R.memoizeWith(R.identity, (path: string) =>
  fs.promises.readFile(path)
);

const readCertFiles = (files: {
  certPath: string;
  keyPath: string;
}): Promise<{ cert: Buffer; key: Buffer }> =>
  R.pipe(
    R.map(readFileMemoized),
    promises => Promise.all(promises),
    R.then(([cert, key]) => ({ cert, key }))
  )([files.certPath, files.keyPath]);

export const createDkimOptions = async (
  ctx: TSendContext,
  organization: IOrganization
) => {
  if (!organization.delivery?.email?.useDkim) {
    return undefined;
  }
  const { domain, keySelector, protectedKey } =
    await runHandlerWithTaskRunnerRole(
      ctx,
      ctx.handlers.infrastructure.dkim.getSigningKey,
      {
        organizationId: organization._id,
      }
    );
  return {
    dkim: {
      privateKey: protectedKey,
      domainName: domain,
      keySelector,
    },
  };
};

const getConnectionOptionsFromOrg = async (
  ctx: TSendContext,
  organization: Pick<IOrganization, 'features' | 'delivery'>,
  defaults: IAppConfig['emailDelivery']['connectionOptions'],
  tls: IAppConfig['emailDelivery']['tls']
): Promise<ISmtpOptions> => {
  const hasEmailCertFiles = await ctx.handlers.internal.features.hasFeature(
    ctx,
    { featureName: EMAIL_CERT_FILES, organization }
  );
  return R.mergeAll([
    parseConnectionOptions(
      R.path(
        ['delivery', 'email', 'privateSmtpConnectionString'],
        organization
      ) || defaults
    ),
    hasEmailCertFiles ? { tls: await readCertFiles(tls) } : {},
  ]);
};
const getDeliveryOptions = async (
  ctx: TSendContext,
  { tls, connectionOptions, ...rest }: IAppConfig['emailDelivery'],
  organization: IOrganization
): Promise<IEmailDeliveryArgs['options']> => ({
  ...rest,
  useSmtpDirectConnect: await ctx.handlers.internal.features.hasFeature(ctx, {
    featureName: USE_SMTP_DIRECT_CONNECT,
    organization,
  }),
  connectionOptions: await getConnectionOptionsFromOrg(
    ctx,
    organization,
    connectionOptions,
    tls
  ),
  ...(await createDkimOptions(ctx, organization)),
});

export const getEmailDeliveryArgs = (
  ctx: TSendContext,
  org: IOrganization,
  mailOptions: ISendMailOptions
): Promise<IEmailDeliveryArgs> =>
  ctx.getConfig('emailDelivery').then(defaultOptions =>
    Promise.all([
      getMail(ctx, org, defaultOptions, mailOptions),
      getDeliveryOptions(ctx, defaultOptions, org),
    ]).then(([mail, options]) => ({
      mail,
      options,
    }))
  );

interface ISaveEmailRecordParams {
  organizationId: MONGOID;
  user?: IUser;
  emailType: EEmailRecordType;
  responseCode: number;
}

export const saveEmailRecord = async (
  ctx: TSendContext,
  { organizationId, user, emailType, responseCode }: ISaveEmailRecordParams,
  messageInfo: Pick<ISentMessageInfo, 'messageId'>
) => {
  const now = ctx.getGlobal('newDate')();

  const promises: Array<Promise<unknown>> = [
    ctx.handlers.collection.emailRecord.create(ctx, {
      data: {
        emailType,
        messageId: messageInfo.messageId,
        organizationId,
        responseCode,
        sentAt: now,
        ...(user ? { userId: user._id } : {}),
      },
    }),
  ];

  // TODO(RUSH): Adding Welcome Email Type temporarily here
  // Remove as we recreate Onboarding experience holistically
  // and make sense of user status's
  if (
    emailType === EEmailRecordType.INVITE ||
    emailType === EEmailRecordType.WELCOME
  ) {
    promises.push(
      ctx.handlers.collection.user.patch(ctx, {
        id: user._id,
        data: { lastInviteSentAt: now },
      })
    );
  }

  await Promise.all(promises);

  return messageInfo;
};

export const trackDeliveryMetric = (
  ctx: TSendContext,
  {
    emailType,
    organization,
    result,
  }: {
    emailType: EEmailRecordType;
    organization: MONGOID;
    result: EMetricResultLabel;
  }
) =>
  ctx.metrics.counter(EMetricCounter.EMAIL_DELIVERY, {
    labels: {
      emailType,
      organization,
      result,
    },
    value: 1,
  });

const deliverViaGmailApi = (ctx: TSendContext, parameters: IDeliverPayload) =>
  ctx.handlers.integration.gmail
    .insertMessage(withTaskRunnerRole(ctx), {
      mail: parameters.mail,
      userId: parameters.userId,
      organizationId: parameters.organizationId,
      options: parameters.options,
    })
    .then(
      R.always({
        envelope: parameters.mail.envelope,
        accepted: [parseAddress(parameters.mail.to)],
        rejected: [],
        messageId: parameters.mail.messageId,
        response: '250', // OK
        host: '',
      })
    );

const isGmailDeliveryApiAvailable = async (
  ctx: TSendContext,
  organization: IOrganization,
  userId: string
) => {
  const gmailDeliveryApiEnabled =
    organization.delivery?.email?.useGmailDeliveryApi;
  if (!gmailDeliveryApiEnabled) {
    return false;
  }
  try {
    await ctx.handlers.integration.gmail.fetchEmailDeliveryAccessToken(
      withTaskRunnerRole(ctx),
      {
        userId,
        organizationId: organization._id,
      }
    );
    return true;
  } catch {
    return false;
  }
};
/**

 * Returns the correct delivery pipe (function) for the org
 */
const getDeliveryPipe = async (
  ctx: TSendContext,
  organization: IOrganization,
  userId: string
) =>
  isGmailDeliveryApiAvailable(ctx, organization, userId).then(available =>
    available ? deliverViaGmailApi : ctx.handlers.integration.email.deliver
  );

export const deliverEmail = async (
  ctx: TSendContext,
  organization: IOrganization,
  deliveryArgs: IEmailDeliveryArgs,
  userId: string
): Promise<IDeliverResult> => {
  const deliver = await getDeliveryPipe(ctx, organization, userId);
  return deliver(ctx, {
    userId,
    organizationId: organization._id,
    mail: deliveryArgs.mail,
    options: deliveryArgs.options,
  });
};
