import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { animated, config, useSpring, useTransition } from 'react-spring/dist';

import { AnimatedResizingContent } from '@hox/ui/AnimatedResizingContent';
import { Blocks } from '@hox/ui/Blocks';
import { Button } from '@hox/ui/Button/v2';
import { HoxIcon } from '@hox/ui/HoxIcon';
import { palette } from '@hox/ui/styles/theme';
import { ButtonText, Heading4, SmallText, SmallTextStrong } from '@hox/ui/Text';
import { TinyLoadingIndicator } from '@hox/ui/TinyLoadingIndicator';

import { useCurrentOnboardingTask } from '../../../../onboarding/hooks/useCurrentOnboardingTask';
import {
  IOnboardingTaskWithMetadata,
  TTaskState,
} from '../../../../onboarding/types';
import { OnboardingTag } from '../../../OnboardingTag';
import { TaskStateIcon } from '../../../TaskStateIcon';
import { useDetectScrollDirection } from '../../hooks/useDetectScrollDirection';

const COLLAPSED_PADDING_REM = 0.75;
const PADDING_REM = 1.188; // 1.125rem + 1px, to make TaskContent the same height as ProgressContent

const TASK_STATE_ICONS = {
  completed: <HoxIcon.CheckCircle />,
  notCompleted: null,
  loading: <TinyLoadingIndicator visible />,
  error: <HoxIcon.CrossCircle />,
};

const TaskContentStyled = styled(animated.div)`
  display: grid;
  flex: 1;
  align-items: center;
  grid-template-columns: 1fr auto;
  grid-gap: 4rem;
  padding: 0 1rem;
  position: relative;

  > :first-child {
    position: relative;
  }
`;

const ButtonStyled = styled(Button)`
  transition: all 500ms ease;
  flex-shrink: 0;
`;

const AddLaterTextButton = styled(ButtonText)`
  color: ${palette(p => p.cta.primary)};
  transition: color 160ms ease-in-out;
  cursor: pointer;

  :hover {
    color: ${palette(p => p.cta.primary.dimmed)};
  }
`;

const getTaskState = (loading: boolean, completed?: boolean): TTaskState => {
  if (completed) {
    return 'completed';
  }

  if (loading) {
    return 'loading';
  }

  return 'notCompleted';
};

export interface ITaskContentProps {
  task: IOnboardingTaskWithMetadata;
}

export const TaskContent: FC<ITaskContentProps> = ({ task }) => {
  const { scrollDirection } = useDetectScrollDirection();

  const [collapsed, setCollapsed] = useState(false);
  const { loading, completeTask } = useCurrentOnboardingTask();

  const transitions = useTransition(collapsed, null, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
      position: 'absolute',
    },
    config: { ...config.stiff, clamp: true },
  });

  useEffect(
    () => setCollapsed(scrollDirection === 'down'),
    [scrollDirection, setCollapsed]
  );

  const paddingSpring = useSpring({
    padding: collapsed
      ? `${COLLAPSED_PADDING_REM}rem 0rem`
      : `${PADDING_REM}rem 0rem`,
    config: { ...config.stiff, clamp: true },
  });

  const completed = !!task.completedAt;

  const taskState = getTaskState(loading, completed);

  return (
    <TaskContentStyled>
      <Blocks.VerticalGroup gap="tiny">
        <AnimatedResizingContent config={{ ...config.stiff, clamp: true }}>
          {transitions.map(({ item: collapsed, key, props }) => (
            <animated.div
              key={key}
              style={{ ...props, ...paddingSpring, paddingLeft: 64 }}
            >
              {collapsed ? (
                <Blocks.HorizontalGroup gap="small" alignItems="center">
                  <Heading4 color={palette(p => p.cta.primary)}>
                    {task.title}
                  </Heading4>
                  <SmallText>1/15</SmallText>
                  {task.required && <OnboardingTag.Required dot />}
                  {task.isHoxhuntTask && <OnboardingTag.Hoxhunt dot />}
                </Blocks.HorizontalGroup>
              ) : (
                <>
                  <Blocks.HorizontalGroup gap="small" alignItems="center">
                    <SmallTextStrong color={palette(p => p.cta.primary)}>
                      {task.title}
                    </SmallTextStrong>
                    <SmallText>1/15</SmallText>
                    {task.required && <OnboardingTag.Required />}
                    {task.isHoxhuntTask && <OnboardingTag.Hoxhunt />}
                  </Blocks.HorizontalGroup>
                  <Heading4>{task.description}</Heading4>
                </>
              )}
            </animated.div>
          ))}
        </AnimatedResizingContent>
      </Blocks.VerticalGroup>
      <Blocks.HorizontalGroup alignItems="center" gap="large">
        {!completed ? (
          <AddLaterTextButton color={palette(p => p.cta.primary)}>
            Add later
          </AddLaterTextButton>
        ) : (
          <AddLaterTextButton color={palette(p => p.cta.primary)}>
            Next task
          </AddLaterTextButton>
        )}
        <ButtonStyled
          disabled={completed}
          iconStart={
            taskState !== 'notCompleted' && (
              <TaskStateIcon taskState={taskState} icons={TASK_STATE_ICONS} />
            )
          }
          onClick={completeTask}
        >
          {task.completedAt ? 'Completed' : 'Mark as completed'}
        </ButtonStyled>
      </Blocks.HorizontalGroup>
    </TaskContentStyled>
  );
};
