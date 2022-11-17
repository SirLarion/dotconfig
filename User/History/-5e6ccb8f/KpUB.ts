import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as R from 'ramda';
import sinon from 'sinon';

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
import { testACL } from '@server/domains/lib/testShared';
import {
  createStubFind,
  createStubHandlerCtx,
} from '@server/domains/lib/testUtil';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import { IGetByDomainPayload } from '../lib/getByDomain.models';
import { IRemoveDomainPayload as TPayload } from '../lib/removeDomain.models';
import removeDomain from '../removeDomain';
import {
  createIntegrationCtx,
  withHandlerTree,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';

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
  const ctx = R.pipe(
    // withHandlerTree({
    //   collection: {
    //     organization: {
    //       getByDomain: sinon
    //         .stub()
    //         .callsFake((ctx, { domain }: IGetByDomainPayload) => ({
    //           organization: domain === FALSE_DOMAIN ? null : org,
    //         })),
    //     },
    //   },
    // }),
    withUserIdentity(superAdmin),
    createIntegrationCtx
  )(null);

  await insertMockUser(
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
      throws: `FailedPrecondition: Removing domain: ${DOMAIN_WITH_USERS} failed. User email addresses exist under the domain.`,
    },
    {
      description:
        'should throw if attempting to remove a domain that does not exist',
      payload: { domainName: FALSE_DOMAIN },
      throws: `InvalidArgument: No organization with domain: ${FALSE_DOMAIN} exists`,
    },
  ];

  for (const test of sadCaseTests) {
    it(test.description, async () => {
      const { ctx } = await setup({
        emails: [{ address: `kalle.mockvist@${DOMAIN_WITH_USERS}` }],
      });
      expect(
        await ctx.handlers.collection.organization.removeDomain(
          ctx,
          test.payload
        )
      ).to.throw(test.throws);
    });
  }
});
