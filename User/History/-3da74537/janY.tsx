import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';

import { EAnalyticsEvent } from '@hox/frontend-utils/types/graphql.generated';
import { Button } from '@hox/ui/Button';
import { FlexCenter } from '@hox/ui/Flex';
import { HoxIcon } from '@hox/ui/HoxIcon';
import { Heading4, SmallText } from '@hox/ui/Text';
import { MainTimeline } from '@hox/ui/VerticalContentTimeline';

import { DividerCard } from '../../../../components/DividerCard';

import { UserActivityTimelineItem } from './components/UserActivityTimelineItem';
import { USER_TIMELINE_EVENTS } from './components/UserActivityTimelineItem/lib';
import {
  FetchUserActivityTimelineQuery,
  useFetchUserActivityTimelineQuery,
  UserActivityTimelineItemFragment,
} from './graphql/__generated__/FetchUserActivityTimeline.generated';
import { USER_ACTIVITY_TIMELINE_MESSAGES } from './intl';

export interface IUserActivityTimelineProps {
  userId: string;
}

const UserActivityTimelineCard = styled(DividerCard)`
  min-height: 15.25rem; // align with left col card when empty
`;

const EmptyTimelineMessageStyled = styled(SmallText)`
  font-style: italic;
  font-weight: 400;
`;

const StyledTimeline = styled(MainTimeline)`
  > * {
    margin-bottom: 0rem;
    :last-child {
      margin-bottom: 0;
    }
  }
`;

const getUserActivityFromQuery = (
  data: FetchUserActivityTimelineQuery | undefined
) =>
  data?.currentUser?.organization.users?.[0].activity || {
    nodes: [] as UserActivityTimelineItemFragment[],
    totalCount: 0,
  };

export const UserActivityTimeline: FC<IUserActivityTimelineProps> = ({
  userId,
}) => {
  const [limit, setLimit] = useState(5);

  const { data, previousData, fetchMore } = useFetchUserActivityTimelineQuery({
    partialRefetch: true,
    variables: {
      userId,
      limit,
      events: USER_TIMELINE_EVENTS as EAnalyticsEvent[],
    },
  });

  const { totalCount, nodes: activity } = getUserActivityFromQuery(
    data ?? previousData
  );

  const seeMore = useCallback(() => {
    const batchSize = 20;

    fetchMore({
      variables: {
        userId,
        limit: batchSize,
        offset: activity.length,
      },
    }).then(result => {
      setLimit(
        activity.length + getUserActivityFromQuery(result.data).nodes.length
      );
    });
  }, [activity.length, fetchMore, userId]);

  return (
    <UserActivityTimelineCard>
      <Heading4>{USER_ACTIVITY_TIMELINE_MESSAGES.timelineHeading}</Heading4>
      <StyledTimeline>
        {activity.length > 0 ? (
          activity.map((event, index) => (
            <UserActivityTimelineItem
              event={event}
              userId={userId}
              key={index}
            />
          ))
        ) : (
          <EmptyTimelineMessageStyled>
            {USER_ACTIVITY_TIMELINE_MESSAGES.timelineEmpty}
          </EmptyTimelineMessageStyled>
        )}
      </StyledTimeline>
      <FlexCenter>
        <Button
          plain
          iconStart={<HoxIcon.CaretDown />}
          disabled={activity.length === totalCount}
          onClick={seeMore}
        >
          {USER_ACTIVITY_TIMELINE_MESSAGES.seeMoreButtonText}
        </Button>
      </FlexCenter>
    </UserActivityTimelineCard>
  );
};
