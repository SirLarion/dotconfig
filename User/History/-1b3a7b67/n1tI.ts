import { expect } from 'chai';

import { ACL } from '@server/domains/lib/auth/roles';
import { testACL } from '@server/domains/lib/testShared';

import patch from '../patch';

import { testSanitation } from './shared';
import { createStubHandlerCtx } from '@server/domains/lib/testUtil';

describe('collection.organization.patch', () => {
  testACL(patch, [
    ACL.Roles.SUPER_ADMIN,
    ACL.Roles.TASK_RUNNER,
    ACL.Roles.ADMIN,
  ]);

  it('should throw if the payload contains domains with the same name', async () => {
    const ctx = await createStubHandlerCtx();
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
