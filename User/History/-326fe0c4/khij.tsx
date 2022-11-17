import React, { BaseSyntheticEvent, FC, ReactNode, useState } from 'react';
import styled from 'styled-components';

import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import {
  ESupportedLocales,
  getLanguageByCode,
  supportedLanguages,
} from '@hox/frontend-utils/i18n';
import { Button } from '@hox/ui/Button/v2';
import { Dropdown } from '@hox/ui/Dropdown';
import { InputTextarea } from '@hox/ui/InputTextarea';
import { palette, themeProp } from '@hox/ui/styles/theme';
import { Tag } from '@hox/ui/Tags';
import { SmallText } from '@hox/ui/Text';

import { DifficultySkulls } from '../../../../../components/DifficultySkulls';
import { SpicyModeTag } from '../../../../../components/SpicyModeTag';
import { DotTag } from '../../../../../components/TemplateTags';
import {
  jobFunctionFilterToIntl,
  languageCodeToName,
} from '../../../../../lib';
import {
  TQuestTemplateDifficultyLevel,
  TQuestTemplateTag,
} from '../../../../../types';
import { SUPPORTED_LOCALE } from '../../../../../../../types/graphql.generated';
import { useUpsertTrainingRule } from '../../../../hooks/useUpsertTrainingRule';
import { QUEST_TEMPLATE_PREVIEW_INTL as INTL } from '../../../../intl';
import { ErrorNotification } from '../../../ErrorNotification';
import { BasePanelRow } from '../BasePanelRow';

const StyledBlacklistedTagsCard = styled.div`
  padding: 0.75rem;
  background-color: ${palette(p => p.background.base)};
  border-radius: ${themeProp(t => t.borderRadius.input)};

  > :first-child {
    line-height: 220%;
  }
`;

const BlacklistedTagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  > :not(:last-child) {
    margin-right: 0.25rem;
  }

  > div {
    display: inline-flex;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
`;

const BlacklistedTagsCard: FC<{ blacklistedTags: TQuestTemplateTag[] }> = ({
  blacklistedTags,
  ...restProps
}) => {
  return (
    <BasePanelRow
      title={INTL.valueTitle.reasonForDeactivation}
      value={<span />}
      {...restProps}
    >
      <StyledBlacklistedTagsCard>
        <SmallText dimmed>
          {INTL.reasonForDeactivationBlacklisted.containsBlacklistedTags}
          <BlacklistedTagsWrapper>
            {blacklistedTags.map(blacklistedTag => {
              return (
                <Tag
                  disableAnimations
                  key={blacklistedTag.value}
                  foregroundColor={palette(p => p.background.primary)}
                  background={palette(p => p.accent.boring.dimmed)}
                >
                  {blacklistedTag.value}
                </Tag>
              );
            })}
          </BlacklistedTagsWrapper>
          {INTL.reasonForDeactivationBlacklisted.possibleAction}
        </SmallText>
      </StyledBlacklistedTagsCard>
    </BasePanelRow>
  );
};

const Status: FC<{ deactivated: boolean }> = ({ deactivated }) => (
  <BasePanelRow
    title={INTL.valueTitle.status}
    value={
      <DotTag
        rectangle
        disableAnimations
        foregroundColor={
          deactivated
            ? palette(p => p.accent.danger)
            : palette(p => p.accent.positive)
        }
        background={
          deactivated
            ? palette(p => p.accent.danger.ghosted)
            : palette(p => p.accent.positive.ghosted)
        }
      >
        {deactivated ? INTL.deactivated : INTL.active}
      </DotTag>
    }
  />
);

const StyledDifficulty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > :first-child:not(:last-child) {
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const Difficulty: FC<{
  isSpicy: boolean;
  difficultyLevel: TQuestTemplateDifficultyLevel;
}> = ({ isSpicy, difficultyLevel }) => (
  <BasePanelRow
    title={INTL.valueTitle.difficulty}
    value={
      <StyledDifficulty>
        <DifficultySkulls
          withLabel
          difficultyLevel={difficultyLevel}
          size={1.25}
        />

        {isSpicy && <SpicyModeTag size={1.25} withLabel />}
      </StyledDifficulty>
    }
  />
);

const JobFunction: FC<{ jobFunction?: string }> = ({ jobFunction }) => (
  <BasePanelRow
    title={INTL.valueTitle.jobFunction}
    value={
      jobFunction ? (
        <Tag
          rectangle
          disableAnimations
          foregroundColor={palette(p => p.foreground.input)}
          background={palette(p => p.background.base)}
        >
          {jobFunctionFilterToIntl(jobFunction)}
        </Tag>
      ) : (
        '-'
      )
    }
  />
);

const Language: FC<{
  previewLanguage: {
    selectedLanguage: SUPPORTED_LOCALE;
    setPreviewLanguage: React.Dispatch<React.SetStateAction<SUPPORTED_LOCALE>>;
  };
  languageCode?: string | null;
}> = ({ previewLanguage, languageCode }) => {
  const { selectedLanguage, setPreviewLanguage } = previewLanguage;

  const language = languageCodeToName(languageCode);
  const multilingual = !languageCode;

  const dropdownLanguages = supportedLanguages.map(({ name, code }) => ({
    value: code,
    displayValue: name,
  }));

  const fullLanguage = getLanguageByCode(
    selectedLanguage as string as ESupportedLocales
  );
  const initiallySelectedLanguage = {
    value: fullLanguage.code,
    displayValue: fullLanguage.name,
  };

  return (
    <BasePanelRow
      title={INTL.valueTitle.language}
      value={
        <Tag
          rectangle
          disableAnimations
          foregroundColor={palette(p => p.foreground.input)}
          background={palette(p => p.background.base)}
        >
          {language}
        </Tag>
      }
    >
      {multilingual && (
        <Dropdown
          items={dropdownLanguages}
          disableScrollToDropdown
          onChange={lang => {
            if (!lang || Array.isArray(lang)) {
              return;
            }
            setPreviewLanguage(lang.value as SUPPORTED_LOCALE);
          }}
          initialSelected={initiallySelectedLanguage}
        />
      )}
    </BasePanelRow>
  );
};

const StyledActivation = styled.div`
  background-color: ${palette(p => p.background.base)};
  padding: 0.75rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;

  > :last-child {
    padding: 0;
    border-bottom: none;

    > :nth-child(2) {
      margin-top: 1rem;
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const Activation: FC<{ questTemplateTag: string }> = ({ questTemplateTag }) => {
  const { mutate } = useUpsertTrainingRule();
  const { organization } = useCurrentUser();

  const [comment, setComment] = useState<string>();
  const [error, setError] = useState<ReactNode>();

  const activateQuestTemplate = async () => {
    try {
      await mutate({
        variables: {
          enabled: true,
          organizationId: organization._id,
          target: questTemplateTag,
          ...(comment && {
            comment,
          }),
        },
        refetchQueries: ['CurrentUserQuestTemplatesQuery', 'GetTabQuestCount'],
      });
    } catch (error) {
      setError(INTL.genericErrorMessage);
    }
  };

  return (
    <StyledActivation>
      <BasePanelRow title="" value={<span />} />
      <InputTextarea
        // InputTextarea accepts only string as placeholder
        // todo switch to intl after UI component updated
        placeholder="Comment (optional)"
        onChange={(e: BaseSyntheticEvent) => setComment(e.target.value)}
      />
      <BasePanelRow
        title={<span />}
        value={
          <Button onClick={() => activateQuestTemplate()}>
            {INTL.activation.buttonText}
          </Button>
        }
      >
        {error && <ErrorNotification>{error}</ErrorNotification>}
      </BasePanelRow>
    </StyledActivation>
  );
};

export const PanelRowBlocks = {
  Activation,
  BlacklistedTagsCard,
  Difficulty,
  Language,
  JobFunction,
  Status,
};
