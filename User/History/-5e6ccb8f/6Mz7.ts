import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { remove } from 'ramda';
import sinon from 'sinon';

import get from '@server/domains/collection/organization/get';
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
import { createStubHandlerCtx } from '@server/domains/lib/testUtil';
import { withHandlerTree } from '@server/domains/lib/testUtilIntegration';
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
  console.log(org.domains);
  const user = await insertMockUser(withGlobalRoles([SUPER_ADMIN]));
  const ctx = createStubHandlerCtx({
    user,
    handlers: {
      collection: {
        organization: {
          getByDomain: (ctx, { domainName }) =>
            domainName === FALSE_DOMAIN ? null : org,
        },
      },
    },
  });

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
    const { org, ctx } = await setup();
    await removeDomain.handler(ctx, {
      domainName: MOCK_DOMAINS[1].name,
    });
    const organization = await get.handler(ctx, { id: org._id });
    await expect(organization.domains).eql(remove(1, 1, MOCK_DOMAINS));
  });

  const sadCaseTests: Array<{
    description: string;
    payload: TPayload;
    throws: string | RegExp | Error;
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
      await expect(removeDomain.handler(ctx, test.payload)).to.be.rejectedWith(
        () => test.throws
      );
    });
  }
});
