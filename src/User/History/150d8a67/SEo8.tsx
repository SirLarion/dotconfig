import React, { FC, useMemo, useState } from 'react';
import * as R from 'ramda';
import styled, { keyframes } from 'styled-components';

import { Button } from '@hox/ui/Button';
import { Toggle } from '@hox/ui/Toggle';
import { Modal } from '@hox/ui/Modal';
import { ModalPortal } from '@hox/ui/ModalPortal';
import { Body, SmallText } from '@hox/ui/Text';
import { palette, WithTheme } from '@hox/ui/styles/theme';
import { Dropdown } from '@hox/ui/Dropdown/components/Dropdown';
import { IDropdownItem } from '@hox/ui/Dropdown';
import {
  useGetActiveQuizTemplatesQuery,
  useSendQuestToCurrentUserMutation,
} from './__generated__/GetQuestTemplatesQuery.generated';
const SECONDARY_OBJECTIVES = Object.values(QuestSecondaryObjective);

const Content = styled.div`
  height: 100%;
  padding: 1.75rem;

  > :not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const ToggleRow = styled.div`
  display: flex;

  > :not(:last-child) {
    margin-right: 3rem;
  }
`;

const ButtonWithClickReaction = styled(Button)`
  position: relative;

  // Arto demanded a click reaction so here is a 5 min flourish :D
  transition-duration: 3s;
  :after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.5s;
    box-shadow: 0 0 1rem 1rem ${palette(p => p.accent.golden)};
  }

  :active:after {
    box-shadow: 0 0 0 0 ${palette(p => p.cta.primary)};
    position: absolute;
    left: 0;
    top: 0;
    opacity: 1;
    transition: 0s;
  }
`;

const LoadingIndicator = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  border: 0.125rem solid;
  margin: 0.25rem; /* Prevent button height change when loading */
  ${({ theme }: WithTheme) => theme.palette.foreground.primary};
  border-left-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation-name: ${keyframes`
  0% {
    transform: rotate3d(0, 0, 1, 0deg)
  }
  100% {
    transform: rotate3d(0, 0, 1, 360deg)
  }
`};
  animation-iteration-count: infinite;
  animation-duration: 1s;
  animation-timing-function: linear;
`;
interface IQuestSendingModalProps {
  questTag: string;
  onClose: () => void;
}

// This component is super slow for SUPER_ADMINS because the quest-list is too heavy
// For admins (less quests by default) it seems to work faster
export const QuestSendingModal: FC<IQuestSendingModalProps> = ({
  questTag,
  onClose,
}) => {
  const [sendQuestToCurrentUser, { loading }] =
    useSendQuestToCurrentUserMutation();
  const [quizTagOverride, setQuizTagOverride] = useState('');
  const [objectivesOverride, setObjectivesOverride] = useState([
    QuestSecondaryObjective.MARKERS,
  ]);

  const { data, loading: loadingTemplateIds } =
    useGetActiveQuizTemplatesQuery();

  const NONE_SELECTED = {
    id: 'none_specified',
    value: '',
    displayValue: 'Random quiz',
  };

  const dropDownItems = useMemo(
    () =>
      R.pipe(
        R.pathOr([], ['quizTemplates']),
        R.map((item: GetActiveQuizTemplates_quizTemplates) => ({
          value: item.tag,
          _id: item.tag,
        })),
        items => [NONE_SELECTED, ...items]
      )(data),
    [data]
  );

  console.log(data);

  const handleObjectiveToggle =
    (objective: QuestSecondaryObjective) => (value: boolean) => {
      if (value) {
        setObjectivesOverride(R.uniq([...objectivesOverride, objective]));
      } else {
        setObjectivesOverride(R.without([objective], objectivesOverride));
      }
    };

  return (
    <ModalPortal>
      {({ handleClose }) => (
        <Modal
          handleClose={() => {
            onClose();
            handleClose && handleClose();
          }}
          style={{
            overflow: 'unset',
          }}
        >
          <Content>
            <Body>Sending quest: {questTag}</Body>
            <Dropdown
              items={dropDownItems}
              onChange={(selected: IDropdownItem) =>
                setQuizTagOverride(selected.value)
              }
              initialSelected={dropDownItems.find(
                item => item.value === quizTagOverride
              )}
              disabled={loadingTemplateIds}
            />
            <ToggleRow>
              {SECONDARY_OBJECTIVES.map(objective => (
                <Toggle
                  selected={objectivesOverride.includes(objective)}
                  label={<Body>{objective}</Body>}
                  onChange={handleObjectiveToggle(objective)}
                />
              ))}
            </ToggleRow>
            <SmallText>
              Note: if you have completed all the quizzes, you have to enter a
              quiz tag to get one. Contact support to clear your quizzes.
            </SmallText>
            <ButtonWithClickReaction
              onClick={() =>
                sendQuestToCurrentUser({
                  variables: {
                    questTag,
                    secondaryObjectiveOverrides: {
                      quizTag: quizTagOverride !== '' ? quizTagOverride : null,
                      secondaryObjectives: objectivesOverride,
                    },
                  },
                })
              }
            >
              {loading ? <LoadingIndicator /> : 'Send to me'}
            </ButtonWithClickReaction>
          </Content>
        </Modal>
      )}
    </ModalPortal>
  );
};
