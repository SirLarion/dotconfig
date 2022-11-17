import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';
import sinon from 'sinon';

import { mockResolverInfoWith } from '@server/api/graphql/graphQLTestUtils';
import { ADMIN, EUserRole, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
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
import { createMockQuestTemplate } from '@server/domains/lib/testMockCreators/mockQuestTemplate';

chai.use(chaiAsPromised);

describe.only('admin.technicalTesting.findTestTemplates', () => {
  testACL(findTestTemplates, [ADMIN, SUPER_ADMIN]);
  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  const setup = async () => {
    const user = await insertMockUser(withOrgRoles([ADMIN]));

    const testTemplates = await Promise.all([
      createMockQuestTemplate({
        tag: 'hox.quest.test.not.active',
        isActive: false,
        tags: [
          {
            categoryName: 'mode',
            name: 'technical test',
            value: 'modetechnical test'
          },
        ]
      }, { persist: true }),

      createMockQuestTemplate({
        tag: 'hox.quest.test.active',
        isActive: true,
        tags: [
          {
            categoryName: 'mode',
            name: 'technical test',
            value: 'mode:technical test'
          },
        ]
      }, { persist: true }),    ])

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

    const findTestTemplatesResult = await ctx.handlers.admin.technicalTesting.findTestTemplates(
      ctx,
      {
        grapqhQLResolveInfo: mockResolverInfoWith({
          fieldName: 'technicalTestTemplatesConnection',
          fieldsToQuery: ['nodes', 'totalCount'],
          returnType: 'QuestTemplateConnection!',
        }),
      }
    );

    const findQuestTemplatesResult = await ctx.handlers.collection.questTemplates.find(
      ctx
    );

    expect(rfindTestTemplatesResulttotalCount).eql(4);

      });
});
