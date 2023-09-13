import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { testACL } from '@server/domains/lib/testShared';
import { createStubHandlerCtx } from '@server/domains/lib/testUtil';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import add from '../add';
import { IAddPayload as TPayload } from '../lib/add.models';
import {
  insertMockOrganization,
  withDomains,
  withOrganizationOverrides,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import {
  insertMockUser,
  withEmails,
  withCombinedRolesAndOrgId,
} from '@server/domains/lib/testMockCreators/mockUser';
import {
  createIntegrationCtx,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';

import { withOrganizationId } from '@server/domains/lib/testMockCreators/mockUtil';

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

describe('organization.domain.add', () => {
  testACL(add, [ADMIN, SUPER_ADMIN]);

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  const happyCaseTests: Array<{
    description: string;
    payload: TPayload;
  }> = [
    {
      description: `Happy cases should be tested`,
      payload: {},
    },
  ];

  for (const test of happyCaseTests) {
    it(test.description, async () => {
      const ctx = createStubHandlerCtx({
        http: sinon.stub().rejects('no.'),
      });

      const result = await add.handler(ctx, test.payload);

      expect(result).eql(false);
    });
  }

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
