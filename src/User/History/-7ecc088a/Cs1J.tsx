import React, { FC } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'ramda';

import { ESupportedLocales } from '@hox/frontend-utils/i18n';

import { includesSpicyModeTag } from '../../../../../utils/includesSpicyModeTag';
import { DifficultyCard } from '../../../components/DifficultyCard';
import { getBlacklistedTagsValues } from '../../../components/TemplateTags';
import { TTrainingRule } from '../../../hooks/useTrainingRules';
import { getQuestTemplateJobFunction } from '../../../lib';
import {
  TQuestTemplateDifficultyLevel,
  TQuestTemplateTag,
  TTagBlacklistItem,
} from '../../../types';
import { TQuestTemplate } from '../../hooks/useQuestTemplatePreview';
import { QuestTemplateActivityLog } from '../QuestTemplateActivityLog';

import { PanelRowBlocks } from './components/PanelRowBlocks';

const StyledRows = styled.div`
  > :last-child {
    border: none;
  }
`;

const StyledQuestTemplateActivityLog = styled(QuestTemplateActivityLog)`
  margin-top: 0.5rem;
`;

const DifficultyCardWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

export interface IRowsProps {
  questTemplate: TQuestTemplate;
  previewLanguage: {
    selectedLanguage: ESupportedLocales;
    setPreviewLanguage: React.Dispatch<React.SetStateAction<ESupportedLocales>>;
  };
  tagBlacklist?: TTagBlacklistItem[];
  trainingRule?: TTrainingRule;
}

export const isBlacklisted = (
  questTemplate: TQuestTemplate,
  tagBlacklist?: TTagBlacklistItem[]
) =>
  tagBlacklist?.some(blacklistedTag =>
    questTemplate.tags?.some(tag => blacklistedTag.name === tag?.name)
  ) ?? false;

export const PanelRows: FC<IRowsProps> = ({
  questTemplate,
  previewLanguage,
  tagBlacklist,
  trainingRule,
  ...restProps
}) => {
  const { attributes } = questTemplate;

  const jobFunction = getQuestTemplateJobFunction(questTemplate);
  const isSpicy = includesSpicyModeTag(questTemplate.tags);
  const difficultyLevel =
    attributes?.difficultyEstimate as TQuestTemplateDifficultyLevel;

  const blacklisted = isBlacklisted(questTemplate, tagBlacklist);
  const deactivated = trainingRule?.enabled === false;
  const blacklistedOrDeactivated = blacklisted || deactivated;

  const { blacklistedTags } = getBlacklistedTagsValues(
    (questTemplate.tags as TQuestTemplateTag[]) ?? [],
    tagBlacklist
  );

  return (
    <>
      <StyledRows {...restProps}>
        {
          // For deactivated templates, difficulty is rendered as PanelRow (line 94)
          !blacklistedOrDeactivated && (
            <DifficultyCardWrapper>
              <DifficultyCard
                spicy={isSpicy}
                difficultyLevel={difficultyLevel}
              />
            </DifficultyCardWrapper>
          )
        }
        <PanelRowBlocks.JobFunction jobFunction={jobFunction} />
        <PanelRowBlocks.Language
          previewLanguage={previewLanguage}
          languageCode={attributes?.language}
        />
        {blacklistedOrDeactivated && (
          <PanelRowBlocks.Difficulty
            isSpicy={isSpicy}
            difficultyLevel={difficultyLevel}
          />
        )}
        <PanelRowBlocks.Status deactivated={blacklistedOrDeactivated} />

        {!isEmpty(blacklistedTags) && (
          <PanelRowBlocks.BlacklistedTagsCard
            blacklistedTags={blacklistedTags}
          />
        )}
      </StyledRows>

      {trainingRule && (
        <>
          <StyledQuestTemplateActivityLog
            historyEntries={trainingRule.history}
          />
        </>
      )}
      {deactivated && (
        <PanelRowBlocks.Activation questTemplateTag={questTemplate.tag} />
      )}
    </>
  );
};
