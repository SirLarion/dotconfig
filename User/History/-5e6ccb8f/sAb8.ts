import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as R from 'ramda';

import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
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

import { IRemoveDomainPayload as TPayload } from '../lib/removeDomain.models';
import removeDomain from '../removeDomain';

chai.use(chaiAsPromised);

const MOCK_DOMAINS = [
  { name: 'moc.com' },
  { name: 'if.fi' },
  { name: 'kuoc.co.uk' },
];
const FALSE_DOMAIN = 'oi.io';
const DOMAIN_WITH_USERS = MOCK_DOMAINS[0].name;

const setup = async () => {
  const org = await insertMockOrganization(withDomains(MOCK_DOMAINS));
  const superAdmin = await insertMockUser(withGlobalRoles([SUPER_ADMIN]));
  const ctx = await R.pipe(
    withUserIdentity(superAdmin),
    createIntegrationCtx
  )(null);

  await insertMockUser(
    withOrganizationId(org._id),
    withEmails([{ address: `kalle.mockvist@${DOMAIN_WITH_USERS}` }])
  );

  return { org, ctx };
};

describe('collection.organization.removeDomain', () => {
  testACL(removeDomain, [SUPER_ADMIN]);

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it('should remove a domain if no users exist under it', async () => {
    const { ctx } = await setup();
    const organization =
      await ctx.handlers.collection.organization.removeDomain(ctx, {
        domainName: MOCK_DOMAINS[1].name,
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
        ctx.handlers.collection.organization.removeDomain(ctx, test.payload)
      ).to.be.rejectedWith(test.throws);
    });
  }
});
