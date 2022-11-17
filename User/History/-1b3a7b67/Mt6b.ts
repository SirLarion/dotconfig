import { expect } from 'chai';

import {
  ADMIN,
  SUPER_ADMIN,
  TASK_RUNNER,
} from '@server/domains/lib/auth/roles';
import { testACL } from '@server/domains/lib/testShared';
import { createStubHandlerCtx } from '@server/domains/lib/testUtil';

import { ERROR_DUPLICATE_DOMAINS } from '../lib/lib';
import patch from '../patch';

import { testSanitation } from './shared';
import { insertMockUser } from '@server/domains/lib/testMockCreators/mockUser';

const setup = ({ isDuplicate = false }) => {
  const user = await insertMockUser();

  const ctx = await R.pipe(
    withUserIdentity(user, [SUPER_ADMIN]),
    withHandlerTree({
      infrastructure: {
        dkim: {
          create: dkimCreateStub,
        },
      },
    }),
    withTaskQueue(taskQueueStub),
    createIntegrationCtx
  )(null);

  const payload = {
    id: 'erhselkrh',
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

  it('should throw if the payload contains domains with the same name', async () => {
    const { ctx, payload } = setup({ isDuplicate: true });
    await expect(patch.handler(ctx, payload)).rejectedWith(
      ERROR_DUPLICATE_DOMAINS
    );
  });

  it('should not throw if the payload domains have no duplicates', async () => {
    const { ctx, payload } = setup({});
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
