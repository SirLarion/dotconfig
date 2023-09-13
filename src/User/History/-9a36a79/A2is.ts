import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';

import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import {
  insertMockOrganization,
  withDomains,
  withOrganizationOverrides,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import {
  insertMockUser,
  withCombinedRolesAndOrgId,
  withOrganization,
  withUserOverrides,
} from '@server/domains/lib/testMockCreators/mockUser';
import { testACL } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withGlobals,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import { IUpdateEmailAddressPayload as TPayload } from '../lib/updateEmailAddress.models';
import updateEmailAddress, {
  ERROR_ORG_SCIM_ENABLED,
} from '../updateEmailAddress';

chai.use(chaiAsPromised);

interface ISetupConfig {
  isSuperAdmin?: boolean;
  isScimEnabled?: boolean;
}

const FROZEN_DATE = new Date();

const MOCK_DOMAIN = 'doma.in';
const BAD_MOCK_DOMAIN = 'dorka.in';
const MOCK_USER_ID = 'doug dimmadome';

const MOCK_ORG_ID = 'dimmsdale dimmadome';
const MOCK_ORG_ID_2 = 'funkytown';

describe('user.adminAction.updateEmailAddress', async () => {
  testACL(updateEmailAddress, [ADMIN, SUPER_ADMIN]);

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  const setup = async ({ isSuperAdmin, isScimEnabled }: ISetupConfig = {}) => {
    const organization = await insertMockOrganization(
      withOrganizationOverrides({
        _id: MOCK_ORG_ID,
        ...((isScimEnabled && {
          scim: {
            authToken: {
              jti: 'jitjitjit',
              createdAt: new Date(),
              generatedBy: 'adminfella',
            },
          },
        }) ||
          {}),
      }),
      withDomains([{ name: MOCK_DOMAIN }])
    );

    await insertMockOrganization(
      withOrganizationOverrides({ _id: MOCK_ORG_ID_2 })
    );

    const user = await insertMockUser(
      withOrganization(organization),
      withUserOverrides({
        _id: MOCK_USER_ID,
        emails: [{ address: `janteri.santeri@${MOCK_DOMAIN}` }],
      })
    );

    const admin = await insertMockUser(
      withCombinedRolesAndOrgId([ADMIN], organization._id)
    );

    const superAdmin = await insertMockUser(
      withCombinedRolesAndOrgId([SUPER_ADMIN], 'osiehrwoieh')
    );

    const ctx = await R.pipe(
      withUserIdentity(isSuperAdmin ? superAdmin : admin),
      withGlobals({ newDate: () => FROZEN_DATE }),
      createIntegrationCtx
    )(null);

    return { ctx, user };
  };

  const happyCaseTests: Array<{
    description: string;
    payload: TPayload;
    isSuperAdmin?: boolean;
  }> = [
    {
      description:
        'should update a user email address successfully with valid input',
      payload: {
        userId: MOCK_USER_ID,
        organizationId: MOCK_ORG_ID,
        emailAddress: `janteri.mocqvist@${MOCK_DOMAIN}`,
      },
    },
  ];

  for (const test of happyCaseTests) {
    it(test.description, async () => {
      const { ctx } = await setup({});

      const result = await ctx.handlers.user.adminAction.updateEmailAddress(
        ctx,
        test.payload
      );

      expect(result.emails[0].address).eql(test.payload.emailAddress);
    });
  }

  const sadCaseTests: Array<{
    description: string;
    payload: TPayload;
    throws: string;
    isScimEnabled?: boolean;
  }> = [
    {
      description: `should throw if the user's org has SCIM enabled`,
      payload: {
        userId: MOCK_USER_ID,
        organizationId: MOCK_ORG_ID,
        emailAddress: `janteri.mocqvist@${MOCK_DOMAIN}`,
      },
      throws: ERROR_ORG_SCIM_ENABLED,
      isScimEnabled: true,
    },
    {
      description: `should throw if the email address does not belong under one of the org's domains`,
      payload: {
        userId: MOCK_USER_ID,
        organizationId: MOCK_ORG_ID,
        emailAddress: `janteri.mocqvist@${BAD_MOCK_DOMAIN}`,
      },
      throws: `Could not update email address: the domain for janteri.mocqvist@${BAD_MOCK_DOMAIN} does not exist.`,
    },
    {
      description: `should throw if updating a user email from another org`,
      payload: {
        organizationId: MOCK_ORG_ID_2,
        userId: 'trivial123',
        emailAddress: 'dragon.slayer@gmail.com',
      },
      throws: `Unauthorized input`,
    },
  ];

  for (const test of sadCaseTests) {
    it(test.description, async () => {
      const { ctx } = await setup({ ...test });

      await expect(
        ctx.handlers.user.adminAction.updateEmailAddress(ctx, test.payload)
      ).rejectedWith(test.throws);
    });
  }
});
