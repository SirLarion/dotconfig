import { expect } from 'chai';
import { pipe } from 'ramda';

import {
  ADMIN,
  SUPER_ADMIN,
  TASK_RUNNER,
} from '@server/domains/lib/auth/roles';
import { insertMockUser } from '@server/domains/lib/testMockCreators/mockUser';
import { testACL } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import { ERROR_DUPLICATE_DOMAINS } from '../lib/lib';
import patch from '../patch';

import { testSanitation } from './shared';
import { insertMockOrganization } from '@server/domains/lib/testMockCreators/mockOrganization';

const setup = async ({ isDuplicate = false }) => {
  const user = await insertMockUser();
  const org = await insertMockOrganization();

  const ctx = await pipe(
    withUserIdentity(user, [SUPER_ADMIN]),
    createIntegrationCtx
  )(null);

  const payload = {
    id: org._id,
    data: {
      domains: [
        { name: 'domain.org' },
        { name: 'org.domain' },
        ...(isDuplicate ? [{ name: 'domain.org' }] : []),
      ],
    },
  };

  return { ctx, payload };
};

describe('collection.organization.patch', () => {
  testACL(patch, [SUPER_ADMIN, TASK_RUNNER, ADMIN]);
  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it('should throw if the payload contains domains with the same name', async () => {
    const { ctx, payload } = await setup({ isDuplicate: true });
    await expect(patch.handler(ctx, payload)).rejectedWith(
      ERROR_DUPLICATE_DOMAINS
    );
  });

  it('should not throw if the payload domains have no duplicates', async () => {
    const { ctx, payload } = await setup({});
    await expect(patch.handler(ctx, payload)).fulfilled;
  });

  describe('handler', () => {
    testSanitation(
      async (ctx, data) => patch.handler(ctx, { id: 'tmp', data }),
      (collection, data) => {
        [
          { _id: 'tmp' },
          {
            $set: {
              'incidentSettings.policies': data.incidentSettings.policies,
            },
          },
          {},
        ].forEach((obj, index) =>
          expect(collection.spies.updateOne.lastCall.args[index]).eql(obj)
        );
      }
    );
  });
});