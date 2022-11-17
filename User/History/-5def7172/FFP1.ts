import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

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
} from '@server/domains/lib/testMockCreators/mockUser';
import { withOrganizationId } from '@server/domains/lib/testMockCreators/mockUtil';
import { testACL } from '@server/domains/lib/testShared';
import { createStubHandlerCtx } from '@server/domains/lib/testUtil';
import {
  createIntegrationCtx,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import add from '../add';
import { IAddPayload as TPayload } from '../lib/add.models';

chai.use(chaiAsPromised);

const MOCK_ORG_ID = 'Moccachino-Oy';
const MOCK_DOMAINS = [
  { name: 'moc.com' },
  { name: 'if.fi' },
  { name: 'kuoc.co.uk' },
];
const EXISTING_DOMAIN = MOCK_DOMAINS[1];

const setup = async () => {
  const org = await insertMockOrganization(
    withOrganizationOverrides({ _id: MOCK_ORG_ID }),
    withDomains([MOCK_DOMAINS[1]])
  );
  const otherOrg = await insertMockOrganization();

  const admin = await insertMockUser(
    withCombinedRolesAndOrgId([ADMIN], org._id)
  );
  const ctx = await R.pipe(withUserIdentity(admin), createIntegrationCtx)(null);

  return { org, otherOrg, ctx };
};

describe('organization.domain.add', () => {
  testACL(add, [ADMIN, SUPER_ADMIN]);

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it('should add a domain correctly', async () => {
    const { org, ctx } = await setup();
    await ctx.handlers.organization.domain.add(ctx, {
      organizationId: org._id,
      domainInput: MOCK_DOMAINS[0],
    });
    const organization = await ctx.handlers.collection.organization.get(ctx, {
      id: org._id,
    });
    expect(organization.domains).eql(R.remove(1, 1, MOCK_DOMAINS));
  });

  const sadCaseTests: Array<{
    description: string;
    payload: TPayload;
    throws: string | RegExp | Error;
  }> = [
    {
      description: `Sad error cases should be tested`,
      payload: {},
      throws: 'Error in reasoning',
    },
  ];

  for (const test of sadCaseTests) {
    it(test.description, async () => {
      const ctx = createStubHandlerCtx({
        http: sinon.stub().rejects('no.'),
      });

      await expect(add.handler(ctx, test.payload)).to.be.rejectedWith(
        () => test.throws
      );
    });
  }
});
