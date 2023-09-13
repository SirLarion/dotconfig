import { expect } from 'chai';
import mockFs from 'mock-fs';
import nock from 'nock';
import R from 'ramda';
import sinon from 'sinon';

import { THandlerFuncTree } from '@server/domains/gen/handlersModel';
import {
  ADMIN,
  EUserRole,
  SUPER_ADMIN,
  TASK_RUNNER,
} from '@server/domains/lib/auth/roles';
import { fetchCursorHead } from '@server/domains/lib/collectionFp';
import { THandlerContext } from '@server/domains/lib/models';
import {
  insertMockOrganization,
  withDelivery,
  withDomains,
  withEmailDomainMappings,
  withFeatures,
  withNotifications,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import { createMockUser } from '@server/domains/lib/testMockCreators/mockUser';
import { testACL } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withAppConfig,
  withGlobals,
  withHandlerTree,
  withMockTaskRunnerIdentity,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';
import { IFeatureTag } from '@server/lib/typedSchemas';
import {
  IDelivery,
  IDomain,
  IEmailDomainMapping,
} from '@server/lib/typedSchemas/Organization/models';
import { EEmailRecordType } from '@server/lib/typedSchemas/User/models';
import { EMAIL_CERT_FILES } from '@server/tags/features';

import { parseConnectionOptions } from '../lib/deliver.lib';
import { getTrackingUrl } from '../lib/send.lib';
import { ISendPayload } from '../lib/send.models';
import send from '../send';

describe('integration.email.send', () => {
  testACL(send, [SUPER_ADMIN, ADMIN, TASK_RUNNER]);

  const now = new Date(2019, 0, 1);

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  const tests: Array<{
    description: string;
    sendingUserRole?: EUserRole;
    recipientUserAddress?: string;
    recipientOrganizationAddress?: string;
    emailType?: EEmailRecordType;
  }> = [
    {
      description:
        'should be able to send to any user in calling ADMINs own organization',
      sendingUserRole: ADMIN,
      emailType: EEmailRecordType.VECTOR,
      recipientUserAddress: 'user@foo-bar.tld',
    },
    {
      description:
        "should be able to send to calling ADMIN's organization's escalation address",
      sendingUserRole: ADMIN,
      emailType: EEmailRecordType.INCIDENT_ESCALATION,
      recipientOrganizationAddress: 'escalate@foo-bar.tld',
    },
    {
      description:
        'should be able to send to any user in any org as SUPER_ADMIN',
      sendingUserRole: SUPER_ADMIN,
      emailType: EEmailRecordType.VECTOR,
      recipientUserAddress: 'user@foo-bar.tld',
    },
    {
      description:
        'should be able to send to any user in any org as TASK_RUNNER',
      sendingUserRole: TASK_RUNNER,
      emailType: EEmailRecordType.VECTOR,
      recipientUserAddress: 'user@foo-bar.tld',
    },
    {
      description:
        "should be able to send to any organization's escalation address as SUPER_ADMIN",
      sendingUserRole: SUPER_ADMIN,
      emailType: EEmailRecordType.INCIDENT_ESCALATION,
      recipientOrganizationAddress: 'escalate@foo-bar.tld',
    },
    {
      description:
        "should be able to send to any organization's escalation address as TASK_RUNNER",
      sendingUserRole: TASK_RUNNER,
      emailType: EEmailRecordType.INCIDENT_ESCALATION,
      recipientOrganizationAddress: 'escalate@foo-bar.tld',
    },
    {
      description:
        "should update user's lastInviteSentAt when sending an invite",
      sendingUserRole: TASK_RUNNER,
      emailType: EEmailRecordType.INVITE,
      recipientUserAddress: 'user@foo-bar.tld',
    },
  ];

  const setup = async ({
    delivery,
    emailDomainMappings,
    recipientOrganizationAddress,
    recipientUserAddress,
    returnPath,
    features,
    domains,
    emailType = EEmailRecordType.VECTOR,
    sendingUserRole = TASK_RUNNER,
    messageId,
    handlers,
  }: {
    delivery?: IDelivery;
    emailDomainMappings?: IEmailDomainMapping[];
    emailType?: EEmailRecordType;
    recipientOrganizationAddress?: string;
    recipientUserAddress?: string;
    returnPath?: string;
    sendingUserRole?: EUserRole;
    features?: IFeatureTag[];
    domains?: IDomain[];
    messageId?: string;
    handlers?: DeepPartial<THandlerFuncTree>;
  }) => {
    const recipientOrganization = await insertMockOrganization(
      withNotifications({
        threatEscalationEmails: recipientOrganizationAddress
          ? [recipientOrganizationAddress]
          : [],
        weeklyReportToAdmins: false,
      }),
      delivery ? withDelivery(delivery) : R.identity,
      emailDomainMappings
        ? withEmailDomainMappings(emailDomainMappings)
        : R.identity,
      features ? withFeatures(features) : R.identity,
      domains ? withDomains(domains) : R.identity
    );

    const recipientUser = recipientUserAddress
      ? await createMockUser(
          {
            organizationId: recipientOrganization._id,
            emails: [{ address: recipientUserAddress }],
          },
          { persist: true }
        )
      : undefined;

    const senderUser = await createMockUser(
      {
        organizationId: recipientOrganization._id,
        roles: {
          [recipientOrganization._id]: [EUserRole.USER, sendingUserRole],
        },
      },
      { persist: true }
    );

    const config = {
      hoxhuntApiUrl: 'https://test.hoxhunt.com',
      emailDelivery: {
        connectionOptions: 'dis-conf',
        ...(returnPath ? { defaultReturnPath: returnPath } : {}),
        tls: {
          certPath: '/var/secrets/deep_secrets/ca.crt',
          keyPath: '/var/secrets/deep_secrets/key.key',
        },
      },
      infraApi: {
        enabled: false,
        localDummyKey: '',
      },
    };

    const deliveryResult = { messageId: 'mockMessageId' };
    const deliver = sinon.stub().resolves(deliveryResult);

    const ctx = await R.pipe(
      withUserIdentity(senderUser),
      withHandlerTree(
        R.mergeDeepRight(
          {
            integration: { email: { deliver } },
          },
          handlers || {}
        )
      ),
      withGlobals({ newDate: () => now, newUuidV4: () => 'mocked-uuidv4' }),
      withAppConfig(config),
      createIntegrationCtx
    )(null);

    const payload: ISendPayload = {
      mailOptions: {
        attachments: [],
        to: recipientUserAddress || recipientOrganizationAddress,
        html: '<html><head></head><body>Le Fuq</body></html>',
        messageId: messageId || '<123123123@hoxhunttest.com>',
        from: 'Hoxhunt <test@hoxhunttest.com>',
      },
      params: { emailType },
      userId: recipientUser?._id,
      organizationId: recipientOrganization._id,
    };

    const doExpectations = async () => {
      const expectCtx = await R.pipe(
        withMockTaskRunnerIdentity(),
        createIntegrationCtx
      )(null);

      const trackingUrl = getTrackingUrl(
        config.hoxhuntApiUrl,
        recipientOrganization._id,
        payload.mailOptions.messageId
      );

      expect(deliver.firstCall.args[1]).eql({
        mail: {
          ...payload.mailOptions,
          headers: [
            {
              key: 'X-hox-email-delivery-success-callback',
              value: trackingUrl,
            },
            {
              key: 'X-hox-email-delivery-failure-callback',
              value: trackingUrl,
            },
          ],
        },
        options: {
          connectionOptions: parseConnectionOptions(
            config.emailDelivery.connectionOptions
          ),
          useSmtpDirectConnect: false,
        },
        userId: recipientUser?._id,
        organizationId: recipientOrganization._id,
      });

      const emailRecord = await expectCtx.handlers.collection.emailRecord
        .find(expectCtx, {
          params: { selector: { messageId: deliveryResult.messageId } },
        })
        .then(fetchCursorHead);

      expect(emailRecord.organizationId).eql(recipientOrganization._id);
      expect(emailRecord.sentAt).eql(now);
      expect(emailRecord.emailType).eql(emailType);
      if (recipientUserAddress) {
        expect(emailRecord.userId).eql(recipientUser._id);
      }
    };

    return {
      ctx,
      deliverHandler: deliver,
      deliveryResult,
      doExpectations,
      payload,
      config,
    };
  };

  for (const test of tests) {
    it(test.description, async () => {
      const { ctx, deliveryResult, payload, doExpectations } = await setup({
        emailType: test.emailType,
        recipientOrganizationAddress: test.recipientOrganizationAddress,
        recipientUserAddress: test.recipientUserAddress,
        sendingUserRole: test.sendingUserRole,
      });

      const result = await ctx.handlers.integration.email.send(ctx, payload);

      await doExpectations();

      expect(result).eql(deliveryResult);
    });
  }

  describe('image inlining', () => {
    const setupNock = async (ctx: THandlerContext) => {
      const baseUrl = 'http://bar.tld';
      const image = await ctx.getAsset('test/test.png').binary();

      const server = nock(baseUrl);
      server.get('/logo.png').times(2).reply(200, image);
      server.get('/logo2.png').reply(404);
      server.get('/doc.pdf').reply(200, new Buffer('non-image-content'));

      return { baseUrl };
    };

    afterEach(() => {
      nock.cleanAll();
    });

    it('should inline images', async () => {
      const { ctx, payload, deliverHandler } = await setup({
        recipientUserAddress: 'user@foo-bar.tld',
        emailType: EEmailRecordType.INCIDENT_ESCALATION,
        sendingUserRole: TASK_RUNNER,
        delivery: { email: { inlineImages: true } },
      });
      const { baseUrl } = await setupNock(ctx);

      await send.handler(ctx, {
        ...payload,
        mailOptions: {
          ...payload.mailOptions,
          html: `
          <p>kek</p><!--[if mso]><img src="${baseUrl}/logo.png" /><[endif]--><img src="${baseUrl}/logo.png" />
        `,
        },
      });

      const {
        mail: { html, attachments },
      } = deliverHandler.firstCall.args[1];

      expect(attachments).to.have.length(1);
      expect(attachments[0]).to.have.property('filename');
      expect(attachments[0]).to.have.property('content');
      expect(attachments[0]).to.have.property('contentType');
      expect(attachments[0]).to.have.property('contentDisposition', 'inline');
      expect(attachments[0]).to.have.property('cid');
      expect(
        html.includes(`<!--[if mso]><img src="cid:${attachments[0].cid}"`)
      ).eql(true);
      expect(html.includes(`-><img src="cid:${attachments[0].cid}"`)).eql(true);
    });

    it('should skip bad & disallowed files', async () => {
      const { ctx, payload, deliverHandler } = await setup({
        recipientOrganizationAddress: 'escalate@foo-bar.tld',
        emailType: EEmailRecordType.INCIDENT_ESCALATION,
        sendingUserRole: TASK_RUNNER,
        delivery: { email: { inlineImages: true } },
      });
      const { baseUrl } = await setupNock(ctx);

      await send.handler(ctx, {
        ...payload,
        mailOptions: {
          ...payload.mailOptions,
          html: `
          <img src="${baseUrl}/logo2.png" />
          <img src="${baseUrl}/doc.pdf" />
        `,
        },
      });

      const {
        mail: { attachments },
      } = deliverHandler.firstCall.args[1];

      expect(attachments).to.have.length(0);
    });

    it('should add one attachment per unique src', async () => {
      const { ctx, payload, deliverHandler } = await setup({
        recipientOrganizationAddress: 'escalate@foo-bar.tld',
        emailType: EEmailRecordType.INCIDENT_ESCALATION,
        sendingUserRole: TASK_RUNNER,
        delivery: { email: { inlineImages: true } },
      });
      const { baseUrl } = await setupNock(ctx);

      await send.handler(ctx, {
        ...payload,
        mailOptions: {
          ...payload.mailOptions,
          html: `
          <img src="${baseUrl}/logo.png" />
          <img src="${baseUrl}/logo.png" />
        `,
        },
      });

      const {
        mail: { html, attachments },
      } = deliverHandler.firstCall.args[1];

      expect(attachments).to.have.length(1);
      // Images with same src should be only once in attachments list
      expect(
        (html as string)
          .split('\n')
          .filter(row => row.indexOf(attachments[0].cid) !== -1)
      ).to.have.length(2);
    });

    it('should add dkim options to node mailer correctly', async () => {
      const { ctx, payload, deliverHandler } = await setup({
        recipientOrganizationAddress: 'escalate@foo-bar.tld',
        emailType: EEmailRecordType.INCIDENT_ESCALATION,
        sendingUserRole: TASK_RUNNER,
        delivery: { email: { inlineImages: true, useDkim: true } },
      });
      await setupNock(ctx);

      await send.handler(ctx, {
        ...payload,
        mailOptions: {
          ...payload.mailOptions,
          html: ``,
        },
      });

      expect(deliverHandler.firstCall.args[1].options.dkim).eql({
        privateKey: {
          encrypted: '',
        },
        domainName: 'test.hoxhuntsigning.dev',
        keySelector: 'dummy',
      });
    });

    it('should handle bad srcs', async () => {
      const { ctx, payload, deliverHandler } = await setup({
        recipientOrganizationAddress: 'escalate@foo-bar.tld',
        emailType: EEmailRecordType.INCIDENT_ESCALATION,
        sendingUserRole: TASK_RUNNER,
        delivery: { email: { inlineImages: true } },
      });
      await setupNock(ctx);

      const emailHtml =
        '<html><head></head><body><img src="http://asdddd/asd.doc"></body></html>';

      await send.handler(ctx, {
        ...payload,
        mailOptions: {
          ...payload.mailOptions,
          html: emailHtml,
        },
      });

      const {
        mail: { html, attachments },
      } = deliverHandler.firstCall.args[1];

      expect(html).eql(emailHtml);
      expect(attachments).to.have.length(0);
    });

    it('should not tamper with the email html', async () => {
      const { ctx, payload, deliverHandler } = await setup({
        recipientOrganizationAddress: 'escalate@foo-bar.tld',
        emailType: EEmailRecordType.INCIDENT_ESCALATION,
        sendingUserRole: TASK_RUNNER,
        delivery: { email: { inlineImages: true } },
      });

      const emailHtml =
        '<html><head></head><body><p>Text with some entities <>"\'&</p></body></html>';

      await send.handler(ctx, {
        ...payload,
        mailOptions: {
          ...payload.mailOptions,
          html: emailHtml,
        },
      });

      const {
        mail: { html },
      } = deliverHandler.firstCall.args[1];

      expect(html).eql(emailHtml);
    });
  });

  describe('style inlining', () => {
    it('should inline styles', async () => {
      const { payload, ctx, deliverHandler } = await setup({
        recipientOrganizationAddress: 'escalate@foo-bar.tld',
        emailType: EEmailRecordType.INCIDENT_ESCALATION,
        sendingUserRole: TASK_RUNNER,
      });

      await send.handler(ctx, {
        ...payload,
        mailOptions: {
          ...payload.mailOptions,
          html: `
          <html>
            <head>
              <style>
                .heading {
                  font-size: 65px;
                }
              </style>
            </head>
            <body>
              <h1 class="heading">Asd</h1>
            </body>
          </html>
        `,
        },
      });

      const {
        mail: { html },
      } = deliverHandler.firstCall.args[1];

      expect(html).to.include('<h1 class="heading" style="font-size: 65px;">');
    });
  });

  describe('Behaviour', () => {
    it('should throw if no user or organization is found with given emailAddress', async () => {
      const { ctx, payload } = await setup({});
      await expect(
        send.handler(ctx, { ...payload, mailOptions: { to: 'foo@bar.tld' } })
      ).rejectedWith('To address is invalid (foo@bar.tld)');
    });

    it('should throw if to address is not specified', async () => {
      const { ctx, payload } = await setup({});
      await expect(
        send.handler(ctx, {
          ...payload,
          mailOptions: { to: undefined },
        })
      ).rejectedWith('To address is not specified for integration.email.send');
    });

    it('should throw if more than one to addresses are given', async () => {
      const { ctx, payload } = await setup({});
      await expect(
        send.handler(ctx, {
          ...payload,
          mailOptions: { to: ['0@bar.tld', '1@bar.tld'] },
        })
      ).rejectedWith(
        'Currently integration.email.send can only handle single receiver'
      );
    });

    it('should map domains of "to"-field if mappings are present', async () => {
      const { ctx, payload, deliverHandler } = await setup({
        recipientUserAddress: 'user@foo-bar.tld',
        emailDomainMappings: [
          {
            from: 'foo-bar.tld',
            to: 'foo.tld',
          },
        ],
      });

      await send.handler(ctx, payload);

      expect(deliverHandler.callCount).eql(
        1,
        'expected ctx.handlers.integration.email.deliver to have been called'
      );
      expect(deliverHandler.firstCall.args[1].mail.to).eql('user@foo.tld');
    });

    it('should use global return path if enabled in organization settings', async () => {
      const returnPath = 'return@bar.tld';
      const { ctx, payload, deliverHandler } = await setup({
        recipientUserAddress: 'user@foo-bar.tld',
        delivery: { email: { useReturnPath: true } },
        returnPath,
      });

      await send.handler(ctx, payload);

      expect(deliverHandler.callCount).eql(
        1,
        'expected ctx.handlers.integration.email.deliver to have been called'
      );
      expect(deliverHandler.firstCall.args[1].mail.envelope.from).eql(
        returnPath
      );
    });

    it('should use privateSmtpConnectionString if configured in organization settings', async () => {
      const privateSmtpConnectionString =
        'smtp://asd.das.asdas:25/?connectionTimeout=5000&greetingTimeout=10000&socketTimeout=100000';

      const { ctx, payload, deliverHandler } = await setup({
        recipientUserAddress: 'user@foo-bar.tld',
        delivery: { email: { privateSmtpConnectionString } },
      });

      await send.handler(ctx, payload);

      expect(deliverHandler.callCount).eql(
        1,
        'expected ctx.handlers.integration.email.deliver to have been called'
      );
      expect(deliverHandler.firstCall.args[1].options.connectionOptions).eql(
        parseConnectionOptions(privateSmtpConnectionString)
      );
    });

    it('should use certs if feature is enabled', async () => {
      try {
        const { ctx, payload, deliverHandler, config } = await setup({
          recipientUserAddress: 'user@foo-bar.tld',
          features: [{ categoryName: 'features', name: EMAIL_CERT_FILES }],
        });

        mockFs({
          [config.emailDelivery.tls.certPath]: 'cert',
          [config.emailDelivery.tls.keyPath]: 'key',
        });

        await send.handler(ctx, payload);

        const { cert, key } =
          deliverHandler.firstCall.args[1].options.connectionOptions.tls;

        expect(Buffer.from(cert).toString('utf-8')).eql('cert');
        expect(Buffer.from(key).toString('utf-8')).eql('key');
      } finally {
        mockFs.restore();
      }
    });
    it('should allow sending delete notice to non-hoxhunt user', async () => {
      const { ctx, deliveryResult, payload, deliverHandler } = await setup({
        domains: [{ name: 'bar.foo' }],
        emailType: EEmailRecordType.THREAT_DELETED_FROM_MAILBOX,
        sendingUserRole: EUserRole.TASK_RUNNER,
      });

      const result = await send.handler(
        ctx,
        R.mergeRight(payload, { mailOptions: { to: 'asdasd@bar.foo' } })
      );

      expect(result).eql(deliveryResult);
      expect(deliverHandler.callCount).eql(
        1,
        'expected ctx.handlers.integration.email.deliver to have been called'
      );
      expect(deliverHandler.firstCall.args[1].mail.to).eql('asdasd@bar.foo');
    });

    it('should generate messageId if not provided in payload', async () => {
      const { ctx, payload, deliverHandler } = await setup({
        recipientUserAddress: 'user@foo-bar.tld',
      });

      delete payload.mailOptions.messageId;

      await send.handler(ctx, payload);

      expect(deliverHandler.callCount).eql(
        1,
        'expected ctx.handlers.integration.email.deliver to have been called'
      );

      expect(deliverHandler.firstCall.args[1].mail.messageId).eql(
        '<mocked-uuidv4@hoxhunttest.com>'
      );
    });

    describe('Message id handling', () => {
      const testMessageIds = [
        '<asd@hoxhunttest.com>',
        '<<asd@hoxhunttest.com>>',
        '<<asd@hoxhunttest.com',
        'asd@hoxhunttest.com>',
        'asd@hoxhunttest.com',
        '<asd>@hoxhun>>>>>ttest.com',
      ];

      for (const messageId of testMessageIds) {
        it(`should clean ${messageId} to have single angle brackets`, async () => {
          const { ctx, payload, deliverHandler } = await setup({
            recipientUserAddress: 'user@foo-bar.tld',
            messageId,
          });

          await send.handler(ctx, payload);

          expect(deliverHandler.callCount).eql(
            1,
            'expected ctx.handlers.integration.email.deliver to have been called'
          );

          expect(deliverHandler.firstCall.args[1].mail.messageId).eql(
            '<asd@hoxhunttest.com>'
          );
        });
      }
    });

    describe('Delivery pipe selection', () => {
      const setupPipeTest = async (
        useGmailDeliveryApi: boolean,
        fetchEmailDeliveryAccessToken: sinon.SinonStub
      ) => {
        const insertMessage = sinon.stub().resolves({});
        const data = await setup({
          recipientUserAddress: 'user@ggmail.tld',
          handlers: {
            integration: {
              gmail: {
                insertMessage,
                fetchEmailDeliveryAccessToken,
              },
            },
          },
          delivery: {
            email: {
              useGmailDeliveryApi,
            },
          },
        });

        return {
          ...data,
          insertMessage,
        };
      };

      it('should send via email if Gmail API is not enabled', async () => {
        const fetchEmailDeliveryAccessToken = sinon
          .stub()
          .throws(new Error('Oops google said no'));
        const { ctx, payload, deliverHandler, insertMessage } =
          await setupPipeTest(false, fetchEmailDeliveryAccessToken);

        await send.handler(ctx, payload);

        expect(deliverHandler.called).eql(true);
        expect(insertMessage.called).eql(false);
      });

      it('should send via Gmail API if setting is enabled', async () => {
        const fetchEmailDeliveryAccessToken = sinon
          .stub()
          .resolves({ accessToken: 'access_token' });
        const { ctx, payload, deliverHandler, insertMessage } =
          await setupPipeTest(true, fetchEmailDeliveryAccessToken);

        await send.handler(ctx, payload);

        expect(deliverHandler.called).eql(false);
        expect(insertMessage.called).eql(true);
      });

      it('should send via email if Gmail API setting is enabled but not available', async () => {
        const fetchEmailDeliveryAccessToken = sinon
          .stub()
          .resolves({ accessToken: undefined });
        const { ctx, payload, deliverHandler, insertMessage } =
          await setupPipeTest(true, fetchEmailDeliveryAccessToken);

        await send.handler(ctx, payload);

        expect(deliverHandler.called).eql(true);
        expect(insertMessage.called).eql(false);
      });
    });
  });
});
