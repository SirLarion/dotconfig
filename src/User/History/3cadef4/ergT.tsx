import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { HoxIcon } from '@hox/ui/HoxIcon';
import { palette, theme, themeProp } from '@hox/ui/styles/theme';

import { EAnalyticsEvent } from '../../../../../../types/graphql.generated';

const IconStyled = styled.div<{ $bgColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  margin-left: -2.2rem;
  margin-top: -0.2rem;
  border-radius: ${themeProp(t => t.borderRadius.default)};
  background-color: ${props => props.$bgColor};
`;

const Icon: FC<{
  icon: ReactNode;
  bgColor: string;
}> = ({ icon, bgColor }) => <IconStyled $bgColor={bgColor}>{icon}</IconStyled>;

interface IUserActivityEventInfo {
  icon: ReactNode;
  title: ReactNode;
}

export const getUserActivityEventInfo = (
  event: EAnalyticsEvent
): IUserActivityEventInfo => {
  switch (event) {
    case EAnalyticsEvent.engine_quest_started:
      return {
        icon: (
          <Icon
            bgColor={palette(p => p.accent.info.ghosted, theme)}
            icon={<HoxIcon.Mail color={palette(p => p.accent.info)} />}
          />
        ),
        title: (
          <FormattedMessage
            id="app.admin.userDetails.activityTimeline.simulationSent"
            defaultMessage="Simulation sent"
            description="Title for event on a timeline that shows a simulation has been sent to user"
          />
        ),
      };
    case EAnalyticsEvent.engine_quest_failed:
      return {
        icon: (
          <Icon
            bgColor={palette(p => p.accent.danger.ghosted, theme)}
            icon={<HoxIcon.CrossCircle color={palette(p => p.accent.danger)} />}
          />
        ),
        title: (
          <FormattedMessage
            id="app.admin.userDetails.activityTimeline.clickedSimulation"
            defaultMessage="Clicked simulation"
            description="Title for event on a timeline that shows user clicked a simulation"
          />
        ),
      };

    case EAnalyticsEvent.engine_quest_succeeded:
      return {
        icon: (
          <Icon
            bgColor={palette(p => p.accent.positive.ghosted, theme)}
            icon={
              <HoxIcon.CheckCircle color={palette(p => p.accent.positive)} />
            }
          />
        ),
        title: (
          <FormattedMessage
            id="app.admin.userDetails.activityTimeline.reportedSimulation"
            defaultMessage="Reported simulation"
            description="Title for event on a timeline that shows user reported a simulation"
          />
        ),
      };

    case EAnalyticsEvent.engine_quest_missed:
      return {
        icon: (
          <Icon
            bgColor={palette(p => p.accent.boring.faded, theme)}
            icon={<HoxIcon.Hide color={palette(p => p.accent.boring)} />}
          />
        ),
        title: (
          <FormattedMessage
            id="app.admin.userDetails.activityTimeline.simulationExpired"
            defaultMessage="Simulation expired"
            description="Title for event on a timeline that shows user missed a simulation"
          />
        ),
      };

    case EAnalyticsEvent.engine_markers_viewed_player_rewarded:
      return {
        icon: (
          <Icon
            bgColor={palette(p => p.accent.golden.ghosted, theme)}
            icon={<HoxIcon.Star color={palette(p => p.accent.golden)} />}
          />
        ),
        title: (
          <FormattedMessage
            id="app.admin.userDetails.activityTimeline.viewedMicrotraining"
            defaultMessage="Viewed microtraining"
            description="Title for event on a timeline that shows user viewed a microtraining"
          />
        ),
      };

    default:
      return {
        icon: <span></span>,
        title: <span></span>,
      };
  }
};
