import DKIM from 'nodemailer/lib/dkim/index';
import MailComposer from 'nodemailer/lib/mail-composer';
import Mail from 'nodemailer/lib/mailer';
import R from 'ramda';
import { PassThrough } from 'stream';

import { IGuardEnvelope } from '@server/domains/lib/models';

import {
  IMailDeliveryOptions,
  ISendMailOptions,
} from '../../email/lib/legacyEmailServiceModels';

import {
  TInsertMessageContext,
  TInsertMessageRequestParams,
} from './insertMessage.models';

type TCtx = TInsertMessageContext;
type TParams = TInsertMessageRequestParams;

export const getRecipientAddress = (mail: ISendMailOptions) =>
  Array.isArray(mail.to) ? mail.to[0] : mail.to;

export const getInsertMessageAccessToken = (
  ctx: TCtx,
  organizationId: string,
  userId: string,
  emailAddress: string
) =>
  ctx.handlers.integration.gmail
    .fetchEmailDeliveryAccessToken(ctx, {
      organizationId,
      userId,
      emailAddress,
    })
    .then(R.prop('accessToken'));

const toNodemailerOptions = (mail: ISendMailOptions) =>
  R.mergeDeepRight(mail, { envelope: { to: getRecipientAddress(mail) } });

// https://stackoverflow.com/questions/10623798/how-do-i-read-the-contents-of-a-node-js-stream-into-a-string-variable
function streamToBuffer(stream: PassThrough): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
    stream.on('error', err => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

const handleDkimSignature =
  (ctx: TInsertMessageContext, options: IMailDeliveryOptions) =>
  (mailBuffer: Buffer) => {
    // DKIM signing has to happen after the mail has been compiled
    // it doesn't work when compiling with mailcomposer even though it have the option
    if (options.dkim) {
      const dkimSigner = new DKIM({
        ...options.dkim,
        privateKey: ctx
          .guard()
          .decrypt(options.dkim.privateKey as IGuardEnvelope),
      });
      const signedStream = dkimSigner.sign(mailBuffer);
      return streamToBuffer(signedStream);
    }
    return mailBuffer;
  };

const buildMail =
  (ctx: TInsertMessageContext, options: IMailDeliveryOptions) =>
  (mail: Mail.Options) =>
    new MailComposer(mail)
      .compile()
      .build()
      .then(handleDkimSignature(ctx, options))
      .then(buffer => buffer.toString('base64'));

const asBase64Mime = (
  ctx: TInsertMessageContext,
  options: IMailDeliveryOptions
) => R.pipe(toNodemailerOptions, buildMail(ctx, options));

export const getInsertParams = (
  ctx: TInsertMessageContext,
  mail: ISendMailOptions,
  options: IMailDeliveryOptions
): Promise<TParams> =>
  asBase64Mime(
    ctx,
    options
  )(mail).then(raw => ({
    raw,
    labelIds: [
      'UNREAD', // show as new unread message, otherwise created as READ
      'INBOX', // show in inbox, otherwise hidden in "all mail"
    ],
  }));

export const doInsertMessageRequest = (
  ctx: TCtx,
  accessToken: string,
  params: TParams
) =>
  ctx.handlers.integration.http.request(ctx, {
    method: 'post',
    // Notice the _me_ shorthand used in the URL.
    // The access token generated earlier impersonates the user we want to send the email to
    url: 'https://gmail.googleapis.com/gmail/v1/users/me/messages',
    data: params,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
