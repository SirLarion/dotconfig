import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as R from 'ramda';

import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import {
  insertMockOrganization,
  withDomains,
  withOrganizationOverrides,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import {
  insertMockUser,
  withCombinedRolesAndOrgId,
  withEmails,
  withGlobalRoles,
} from '@server/domains/lib/testMockCreators/mockUser';
import { withOrganizationId } from '@server/domains/lib/testMockCreators/mockUtil';
import { testACL } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import { IRemovePayload as TPayload } from '../lib/remove.models';
import remove from '../remove';

chai.use(chaiAsPromised);

const MOCK_ORG_ID = 'Moccachino-Oy';
const MOCK_DOMAINS = [
  { name: 'moc.com' },
  { name: 'if.fi' },
  { name: 'kuoc.co.uk' },
];
const FALSE_DOMAIN = { name: 'oi.io' };
const DOMAIN_WITH_USERS = MOCK_DOMAINS[0];

const setup = async () => {
  const org = await insertMockOrganization(
    withOrganizationOverrides({ _id: MOCK_ORG_ID }),
    withDomains(MOCK_DOMAINS)
  );
  const otherOrg = await insertMockOrganization();

  const admin = await insertMockUser(
    withCombinedRolesAndOrgId([ADMIN], org._id)
  );
  const ctx = await R.pipe(withUserIdentity(admin), createIntegrationCtx)(null);

  await insertMockUser(
    withOrganizationId(org._id),
    withEmails([{ address: `kalle.mockvist@${DOMAIN_WITH_USERS.name}` }])
  );

  return { org, otherOrg, ctx };
};

describe('organization.domain.remove', () => {
  testACL(remove, [ADMIN, SUPER_ADMIN]);

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it('should remove a domain if no users exist under it', async () => {
    const { org, ctx } = await setup();
    await ctx.handlers.organization.domain.remove(ctx, {
      organizationId: org._id,
      domainInput: MOCK_DOMAINS[1],
    });
    const organization = await ctx.handlers.collection.organization.get(ctx, {
      id: org._id,
    });
    expect(organization.domains).eql(R.remove(1, 1, MOCK_DOMAINS));
  });

  it('should not allow an admin to remove a domain under another organization', async () => {
    const { otherOrg, ctx } = await setup();
    await expect(
      ctx.handlers.organization.domain.remove(ctx, {
        organizationId: otherOrg._id,
        domainInput: MOCK_DOMAINS[1],
      })
    ).to.be.rejectedWith('Unauthorized input');
  });

  const sadCaseTests: Array<{
    description: string;
    payload: TPayload;
    throws: string;
  }> = [
    {
      description:
        'should throw if attempting to remove a domain with users under it',
      payload: { organizationId: MOCK_ORG_ID, domainInput: DOMAIN_WITH_USERS },
      throws: `Removing domain: ${DOMAIN_WITH_USERS.name} failed. User email addresses exist under the domain.`,
    },
    {
      description:
        'should throw if attempting to remove a domain that does not exist',
      payload: { organizationId: MOCK_ORG_ID, domainInput: FALSE_DOMAIN },
      throws: `Accessing domain failed. Domain: ${FALSE_DOMAIN.name} not found.`,
    },
  ];

  for (const test of sadCaseTests) {
    it(test.description, async () => {
      const { ctx } = await setup();
      await expect(
        ctx.handlers.organization.domain.remove(ctx, test.payload)
      ).to.be.rejectedWith(test.throws);
    });
  }
});
