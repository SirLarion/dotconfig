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

import { NO_ADMINS_ERROR } from '../lib/sendOnboardingInvitationToAdmins.lib';
import sendOnboardingInvitationToAdmins from '../sendOnboardingInvitationToAdmins';

chai.use(chaiAsPromised);

const mockWelcomeDomain = 'onboarding.welcome';

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
      organizationOnboardingWelcomeUrl: `http://${mockWelcomeDomain}`,
    }),
    withEmailClient({ send: stubSend }, {}),
    withUserIdentity(user),
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

  it('should build and send an email with content according to spec', async () => {
    const { ctx, org, stubSend } = await setup();

    const adminFirstName = 'Nimda';

    await insertMockUser(
      withCombinedRolesAndOrgId([ADMIN], org._id),
      withDefaultProfile({ firstName: adminFirstName })
    );

    await sendOnboardingInvitationToAdmins.handler(ctx, {
      organizationId: org._id,
    });

    const mail = stubSend.firstCall.args[0].mail;

    expect(mail.html).contain(mockWelcomeDomain);
    expect(mail.html).contain(adminFirstName);
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

    await sendOnboardingInvitationToAdmins.handler(ctx, {
      organizationId: org._id,
    });

    expect(stubSend.callCount).eql(N);
  });
});