import { withQuestTemplateId } from '@hox/telemetry-shared/context';

import { authenticatedResolver } from '@server/api/graphql/utils';
import { EServerEvent } from '@server/lib/analyticEvents';
import { IQuestTemplate } from '@server/lib/typedSchemas/QuestTemplate/QuestTemplate';
import {
  errorFailedPrecondition,
  errorInvalidArgument,
  errorNotFound,
} from '@server/util/error';

export const createQuestTemplate = authenticatedResolver(
  async (root, { questTemplate }: { questTemplate: IQuestTemplate }, ctx) => {
    const result = await ctx.handlers.collection.questTemplate.create(ctx, {
      data: questTemplate,
    });
    return result;
  }
);

export const updateQuestTemplate = authenticatedResolver(
  async (
    root,
    {
      questTemplate,
      questTemplateId,
    }: { questTemplateId: string; questTemplate: IQuestTemplate },
    ctx
  ) => {
    const res = await ctx.handlers.collection.questTemplate.update(ctx, {
      id: questTemplateId,
      data: questTemplate,
    });

    return res;
  }
);

export const deleteQuestTemplate = authenticatedResolver(
  async (root, { questTemplateId }: { questTemplateId: string }, ctx) => {
    const questsUsingQuestTemplate = await ctx.handlers.collection.quest
      .find(ctx, {
        params: {
          selector: {
            templateId: questTemplateId,
          },
          options: {
            limit: 1,
          },
        },
      })
      .then(c => c.count());

    if (questsUsingQuestTemplate > 0) {
      throw errorInvalidArgument(
        ctx,
        'Cannot delete questTemplate because there are quests created from it.',
        withQuestTemplateId(questTemplateId)
      );
    }

    return ctx.handlers.collection.questTemplate.remove(ctx, {
      id: questTemplateId,
    });
  }
);

export const toggleQuestTemplateSoftDeletion = authenticatedResolver(
  async (root, { questTemplateId }: { questTemplateId: string }, ctx) => {
    const qt: Pick<IQuestTemplate, 'isActive' | 'softDeletedAt'> =
      await ctx.handlers.collection.questTemplate.get(ctx, {
        id: questTemplateId,
        params: {
          selector: {},
          options: { fields: { softDeletedAt: 1, isActive: 1 } },
        },
      });

    if (!qt) {
      throw errorNotFound(
        ctx,
        'Quest template not found.',
        withQuestTemplateId(questTemplateId)
      );
    }

    if (qt.isActive && !qt.softDeletedAt) {
      throw errorFailedPrecondition(
        ctx,
        'Cannot delete quest template as it is active.',
        withQuestTemplateId(questTemplateId)
      );
    }

    return ctx.handlers.collection.questTemplate.patch(ctx, {
      id: questTemplateId,
      data: { softDeletedAt: qt.softDeletedAt ? null : new Date() },
    });
  }
);

export const toggleQuestTemplatePublicationStatus = authenticatedResolver(
  async (
    root,
    {
      questTemplateId,
      isActive,
    }: { questTemplateId: string; isActive: boolean },
    ctx
  ) => {
    const oldTemplate = await ctx.handlers.collection.questTemplate.get(ctx, {
      id: questTemplateId,
    });

    if (isActive === oldTemplate.isActive) {
      return oldTemplate;
    }

    const res = await ctx.handlers.collection.questTemplate.patch(ctx, {
      id: questTemplateId,
      data: {
        isActive,
        ...(isActive &&
          !oldTemplate.publishedAt && {
            publishedAt: ctx.getGlobal('newDate')(),
          }),
      },
    });

    await ctx.handlers.analytics.sink.track(
      ctx,
      ctx.getGlobal('analytics').buildEvent({
        event: EServerEvent.QUEST_TEMPLATE_STATUS_CHANGED,
        timestamp: new Date(),
        userId: ctx.identity._id,
        properties: {
          isActive: res.isActive,
          questTag: res.tag,
          questTemplateId,
        },
      })
    );

    return res;
  }
);
