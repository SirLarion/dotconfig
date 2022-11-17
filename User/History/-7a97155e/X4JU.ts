import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';

import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { insertMockUser } from '@server/domains/lib/testMockCreators/mockUser';
import { testACL } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withGlobals,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import setOrganizationIndustry from '../setOrganizationIndustry';
import { insertMockOrganization } from '@server/domains/lib/testMockCreators/mockOrganization';

chai.use(chaiAsPromised);

const MOCK_INDUSTRY_NAME = 'Lego building';
const MOCK_INDUSTRY_PAYLOAD = { data: { name: MOCK_INDUSTRY_NAME } };

const FROZEN_DATE = new Date();

const setup = async () => {
  const user = await insertMockUser();

  const ctx = await R.pipe(
    withUserIdentity(user, [SUPER_ADMIN]),
    withGlobals({ newDate: () => FROZEN_DATE }),
    createIntegrationCtx
  )(null);

  const { _id: organizationId } = await insertMockOrganization();

  const { _id: industryId } = await ctx.handlers.collection.industry.create(
    ctx,
    MOCK_INDUSTRY_PAYLOAD
  );

  return { ctx, industryId, organizationId };
};

describe('admin.industries.setOrganizationIndustry', async () => {
  testACL(setOrganizationIndustry, [SUPER_ADMIN]);

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it(`should set the organization's industry successfully with valid input`, async () => {
    const { ctx, industryId, organizationId } = await setup();

    await ctx.handlers.admin.industries.setOrganizationIndustry(ctx, {
      organizationId,
      industryId,
    });

    const org = await ctx.handlers.collection.organization.get(ctx, {
      id: organizationId,
    });

    expect(org.industryId).eql(industryId);
  });

  it('should throw if the given industryId was not found', async () => {
    const { ctx, organizationId } = await setup();

    await expect(
      ctx.handlers.admin.industries.setOrganizationIndustry(ctx, {
        industryId: 'liibalaaba',
        organizationId,
      })
    ).rejectedWith(
      `Failed to updated organization's industry. Industry with ID: liibalaaba was not found`
    );
  });
});
