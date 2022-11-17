import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { path } from 'ramda';
import { RouteComponentProps } from 'react-router-dom';

import { LoadingIndicator } from '@hox/ui/LoadingIndicator';
import { palette } from '@hox/ui/styles/theme';
import { Heading4 } from '@hox/ui/Text';

import { ActionMenu } from '../../../../../../components/ActionMenu';
import { TRAINING_MANAGEMENT_PATH } from '../../../../../../layouts/paths';
import { tagWithoutPrefix } from '../../../../lib';
import { TemplateTags } from '../../../../components/TemplateTags';
import { useTrainingRules } from '../../../../hooks/useTrainingRules';
import { TOrganizationTagBlacklistInfo } from '../../../hooks/useCurrentUserOrganization';
import { TQuestTemplate } from '../../../hooks/useQuestTemplatePreview';
import { AnimatedPanelContent } from '../../../components/AnimatedPanel';
import { isBlacklisted, PanelRows } from '../../../components/PanelRows';
import { SUPPORTED_LOCALE } from '../../../../../../types/graphql.generated';
import { TQuestTemplateTag, TTagBlacklistItem } from '../../../../types';
import { QUEST_TEMPLATE_PREVIEW_INTL } from '../../../intl';

export interface IQuestTemplateInformationProps extends RouteComponentProps {
  questTemplate: TQuestTemplate;
  organization?: TOrganizationTagBlacklistInfo;
  selectedLanguage: SUPPORTED_LOCALE;
  setPreviewLanguage: React.Dispatch<React.SetStateAction<SUPPORTED_LOCALE>>;
}

const StyledQuestTemplateInformation = styled(AnimatedPanelContent)`
  background: ${palette(p => p.background.primary)};
`;

const InformationHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleAndTags = styled.div`
  display: flex;
  flex-direction: column;

  > :first-child {
    max-width: 24rem;
    margin-bottom: 0.25rem;
    text-overflow: initial;
    line-break: anywhere;
  }

  > :last-child {
    flex-shrink: 0;
  }
`;

const LoadingIndicatorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const QuestTemplateInformation: FC<IQuestTemplateInformationProps> = ({
  history,
  questTemplate,
  organization,
  selectedLanguage,
  setPreviewLanguage,
  ...restProps
}) => {
  const tagBlacklist = useMemo(
    () => path<TTagBlacklistItem[]>(['tagBlacklist'], organization) ?? [],
    [organization]
  );
  const templateTags = path<TQuestTemplateTag[]>(['tags'], questTemplate) ?? [];

  const previewLanguage = {
    selectedLanguage,
    setPreviewLanguage,
  };

  const { trainingRules, loading: trainingRulesLoading } = useTrainingRules();

  const trainingRule =
    questTemplate && questTemplate.tag in trainingRules
      ? trainingRules[questTemplate.tag]
      : undefined;

  const showActionMenu =
    trainingRule === undefined
      ? !isBlacklisted(questTemplate, tagBlacklist)
      : trainingRule.enabled;

  return (
    <StyledQuestTemplateInformation {...restProps}>
      {trainingRulesLoading ? (
        <LoadingIndicatorWrapper>
          <LoadingIndicator />
        </LoadingIndicatorWrapper>
      ) : (
        <>
          <InformationHeader>
            <TitleAndTags>
              <Heading4>{tagWithoutPrefix(questTemplate.tag)}</Heading4>
              <TemplateTags
                tagSize="default"
                templateTags={templateTags}
                tagBlacklist={tagBlacklist}
              />
            </TitleAndTags>
            {showActionMenu && (
              <ActionMenu
                items={[
                  {
                    name: QUEST_TEMPLATE_PREVIEW_INTL.actionMenu
                      .deactivateQuest,
                    action: () => {
                      history.push(
                        `${TRAINING_MANAGEMENT_PATH}/${questTemplate._id}/deactivate`
                      );
                    },
                  },
                ]}
              />
            )}
          </InformationHeader>
          <PanelRows
            questTemplate={questTemplate}
            previewLanguage={previewLanguage}
            tagBlacklist={tagBlacklist}
            trainingRule={trainingRule}
          />
        </>
      )}
    </StyledQuestTemplateInformation>
  );
};
