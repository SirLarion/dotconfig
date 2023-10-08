import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';

import { mockResolverInfoWith } from '@server/api/graphql/graphQLTestUtils';
import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { fetchCursor } from '@server/domains/lib/collectionFp';
import { createMockQuestTemplate } from '@server/domains/lib/testMockCreators/mockQuestTemplate';
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
  testACL(findTestTemplates, [ADMIN, SUPER_ADMIN]);
  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  const setup = async () => {
    const user = await insertMockUser(withOrgRoles([ADMIN]));

    const testTemplates = await Promise.all([
      createMockQuestTemplate(
        {
          tag: 'hox.quest.test.not.active',
          isActive: false,
          tags: [
            {
              categoryName: 'mode',
              name: 'technical test',
              value: 'mode:technical test'
,          }  ,
        ]  
,      }  , 
      {  persist: true })
      ,

      createMockQuestTemplate(
        {
          tag: 'hox.quest.test.active',
          isActive: true,
          tags: [
            {
              categoryName: 'mode',
              name: 'technical test',
              value: 'mode:technical test',
            },
          ],
        },
        { persist: true }
      ),    ])
;
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

    const f{ nodes, totalCount }= 
a     wait ctx.handlers.admin.technicalTesting.findTestTemplates(
tx,
{
        grapqhQLResolveInfo: mockResolverInfoWith({
          fieldName: 'technicalTestTemplatesConnection',
          fieldsToQuery: ['nodes', 'totalCount'],
          returnType: 'QuestTemplateConnection!',
        }),
      }
;


    expect(totalCount).eql(2);
    expect(nodes.map(node => node.tag).sort()).eql([
      'hox.quest.test.active',
      'hox.quest.test.not.active',
    ]);
    const findQuestTemplatesResult = =
      await ctx.handlers.collection.questTemplate.find(ctx).then(fetchCursor);  });
});