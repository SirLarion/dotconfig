import React, { FC } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { RouteComponentProps, useHistory } from 'react-router-dom';

import { Blocks } from '@hox/ui/Blocks';
import { Card } from '@hox/ui/Card';
import { HoxIcon } from '@hox/ui/HoxIcon';
import { Html } from '@hox/ui/Html';
import { LoadingIndicator } from '@hox/ui/LoadingIndicator';
import { ModalPortal } from '@hox/ui/ModalPortal';
import { useSidenavWidth } from '@hox/ui/Sidenav';
import { palette, themeProp, WithTheme } from '@hox/ui/styles/theme';
import { Heading4 } from '@hox/ui/Text';

import { getUserDetailsWipPath } from '../../../../layouts/paths';
import { includesSpicyModeTag } from '../../../../utils/includesSpicyModeTag';

import { QuestDate } from './components/QuestDate';
import { QuestPreviewLoadFail } from './components/QuestPreviewLoadFail';
import { QuestStarReward } from './components/QuestStarReward';
import { QuestState } from './components/QuestState';
import { useGetUserQuestQuery } from './graphql/__generated__/GetUserQuest.generated';
import { USER_QUEST_PREVIEW_INTL as INTL } from './intl';
import { Link } from '../../../../components/Link';

const TIMEOUT = 500;

const StyledUserQuestPreview = styled(Card)<{ $sidenavWidthRem: number }>`
  padding: 0;
  width: 36rem;
  height: calc(100vh - 2rem);
  max-height: 48rem;
  display: flex;
  flex-direction: column;
  background-color: ${palette(p => p.background.primary)};
  margin-left: ${props => props.$sidenavWidthRem}rem;
`;

const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 1.5rem;
  padding-top: 1.25rem;
  padding-right: 3rem;
`;

const CloseButton = styled.div`
  position: absolute;

  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > :first-child {
    margin-bottom: 0.5rem;
  }
`;

const Dates = styled.div`
  display: flex;

  > :first-child {
    margin-right: 3rem;
  }
`;

const QuestHtmlNotFound = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${palette(p => p.background.base)};
  border-bottom-right-radius: ${themeProp(t => t.borderRadius.default)};
  border-bottom-left-radius: ${themeProp(t => t.borderRadius.default)};
`;

const LoadingWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledHtml = styled(Html)`
  flex-grow: 1;
  border-radius: ${themeProp(t => t.borderRadius.default)};
  overflow: hidden;
`;

const HtmlWrapper = styled.div`
  flex-grow: 1;
  padding: 1rem;
  border-bottom-right-radius: ${themeProp(t => t.borderRadius.default)};
  border-bottom-left-radius: ${themeProp(t => t.borderRadius.default)};
  background-color: ${({ theme }: WithTheme) =>
    theme.name === 'light'
      ? palette(p => p.background.base)
      : palette(p => p.background.overlay)};
`;

interface IUserQuestPreviewProps
  extends RouteComponentProps<{ userId: string; questId: string }> {
  // Todo remove when switching to new UM layout
  oldUserDetailsPath?: string;
}

export const UserQuestPreview: FC<IUserQuestPreviewProps> = ({
  oldUserDetailsPath,
  match: {
    params: { userId, questId },
  },
}) => {
  const { sidenavWidthRem } = useSidenavWidth();
  const history = useHistory();
  const { data, loading } = useGetUserQuestQuery({
    variables: {
      userId,
      questId,
    },
  });

  const quest = data?.users[0].quests[0];
  const hasQuestId = questId !== 'undefined';
  const questLoadingFailed = !loading && !quest;
  const templateId = quest?.questTemplate?._id;

  const { startsAt, result, state, vector } = { ...quest };
  const completedAt = result?.completedAt;
  const html = vector?.payload?.emailCompiledTemplate?.email?.html;
  const starCount = result?.stars;
  const isSpicyMode = includesSpicyModeTag(quest?.tags as []);

  return (
    <>
      <ModalPortal>
        {({ handleClose }) => (
          <StyledUserQuestPreview $sidenavWidthRem={sidenavWidthRem}>
            {loading ? (
              <LoadingWrapper>
                <LoadingIndicator />
              </LoadingWrapper>
            ) : (
              <>
                {hasQuestId && !questLoadingFailed && (
                  <>
                    <PreviewHeader>
                      <CloseButton
                        onClick={() => {
                          handleClose && handleClose();
                          //
                          // Give preview time to animate out
                          // Not optimal but works
                          setTimeout(() => {
                            history.push(
                              oldUserDetailsPath ||
                                getUserDetailsWipPath(userId)
                            );
                          }, TIMEOUT);
                        }}
                      >
                        <HoxIcon.Close />
                      </CloseButton>
                      <Stats>
                        <Blocks.Row alignItems="center">
                          <QuestStarReward starCount={starCount} />
                          {isSpicyMode && (
                            <HoxIcon.Spicy
                              color={palette(p => p.accent.danger)}
                            />
                          )}
                        </Blocks.Row>
                        {state && <QuestState questState={state} />}
                        {templateId && (
                          <Link href={`/training-management/${templateId}`}>
                            {INTL.preview.viewTemplateLink}
                            <HoxIcon.CaretRight />
                          </Link>
                        )}
                      </Stats>
                      <Dates>
                        <QuestDate date={startsAt} title={INTL.date.sentAt} />
                        <QuestDate
                          date={completedAt}
                          title={INTL.date.completedAt}
                        />
                      </Dates>
                    </PreviewHeader>
                    {html ? (
                      <HtmlWrapper>
                        <StyledHtml disableInteractions html={html} />
                      </HtmlWrapper>
                    ) : (
                      <QuestHtmlNotFound>
                        <Heading4>{INTL.preview.notAvailable}</Heading4>
                      </QuestHtmlNotFound>
                    )}
                  </>
                )}
                {questLoadingFailed && <QuestPreviewLoadFail />}
              </>
            )}
          </StyledUserQuestPreview>
        )}
      </ModalPortal>
    </>
  );
};
