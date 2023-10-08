import { expect } from 'chai';

import { ACL, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { testACL } from '@server/domains/lib/testShared';
import { createStubHandlerCtx } from '@server/domains/lib/testUtil';

import patch from '../patch';

import { testSanitation } from './shared';
import { withRoles } from '@server/domains/lib/testMockCreators/mockUser';
import { ERROR_DUPLICATE_DOMAINS } from '../lib/lib';

describe('collection.organization.patch', () => {
  testACL(patch, [
    ACL.Roles.SUPER_ADMIN,
    ACL.Roles.TASK_RUNNER,
    ACL.Roles.ADMIN,
  ]);

  it('should throw if the payload contains domains with the same name', async () => {
    const ctx = await createStubHandlerCtx({});

    const payload = {
      id: 'erhselkrh',
      data: {
        domains: [
          { name: 'domain.org' },
          { name: 'org.domain' },
          { name: 'domain.org' },
        ],
      },
    };

    expect(async () => await patch.handler(ctx, payload)).to.throw(
      ERROR_DUPLICATE_DOMAINS
    );
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