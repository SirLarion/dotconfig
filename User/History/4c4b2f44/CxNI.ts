import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';

import { SUPER_ADMIN, TASK_RUNNER } from '@server/domains/lib/auth/roles';
import { insertMockUser } from '@server/domains/lib/testMockCreators/mockUser';
import { testACL } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withGlobals,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import patch from '../patch';

chai.use(chaiAsPromised);

const MOCK_EXISTING_INDUSTRY_NAME = 'Competitive Lego building';
const MOCK_NEW_INDUSTRY_NAME = 'Competitive Lego structure modifying';
// const MOCK_INDUSTRY_PAYLOAD = { data: { name: MOCK_INDUSTRY_NAME } };

const FROZEN_DATE = new Date();

const setup = async () => {
  const user = await insertMockUser();

  const ctx = await R.pipe(
    withUserIdentity(user, [SUPER_ADMIN]),
    withGlobals({ newDate: () => FROZEN_DATE }),
    createIntegrationCtx
  )(null);

  const existingIndustry = await ctx.handlers.collection.industry.create(ctx, {
    data: { name: MOCK_EXISTING_INDUSTRY_NAME },
  });

  return { ctx, existingIndustry };
};

describe('collection.industry.patch', async () => {
  testACL(patch, [SUPER_ADMIN, TASK_RUNNER]);

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it('should modify an industry object successfully with valid input', async () => {
    const { ctx, existingIndustry } = await setup();

    await ctx.handlers.collection.industry.patch(ctx, {
      id: existingIndustry._id,
      data: { name: MOCK_NEW_INDUSTRY_NAME },
    });

    const industry = await ctx.handlers.collection.industry.get(ctx, {
      industryId: existingIndustry._id,
    });

    expect(industry.name).eql(MOCK_NEW_INDUSTRY_NAME);
  });

  it('should not allow setting an empty name for an industry', async () => {
    const { ctx, existingIndustry } = await setup();

    await expect(
      ctx.handlers.collection.industry.patch(ctx, {
        id: existingIndustry._id,
        data: { name: '' },
      })
    ).rejected;
  });

  it('should not allow setting a duplicate name for an industry', async () => {
    const { ctx, existingIndustry } = await setup();

    await ctx.handlers.collection.industry.create(ctx, {
      data: { name: 'Polluting for sport' },
    });
    await expect(
      ctx.handlers.collection.industry.patch(ctx, {
        id: existingIndustry._id,
        data: { name: '' },
      })
    ).rejected;
  });
});
