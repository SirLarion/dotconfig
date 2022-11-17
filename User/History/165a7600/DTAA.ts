import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';
import sinon from 'sinon';

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

const setup = async () => {
  const stubSend = sinon
    .stub()
    .resolves({ messageId: 'msgId', accepted: [], rejected: [] });

  const org = await insertMockOrganization();
  const user = await insertMockUser(
    withCombinedRolesAndOrgId([SUPER_ADMIN], org._id)
  );

  const ctx = await R.pipe(
    withAppConfig({
      appUrl: 'http://app.url',
      hoxhuntApiUrl: 'http://hoxhuntApi.url',
    }),
    withEmailClient({ send: stubSend }, {}),
    withUserIdentity(user),
    createIntegrationCtx
  )(null);

  return { ctx, org, stubSend };
};

describe('admin.userManagement.sendUserListCSVEmail', () => {
  testACL(sendUserListCSVEmail, [ADMIN, SUPER_ADMIN]);
  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it('should build and send an email with content according to spec', async () => {
    const { ctx, org, stubSend } = await setup();

    await insertMockUser(withCombinedRolesAndOrgId([ADMIN], org._id));

    await sendUserListCSVEmail.handler(ctx, {
      signedUrl: MOCK_SIGNED_URL,
    });

    const mailHtml = stubSend.firstCall.args[0].mail.html;

    expect(mailHtml).contain(MOCK_SIGNED_URL);
  });

  it('should send emails to all (and only) admins in the organization', async () => {
    const { ctx, org, stubSend } = await setup();

    const N = 5;

    R.times(
      async () =>
        await insertMockUser(withCombinedRolesAndOrgId([ADMIN], org._id)),
      N
    );
    await insertMockUser();

    await sendUserListCSVEmail.handler(ctx, {
      organizationId: org._id,
    });

    expect(stubSend.callCount).eql(N);
  });
});
