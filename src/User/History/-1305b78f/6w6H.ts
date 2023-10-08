import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as R from 'ramda';

import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import {
  insertMockOrganization,
  withDomains,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import {
  insertMockUser,
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

const MOCK_DOMAINS = [
  { name: 'moc.com' },
  { name: 'if.fi' },
  { name: 'kuoc.co.uk' },
];
const FALSE_DOMAIN = { name: 'oi.io' };
const DOMAIN_WITH_USERS = MOCK_DOMAINS[0];

const setup = async () => {
  const org = await insertMockOrganization(withDomains(MOCK_DOMAINS));
  const superAdmin = await insertMockUser(withGlobalRoles([SUPER_ADMIN]));
  const ctx = await R.pipe(
    withUserIdentity(superAdmin),
    createIntegrationCtx
  )(null);

  await insertMockUser(
    withOrganizationId(org._id),
    withEmails([{ address: `kalle.mockvist@${DOMAIN_WITH_USERS.name}` }])
  );

  return { org, ctx };
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

  const sadCaseTests: Array<{
    description: string;
    payload: TPayload;
    throws: string;
  }> = [
    {
      description:
        'should throw if attempting to remove a domain with users under it',
      payload: { domainName: DOMAIN_WITH_USERS },
      throws: `Removing domain: ${DOMAIN_WITH_USERS} failed. User email addresses exist under the domain.`,
    },
    {
      description:
        'should throw if attempting to remove a domain that does not exist',
      payload: { domainName: FALSE_DOMAIN },
      throws: `No organization with domain: ${FALSE_DOMAIN} exists`,
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