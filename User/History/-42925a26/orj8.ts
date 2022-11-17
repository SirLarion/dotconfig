import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import { mockResolverInfoWith } from '@server/api/graphql/graphQLTestUtils';
import { EUserRole, TASK_RUNNER } from '@server/domains/lib/auth/roles';
import {
  insertMockUser,
  withOrgRoles,
} from '@server/domains/lib/testMockCreators/mockUser';
import { testACL } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import findTestTemplates from '../findTestTemplates';
import { IFindTestTemplatesPayload } from '../lib/findTestTemplates.models';

chai.use(chaiAsPromised);

describe.only('admin.technicalTesting.findTestTemplates', () => {
  testACL(findTestTemplates, [TASK_RUNNER]);
  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  const setup = async () => {
    const user = await insertMockUser(withOrgRoles([EUserRole.ADMIN]));

    const ctx = await R.pipe(
      withUserIdentity(user),
      createIntegrationCtx
    )(null);

    return {
      ctx,
      user,
    };
  };

  it('should return all technical test templates', async () => {
    const { ctx, user } = await setup();

    const result = await ctx.handlers.admin.technicalTesting.findTestTemplates(
      ctx,
      {
        grapqhQLResolveInfo: mockResolverInfoWith({
          fieldName: 'technicalTestTemplatesConnection',
          fieldsToQuery: ['nodes', 'totalCount'],
          returnType: 'QuestTemplateConnection!',
        }),
      }
    );

    expect(result.totalCount).eql(4);
  });
});
