import React from 'react';
import { FormattedMessage } from 'react-intl';

export const USER_ACTIVITY_TIMELINE_MESSAGES = {
  timelineHeading: (
    <FormattedMessage
      id="app.admin.userDetails.activityTimeline.heading"
      defaultMessage="Activity log"
      description="Heading for component showing the latest activity for user"
    />
  ),
  timelineEmpty: (
    <FormattedMessage
      id="app.admin.userDetails.activityTimeline.empty"
      defaultMessage="No recorded activity"
      description="Text to display when user has no recorded activity that admin can see"
    />
  ),
  seeMoreButtonText: (
    <FormattedMessage
      id="app.admin.userDetails.activityTimeline.seeMore"
      defaultMessage="See more"
      description="Text to on a button that lets the user load more events"
    />
  ),
};

export const USER_ACTIVITY_TIMELINE_EVENT_MESSAGES = {
  engine_quest_started: (
    <FormattedMessage
      id="app.admin.userDetails.activityTimeline.simulationSent"
      defaultMessage="Simulation sent"
      description="Title for event on a timeline that shows a simulation has been sent to user"
    />
  ),
  engine_quest_failed: (
    <FormattedMessage
      id="app.admin.userDetails.activityTimeline.clickedSimulation"
      defaultMessage="Clicked simulation"
      description="Title for event on a timeline that shows user clicked a simulation"
    />
  ),
  engine_quest_success: (
    <FormattedMessage
      id="app.admin.userDetails.activityTimeline.reportedSimulation"
      defaultMessage="Reported simulation"
      description="Title for event on a timeline that shows user reported a simulation"
    />
  ),
  engine_quest_missed: (
    <FormattedMessage
      id="app.admin.userDetails.activityTimeline.simulationExpired"
      defaultMessage="Simulation expired"
      description="Title for event on a timeline that shows user missed a simulation"
    />
  ),
  engine_quest_rereported: (
    <FormattedMessage
      id="app.admin.userDetails.activityTimeline.simulationRereported"
      defaultMessage="Reported simulation again"
      description="Title for event on a timeline that shows user reported a simulation again"
    />
  ),
  engine_markers_viewed_player_rewarded: (
    <FormattedMessage
      id="app.admin.userDetails.activityTimeline.viewedMicrotraining"
      defaultMessage="Viewed microtraining"
      description="Title for event on a timeline that shows user viewed a microtraining"
    />
  ),
  user_onboarded: (
    <FormattedMessage
      id="app.admin.userDetails.activityTimeline.userOnboarded"
      defaultMessage="User onboarded"
      description="Title for event on a timeline that shows that the user was onboarded"
    />
  ),
};
