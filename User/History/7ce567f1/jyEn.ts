import crypto from 'crypto';

import { THandlerContext } from '@server/domains/lib/models';
import { IQuestTemplate } from '@server/lib/typedSchemas/QuestTemplate/QuestTemplate';

export const saveImageToTemplate = async (
  ctx: THandlerContext,
  templateId: string,
  imageBuffer: Buffer,
  imageHash: string
) => {
  const bucket = await ctx.getConfig('questTemplateImagesStorageBucket');
  const { resourceUrl } =
    await ctx.handlers.integration.googleCloudStorage.upload(ctx, {
      uploadType: 'content',
      bucketName: bucket,
      fileContents: imageBuffer,
      remoteFilePath: `questTemplates/${templateId}/images/default.png`,
    });
  await ctx.handlers.collection.questTemplate.patch(ctx, {
    id: templateId,
    data: {
      image: {
        contentHash: imageHash,
        resourceUrl: resourceUrl,
      },
    },
    params: {
      selector: {},
      options: {
        fields: {
          _id: 1,
        },
      },
    },
  });
};

export const createHashForQuestTemplate = (questTemplate: IQuestTemplate) =>
  crypto
    .createHash('md5')
    .update(questTemplate.emailTemplate.email.html)
    .digest('hex');

export const shouldUploadNewImage = (questTemplate: IQuestTemplate) => {
  if (!questTemplate.emailTemplate.email.html) {
    return false;
  }
  const newHash = createHashForQuestTemplate(questTemplate);
  return !questTemplate.image || questTemplate.image.contentHash !== newHash;
};
