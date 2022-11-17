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

import create from '../create';

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

  return { ctx };
};

describe('collection.industry.create', async () => {
  testACL(create, [SUPER_ADMIN]);

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it('should create an industry object successfully with valid input', async () => {
    const { ctx } = await setup();

    const { _id } = await ctx.handlers.collection.industry.create(
      ctx,
      MOCK_INDUSTRY_PAYLOAD
    );

    const industry = await ctx.handlers.collection.industry.get(ctx, {
      industryId: _id,
    });

    expect(industry.name).eql(MOCK_INDUSTRY_NAME);
  });

  it('should not allow creating an industry with an empty name', async () => {
    const { ctx } = await setup();

    await expect(
      ctx.handlers.collection.industry.create(ctx, {
        data: { name: '' },
      })
    ).rejectedWith('Name is required in Industries insert');
  });

  it('should not allow creating an industry with a duplicate name', async () => {
    const { ctx } = await setup();

    await ctx.handlers.collection.industry.create(ctx, MOCK_INDUSTRY_PAYLOAD);

    await expect(
      ctx.handlers.collection.industry.create(ctx, MOCK_INDUSTRY_PAYLOAD)
    ).rejectedWith(/E11000 duplicate key error/);
  });
});
