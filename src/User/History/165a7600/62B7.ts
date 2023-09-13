import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';
import sinon from 'sinon';

import { stubSendMail } from '@server/domains/integration/email/lib/stubEmailClient';
import {
  ADMIN,
  SUPER_ADMIN,
  TASK_RUNNER,
} from '@server/domains/lib/auth/roles';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import {
  insertMockOrganization,
  withDomains,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import {
  insertMockUser,
  withCombinedRolesAndOrgId,
  withEmails,
} from '@server/domains/lib/testMockCreators/mockUser';
import { testACL } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withAppConfig,
  withEmailClient,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import sendUserListCSVEmail from '../sendUserListCSVEmail';

const MOCK_SIGNED_URL = 'https://signed.url-by-alphabet.inc';
const MOCK_ADMIN_MAIL = 'clark.kent@earth.org';
const MOCK_SUPER_ADMIN_MAIL = 'super.man@krypton.com';

chai.use(chaiAsPromised);

const setup = async () => {
  const emailClient = { send: sinon.stub().callsFake(stubSendMail) };

  const org = await insertMockOrganization(
    withDomains([{ name: 'krypton.com' }, { name: 'earth.org' }])
  );

  const superAdmin = await insertMockUser(
    withCombinedRolesAndOrgId([SUPER_ADMIN], org._id),
    withEmails([{ address: MOCK_SUPER_ADMIN_MAIL }])
  );

  const admin = await insertMockUser(
    withCombinedRolesAndOrgId([ADMIN], org._id),
    withEmails([{ address: MOCK_ADMIN_MAIL }])
  );

  const ctx = await R.pipe(
    withAppConfig({
      appUrl: 'http://app.url',
      hoxhuntApiUrl: 'http://hoxhuntApi.url',
      emailDelivery: {
        connectionOptions: 'smtp://random.place.com:666',
      },
    }),
    withEmailClient(emailClient, {}),
    withUserIdentity(admin),
    createIntegrationCtx
  )(null);

  return { ctx, org, superAdmin, emailClient };
};

describe('admin.userManagement.sendUserListCSVEmail', () => {
  testACL(sendUserListCSVEmail, [TASK_RUNNER]);
  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it('should build and send an email with content according to spec', async () => {
    const { ctx, emailClient } = await setup();

    await ctx.handlers.admin.userManagement.sendUserListCsvEmail(
      withTaskRunnerRole(ctx),
      {
        signedUrl: MOCK_SIGNED_URL,
        userId: ctx.identity.getId(),
      }
    );

    const mail = emailClient.send.firstCall.args[0].mail;

    expect(mail.html).contain(MOCK_SIGNED_URL);
    expect(mail.to).eql(MOCK_ADMIN_MAIL);
  });

  it('should send an email to the impersonator if a user is being impersonated', async () => {
    const { ctx, superAdmin, emailClient } = await setup();

    await ctx.handlers.admin.userManagement.sendUserListCsvEmail(
      withTaskRunnerRole(ctx),
      {
        signedUrl: MOCK_SIGNED_URL,
        userId: superAdmin._id,
      }
    );

    expect(emailClient.send.firstCall.args[0].mail.to).eql(
      MOCK_SUPER_ADMIN_MAIL
    );
  });
});
