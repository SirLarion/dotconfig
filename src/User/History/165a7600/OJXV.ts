import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';
import sinon from 'sinon';

import { stubSendMail } from '@server/domains/integration/email/lib/stubEmailClient';
import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { insertMockOrganization } from '@server/domains/lib/testMockCreators/mockOrganization';
import {
  insertMockUser,
  withCombinedRolesAndOrgId,
  withDefaultProfile,
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

chai.use(chaiAsPromised);

const setup = async ({ isSuperAdmin?: boolean}) => {
  const emailClient = { send: sinon.stub().callsFake(stubSendMail) };

  const org = await insertMockOrganization();

  const superAdmin = await insertMockUser(
    withCombinedRolesAndOrgId([SUPER_ADMIN], 'jeqquOrg')
  );

  const user = await insertMockUser(
    withCombinedRolesAndOrgId([ADMIN], org._id)
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
    withUserIdentity(user),
    createIntegrationCtx
  )(null);

  return { ctx, org, emailClient };
};

describe('admin.userManagement.sendUserListCSVEmail', () => {
  testACL(sendUserListCSVEmail, [ADMIN, SUPER_ADMIN]);
  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it('should build and send an email with content according to spec', async () => {
    const { ctx, emailClient } = await setup();

    await sendUserListCSVEmail.handler(ctx, {
      signedUrl: MOCK_SIGNED_URL,
    });

    const mailHtml = emailClient.send.firstCall.args[0].mail.html;

    expect(mailHtml).contain(MOCK_SIGNED_URL);
  });

  it('should send an email to the impersonator if a user is being impersonated', async () => {});
});