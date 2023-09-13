import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';

import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import {
  insertMockOrganization,
  withOrganizationOverrides,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import { insertMockUser } from '@server/domains/lib/testMockCreators/mockUser';
import { testACL } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withGlobals,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import remove from '../remove';

chai.use(chaiAsPromised);

const MOCK_INDUSTRY_NAME = 'Lego building';
const MOCK_INDUSTRY_WITH_ORG_NAME = 'Lego structure modifying';

const FROZEN_DATE = new Date();

const setup = async () => {
  const user = await insertMockUser();

  const ctx = await R.pipe(
    withUserIdentity(user, [SUPER_ADMIN]),
    withGlobals({ newDate: () => FROZEN_DATE }),
    createIntegrationCtx
  )(null);

  const industryWithOrg = await ctx.handlers.collection.industry.create(ctx, {
    data: { name: MOCK_INDUSTRY_WITH_ORG_NAME },
  });

  const industry = await ctx.handlers.collection.industry.create(ctx, {
    data: { name: MOCK_INDUSTRY_NAME },
  });

  await insertMockOrganization(
    withOrganizationOverrides({ industryId: industryWithOrg._id })
  );

  return { ctx, industry, industryWithOrg };
};

describe('collection.industry.remove', async () => {
  testACL(remove, [SUPER_ADMIN]);

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it('should remove an industry object successfully with valid input', async () => {
    const { ctx, industry } = await setup();

    await ctx.handlers.collection.industry.remove(ctx, { id: industry._id });

    const removedIndustry = await ctx.handlers.collection.industry.get(ctx, {
      industryId: industry._id,
    });

    expect(removedIndustry).eql(null);
  });

  it('should not remove an industry if it has been configured for an organization', async () => {
    const { ctx, industryWithOrg } = await setup();

    await expect(
      ctx.handlers.collection.industry.remove(ctx, { id: industryWithOrg._id })
    ).rejectedWith(
      `Cannot remove industry with ID: ${industryWithOrg._id}. Organizations exist under this industry.`
    );

    expect(
      await ctx.handlers.collection.industry.get(ctx, {
        industryId: industryWithOrg._id,
      })
    ).eql(industryWithOrg);
  });
});
