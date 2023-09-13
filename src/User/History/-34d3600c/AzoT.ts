import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';
import sinon from 'sinon';

import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { insertMockOrganization } from '@server/domains/lib/testMockCreators/mockOrganization';
import { testACL } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withAppConfig,
  withEmailClient,
  withTaskRunnerUserRole,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import { NO_ADMINS_ERROR } from '../lib/sendOnboardingInvitationToAdmins.lib';
import sendOnboardingInvitationToAdmins from '../sendOnboardingInvitationToAdmins';
import {
  insertMockUser,
  withCombinedRolesAndOrgId,
} from '@server/domains/lib/testMockCreators/mockUser';

chai.use(chaiAsPromised);

const setup = async () => {
  const stubSend = sinon
    .stub()
    .resolves({ messageId: 'msgId', accepted: [], rejected: [] });

  const org = await insertMockOrganization();

  const ctx = await R.pipe(
    withAppConfig({
      appUrl: 'http://app.url',
      hoxhuntApiUrl: 'http://hoxhuntApi.url',
      organizationOnboardingWelcomeUrl: 'http://localhost.welcome',
    }),
    withEmailClient({ send: stubSend }, {}),
    withTaskRunnerUserRole,
    createIntegrationCtx
  )(null);

  return { ctx, org, stubSend };
};

describe('admin.organizationOnboarding.sendOnboardingInvitationToAdmins', () => {
  testACL(sendOnboardingInvitationToAdmins, [SUPER_ADMIN]);
  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it('should throw an error if an organization with the given ID does not exist', async () => {
    const { ctx, stubSend } = await setup();

    try {
      await sendOnboardingInvitationToAdmins.handler(ctx, {
        organizationId: 'fantasyLandOrganization123',
      });
      expect.fail();
    } catch {
      expect(stubSend.callCount).eql(0);
    }
  });

  it('should throw an error when there are no admin users in the organization', async () => {
    const { ctx, org, stubSend } = await setup();

    try {
      await sendOnboardingInvitationToAdmins.handler(ctx, {
        organizationId: org._id,
      });
      expect.fail();
    } catch (e) {
      expect(e.message).eql(NO_ADMINS_ERROR);
      expect(stubSend.callCount).eql(0);
    }
  });

  it('should build an email that contains text and metadata according to spec', async () => {
    const { ctx, org, stubSend } = await setup();

    await insertMockUser(withCombinedRolesAndOrgId([ADMIN], org._id));

    const emailResponse = await sendOnboardingInvitationToAdmins.handler(ctx, {
      organizationId: org._id,
    });

    console.log(emailResponse);

    expect(stubSend.callCount).eql(1);
  });

  it('should send emails to all admins in the organization', async () => {
    const { ctx, org, stubSend } = await setup();

    const N = 5;

    R.times(
      async () =>
        await insertMockUser(withCombinedRolesAndOrgId([ADMIN], org._id)),
      N
    );
  });
});
