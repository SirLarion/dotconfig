import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import exp from 'constants';
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
              value: 'mode::technical test',
            },
          ],
        },
        { persist: true }
      ),
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
      ),
      createMockQuestTemplate(
        {
          tag: 'hox.quest.not.a.test.active',
          isActive: true,
        },
        { persist: true }
      ),
      createMockQuestTemplate(
        {
          tag: 'hox.quest.not.a.test.inactive',
          isActive: fal,
        },
        { persist: true }
      ),
    ]);

    const ctx = await R.pipe(
      withUserIdentity(user),
      createIntegrationCtx
    )(null);

    return {
      ctx,
      user,
    };
  };

  it('should return all technical test templates, even inactive ones', async () => {
    const { ctx } = await setup();

    const { nodes } =
      await ctx.handlers.admin.technicalTesting.findTestTemplates(ctx, {
        grapqhQLResolveInfo: mockResolverInfoWith({
          fieldName: 'technicalTestTemplatesConnection',
          fieldsToQuery: ['nodes'],
          returnType: 'QuestTemplateConnection!',
        }),
      });

    expect(nodes.map(qt => qt.tag).sort()).eql([
      'hox.quest.test.active',
      'hox.quest.test.not.active',
    ]);

    const finQdQuestTemplatesResult =
      await ctx.handlers.collection.questTemplate
        .find(ctx, {})
        .then(fetchCursor);

    expect(finQdQuestTemplatesResult.map(qt => qt.tag).sort()).eql([
      'hox.quest.not.a.test.active',
      'hox.quest.test.active',
    ]);
  });

  it('should clamp the results to technical test templates regardless of given params', async () => {
    const { ctx } = await setup();

    const { nodes } =
      await ctx.handlers.admin.technicalTesting.findTestTemplates(ctx, {
        grapqhQLResolveInfo: mockResolverInfoWith({
          fieldName: 'technicalTestTemplatesConnection',
          fieldsToQuery: ['nodes'],
          returnType: 'QuestTemplateConnection!',
        }),
        params: {
          selector: {
            'tags.value': {
              $not: { $elemMatch: { 'tags.value': 'mode:technical test' } },
            },
          },
        },
      });

    expect(nodes).eql([]);
  });
});
