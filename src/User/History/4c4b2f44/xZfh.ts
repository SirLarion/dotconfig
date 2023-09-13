import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';
import sinon from 'sinon';

import { TASK_RUNNER } from '@server/domains/lib/auth/roles';
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

import { IPatchPayload as TPayload } from '../lib/patch.models';
import patch from '../patch';

chai.use(chaiAsPromised);

const FROZEN_DATE = new Date();

describe('collection.industry.patch', async () => {
  testACL(patch, [TASK_RUNNER]);

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

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

  const happyCaseTests: Array<{
    description: string;
    payload: TPayload;
  }> = [
    {
      description: `Happy cases should be tested`,
      payload: {
        id: '',
        data: {},
      },
    },
  ];

  for (const test of happyCaseTests) {
    it(test.description, async () => {
      const { ctx, analyticSpies } = await setup();

      const result = await patch.handler(ctx, test.payload);

      // remember to verify analytics
      await verifyAnalytics(ctx, analyticSpies, []);

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
      payload: {
        id: '',
        data: {},
      },
      throws: 'Error in reasoning',
    },
  ];

  for (const test of sadCaseTests) {
    it(test.description, async () => {
      const { ctx } = await setup();

      await expect(patch.handler(ctx, test.payload)).to.be.rejectedWith(
        () => test.throws
      );
    });
  }
});
