import React, {
  BaseSyntheticEvent,
  FC,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { animated, config, useSpring } from 'react-spring/dist';

import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import { Blocks } from '@hox/ui/Blocks';
import { Button } from '@hox/ui/Button/v2';
import { HoxIcon } from '@hox/ui/HoxIcon';
import { palette } from '@hox/ui/styles/theme';
import { Body, ButtonText, Heading4, SmallText } from '@hox/ui/Text';

import { DeactivationReason } from '../../../../types/graphql.generated';
import { AnimatedPanelContent } from '../components/AnimatedPanel';
import { ErrorNotification } from '../components/ErrorNotification';
import { useUpsertTrainingRule } from '../hooks/useUpsertTrainingRule';
import { QUEST_TEMPLATE_PREVIEW_INTL } from '../intl';

import { COMMENT_CHARACTER_LIMIT, ReasonInput } from './components/ReasonInput';
import { ReasonSelector } from './components/ReasonSelector';
import { WarningCard } from './components/WarningCard';
import { QUEST_TEMPLATE_DEACTIVATION_INTL as INTL } from './intl';

const ChooseReasonText = styled(ButtonText)``;

const StyledDeactivation = styled(AnimatedPanelContent)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${palette(p => p.background.primary)};

  > :not(:last-child) {
    margin-bottom: 1rem;
  }

  > ${ChooseReasonText} {
    margin-top: 0.5rem;
  }

  > :last-child {
    margin-top: auto;
    align-self: flex-end;
  }
`;

const DeactivationReasonSelect = styled.div`
  display: flex;
  flex-direction: column;

  > :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const KnowledgeBaseSection = styled(animated.div)`
  background-color: ${palette(p => p.background.primary)};

  > :first-child {
    margin-bottom: 0.5rem;
  }
`;

const KnowledgeBaseTitle = styled.div`
  display: flex;
  align-items: center;
  > :first-child {
    margin-right: 0.5rem;
  }
`;

const CancelButton = styled(Button)`
  min-width: 8rem;
`;

export interface IDeactivationProps extends RouteComponentProps {
  questTemplateTag: string;
}

export const Deactivation: FC<IDeactivationProps> = ({
  questTemplateTag,
  history,
  ...restProps
}) => {
  const {
    SENSITIVE_INFORMATION,
    COMPANY_POLICY,
    OUTDATED_COMPANY_INFORMATION,
    OTHER,
  } = DeactivationReason;

  // repetition here but it's necessary as OTHER has to be the last of these
  const reasons = [
    SENSITIVE_INFORMATION,
    COMPANY_POLICY,
    OUTDATED_COMPANY_INFORMATION,
    OTHER,
  ];

  const [deactivationReason, setDeactivationReason] =
    useState<DeactivationReason>();
  const [comment, setComment] = useState<string | null>(null);
  const [error, setError] = useState<ReactNode>();
  const [success, setSuccess] = useState(false);

  const isOtherReason = deactivationReason === OTHER;
  const showKbSection =
    deactivationReason === OUTDATED_COMPANY_INFORMATION ||
    deactivationReason === SENSITIVE_INFORMATION;

  const { organization } = useCurrentUser();
  const { mutate } = useUpsertTrainingRule();

  const kbAnimation = useSpring({
    transform: showKbSection ? 'translateY(0rem)' : 'translateY(0.5rem)',
    opacity: showKbSection ? 1 : 0,
    config: config.stiff,
  });

  const isValidComment = (): boolean => {
    if (isOtherReason && !comment) {
      setError(INTL.inputError.noComment);
      return false;
    }

    if (isOtherReason && comment && comment.length > COMMENT_CHARACTER_LIMIT) {
      setError(INTL.inputError.commentTooLong);
      return false;
    }

    return true;
  };

  const deactivateQuestTemplate = async () => {
    if (!deactivationReason) {
      setError(INTL.inputError.noDeactivationReason);
      return;
    }

    if (!isValidComment()) {
      return;
    }

    try {
      await mutate({
        variables: {
          enabled: false,
          organizationId: organization._id,
          deactivationReason,
          target: questTemplateTag,
          ...(comment && {
            comment,
          }),
        },
        refetchQueries: ['CurrentUserQuestTemplatesQuery', 'GetTabQuestCount'],
      });

      setSuccess(true);
    } catch (error) {
      setError(QUEST_TEMPLATE_PREVIEW_INTL.genericErrorMessage);
    }
  };

  useEffect(() => {
    if (success) {
      history.goBack();
    }
  }, [success, history]);

  useEffect(() => setError(undefined), [deactivationReason, comment]);

  const getKBCopy = (deactivationReason: DeactivationReason) => {
    switch (deactivationReason) {
      case OUTDATED_COMPANY_INFORMATION:
        return INTL.outdatedInfoKbLink;
      case SENSITIVE_INFORMATION:
        return INTL.sensitiveInfoKbLink;
      default:
        return '';
    }
  };

  return (
    <StyledDeactivation {...restProps}>
      <Heading4>{INTL.heading}</Heading4>
      <WarningCard />
      <ChooseReasonText>{INTL.chooseReason}</ChooseReasonText>
      <DeactivationReasonSelect>
        {reasons.map(reason => (
          <ReasonSelector
            key={reason}
            reason={reason}
            onSelect={() => setDeactivationReason(reason)}
            isSelected={reason === deactivationReason}
          />
        ))}
        <ReasonInput
          comment={comment ?? ''}
          onChange={(e: BaseSyntheticEvent) => setComment(e.target.value)}
          visible={isOtherReason}
        />
      </DeactivationReasonSelect>
      {showKbSection && (
        <KnowledgeBaseSection style={kbAnimation}>
          <KnowledgeBaseTitle>
            <HoxIcon.Hint />
            <Body>{INTL.kbTitle}</Body>
          </KnowledgeBaseTitle>
          <SmallText>{getKBCopy(deactivationReason)}</SmallText>
        </KnowledgeBaseSection>
      )}

      {error && <ErrorNotification>{error}</ErrorNotification>}
      <Blocks.HorizontalGroup>
        <CancelButton
          onClick={() => history.goBack()}
          outlined
          color="secondary"
        >
          {INTL.cta.cancel}
        </CancelButton>
        <Button onClick={() => deactivateQuestTemplate()} color="danger">
          {INTL.cta.deactivate}
        </Button>
      </Blocks.HorizontalGroup>
    </StyledDeactivation>
  );
};
