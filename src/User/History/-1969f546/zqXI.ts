import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';
import sinon from 'sinon';

import { SUPER_ADMIN, TASK_RUNNER } from '@server/domains/lib/auth/roles';
import { insertMockOrganization } from '@server/domains/lib/testMockCreators/mockOrganization';
import {
  insertMockUser,
  withOrganization,
} from '@server/domains/lib/testMockCreators/mockUser';
import { testACL, verifyAnalytics } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withGlobals,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import create from '../create';
import { ICreatePayload as TPayload } from '../lib/create.models';

chai.use(chaiAsPromised);

const FROZEN_DATE = new Date();

const setup = async () => {
  const organization = await insertMockOrganization();
  const user = await insertMockUser(withOrganization(organization));

  const ctx = await R.pipe(
    withUserIdentity(user),
    withGlobals({ newDate: () => FROZEN_DATE }),
    createIntegrationCtx
  )(null);

  const analyticSpies = {
    ingest: { track: sinon.spy(ctx.handlers.analytics.ingest, 'track') },
    sink: { track: sinon.spy(ctx.handlers.analytics.sink, 'track') },
  };

  return { ctx, analyticSpies };
};

describe('collection.industry.create', async () => {
  testACL(create, [SUPER_ADMIN, TASK_RUNNER]);

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it('should create an industry object successfully with valid input', async () => {
    const { ctx, analyticsSpies } = await setup();
  });
});
