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
import { IDomain } from '@server/lib/typedSchemas/Organization/models';

chai.use(chaiAsPromised);

const MOCK_ORG_ID = 'Moccachino-Oy';
const MOCK_DOMAIN = { name: 'moc.com' };
const EXISTING_DOMAIN = { name: 'if.fi' };

const setup = async () => {
  const org = await insertMockOrganization(
    withOrganizationOverrides({ _id: MOCK_ORG_ID }),
    withDomains([EXISTING_DOMAIN])
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
      domainInput: MOCK_DOMAIN,
    });
    const organization = await ctx.handlers.collection.organization.get(ctx, {
      id: org._id,
    });
    expect(organization.domains).eql([EXISTING_DOMAIN, MOCK_DOMAIN]);
  });

  it('should not allow an admin to add a domain to another organization', async () => {
    const { otherOrg, ctx } = await setup();
    await expect(
      ctx.handlers.organization.domain.add(ctx, {
        organizationId: otherOrg._id,
        domainInput: MOCK_DOMAIN,
      })
    ).to.be.rejectedWith('Unauthorized input');
  });

  it('should throw if trying to add a domain that already exists', async () => {
    await expect(
      ctx.handler.organization.domain.add(ctx, {
        organizationId: org._id,
        domainInput: EXISTING_DOMAIN,
      })
    ).to.be.rejectedWith(
      `Adding domain failed. Domain: ${EXISTING_DOMAIN.name} already exists.`
    );
  });
});
