import { expect } from 'chai';
import * as R from 'ramda';
import sinon from 'sinon';

import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import {
  insertMockQuest,
  withQuestTemplate,
} from '@server/domains/lib/testMockCreators/mockQuest';
import { createMockQuestTemplate } from '@server/domains/lib/testMockCreators/mockQuestTemplate';
import {
  createIntegrationCtx,
  withGlobals,
  withHandlerTree,
  withMockUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { EServerEvent } from '@server/lib/analyticEvents';

import {
  deleteQuestTemplate,
  toggleQuestTemplatePublicationStatus,
} from '../questTemplateMutations';

const FROZEN_DATE = new Date();

describe('deleteQuestTemplate', () => {
  it('should remove questTemplate if no quests have been created from it', async () => {
    const questTemplate = await createMockQuestTemplate({}, { persist: true });

    const ctx = await R.pipe(
      withMockUserIdentity({ roles: [SUPER_ADMIN] }),
      createIntegrationCtx
    )(null);

    await deleteQuestTemplate(
      null,
      { questTemplateId: questTemplate._id },
      ctx
    );

    const foundQuestTemplate = await ctx.handlers.collection.questTemplate.get(
      ctx,
      {
        id: questTemplate._id,
      }
    );

    expect(foundQuestTemplate).to.equal(null);
  });

  it('should throw error if questTemplate has quests created from it', async () => {
    const questTemplate = await createMockQuestTemplate({}, { persist: true });
    await insertMockQuest(withQuestTemplate(questTemplate));

    const ctx = await R.pipe(
      withMockUserIdentity({ roles: [SUPER_ADMIN] }),
      createIntegrationCtx
    )(null);

    expect(
      deleteQuestTemplate(null, { questTemplateId: questTemplate._id }, ctx)
    ).rejectedWith(
      'Cannot delete questTemplate because there are quests created from it.'
    );

    const foundQuestTemplate = await ctx.handlers.collection.questTemplate.get(
      ctx,
      {
        id: questTemplate._id,
      }
    );
    expect(foundQuestTemplate._id).to.not.equal(undefined);
  });
});

describe('toggleQuestTemplatePublicationStatus', () => {
  it('should create quest_template_status_changed event if active is changed', async () => {
    const questTemplate = await createMockQuestTemplate(
      { isActive: true },
      { persist: true }
    );
    await insertMockQuest(withQuestTemplate(questTemplate));
    const trackStub = sinon.stub().resolves({});
    const ctx = await R.pipe(
      withHandlerTree({
        analytics: {
          sink: {
            track: trackStub,
          },
        },
      }),
      withMockUserIdentity({ roles: [SUPER_ADMIN] }),
      createIntegrationCtx
    )(null);

    await toggleQuestTemplatePublicationStatus(
      null,
      {
        questTemplateId: questTemplate._id,
        isActive: false,
      },
      ctx
    );

    expect(trackStub.firstCall.args[1].event).equal(
      EServerEvent.QUEST_TEMPLATE_STATUS_CHANGED
    );
    expect(trackStub.firstCall.args[1].properties.isActive).equal(false);
  });

  it('should not create quest_template_status_changed event if active is not changed', async () => {
    const questTemplate = await createMockQuestTemplate(
      { isActive: true },
      { persist: true }
    );
    await insertMockQuest(withQuestTemplate(questTemplate));
    const trackStub = sinon.stub().resolves({});
    const ctx = await R.pipe(
      withHandlerTree({
        analytics: {
          sink: {
            track: trackStub,
          },
        },
      }),
      withMockUserIdentity({ roles: [SUPER_ADMIN] }),
      createIntegrationCtx
    )(null);

    await toggleQuestTemplatePublicationStatus(
      null,
      {
        questTemplateId: questTemplate._id,
        isActive: true,
      },
      ctx
    );

    expect(trackStub.firstCall).equal(null);
  });

  it('should set publishedAt for quest template when isActive is toggled to true and publishedAt does not exist', async () => {
    const questTemplate = await createMockQuestTemplate(
      { isActive: false },
      { persist: true }
    );
    await insertMockQuest(withQuestTemplate(questTemplate));
    const trackStub = sinon.stub().resolves({});
    const ctx = await R.pipe(
      withHandlerTree({
        analytics: {
          sink: {
            track: trackStub,
          },
        },
      }),
      withMockUserIdentity({ roles: [SUPER_ADMIN] }),
      withGlobals({ newDate: () => FROZEN_DATE }),
      createIntegrationCtx
    )(null);

    await toggleQuestTemplatePublicationStatus(
      null,
      {
        questTemplateId: questTemplate._id,
        isActive: true,
      },
      ctx
    );

    const updatedTemplate = await ctx.handlers.collection.questTemplate.get(
      ctx,
      { id: questTemplate._id }
    );

    expect(updatedTemplate.publishedAt).to.eql(FROZEN_DATE);
  });

  it('should not set publishedAt for quest template when it already exists', async () => {
    const questTemplate = await createMockQuestTemplate(
      { isActive: false, publishedAt: new Date() },
      { persist: true }
    );
    await insertMockQuest(withQuestTemplate(questTemplate));
    const trackStub = sinon.stub().resolves({});
    const ctx = await R.pipe(
      withHandlerTree({
        analytics: {
          sink: {
            track: trackStub,
          },
        },
      }),
      withMockUserIdentity({ roles: [SUPER_ADMIN] }),
      withGlobals({ newDate: () => FROZEN_DATE }),
      createIntegrationCtx
    )(null);

    await toggleQuestTemplatePublicationStatus(
      null,
      {
        questTemplateId: questTemplate._id,
        isActive: true,
      },
      ctx
    );

    const updatedTemplate = await ctx.handlers.collection.questTemplate.get(
      ctx,
      { id: questTemplate._id }
    );

    expect(updatedTemplate.publishedAt).to.not.eql(FROZEN_DATE);
  });
});
