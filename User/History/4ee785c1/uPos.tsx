import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { animated, config, useSpring } from 'react-spring/dist';

import { Blocks } from '@hox/ui/Blocks';
import { HoxIcon } from '@hox/ui/HoxIcon';
import { palette } from '@hox/ui/styles/theme';
import { SmallText } from '@hox/ui/Text';
import { VerticalTimelineItem } from '@hox/ui/VerticalContentTimeline';

import { getUserQuestPreviewPath } from '../../../../../../layouts/paths';
import { includesSpicyModeTag } from '../../../../../../utils/includesSpicyModeTag';
import { UserActivityTimelineItemFragment } from '../../graphql/__generated__/FetchUserActivityTimeline.generated';

import { getUserActivityEventInfo } from './lib';

const StyledVerticalTimelineItem = styled(VerticalTimelineItem)`
  height: 4.5rem;
  position: relative;

  :after {
    top: auto;
    left: 0.5rem;
    bottom: 0.5rem;
    height: 1.5rem;
    border-radius: 1px;
    transform: none;
    opacity: 1;
    background-color: ${palette(p => p.foreground.primary.ghosted)};
  }

  > :last-child {
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    padding-top: 0.5rem;
  }

  > :nth-child(2) {
    flex-shrink: 0;
  }
`;

const LinkAndTimestamp = styled.div`
  display: flex;
  align-items: center;

  > :first-child {
    margin-right: 1.5rem;
    display: flex;
    align-items: center;

    :first-child {
      margin-right: 0.5rem;
      text-transform: uppercase;
    }
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const AnimatedTimestamp = styled(animated.div)`
  display: flex;
  align-items: center;
  pointer-events: none;

  > :first-child {
    margin-right: 1rem;
  }

  > :last-child {
    width: 8rem;
    text-align: right;
  }
`;

const AnimatedCaret = styled(animated(HoxIcon.CaretRight))`
  pointer-events: none;
`;

const PreviewAvailable = styled(SmallText)`
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
  color: ${palette(p => p.accent.boring)};
  background-color: ${palette(p => p.accent.boring.ghosted)};
`;

const ItemTitle = styled(Blocks.Row)`
  flex-grow: 0;
  > div {
    flex-grow: 0;
  }
`;

const Timestamp: FC<{ timestamp: Date }> = ({ timestamp }) => (
  <AnimatedTimestamp>
    <FormattedDate value={timestamp} format="default" />
  </AnimatedTimestamp>
);

export interface IUserActivityTimelineItemProps {
  event: UserActivityTimelineItemFragment;
  userId: string;
}

export const UserActivityTimelineItem: FC<IUserActivityTimelineItemProps> = ({
  event,
  userId,
}) => {
  const itemData = getUserActivityEventInfo(event);

  const questId = event.quest?._id;

  const isSpicyMode = includesSpicyModeTag(event.quest?.tags);

  const [isMouseOverItem, setIsMouseOverItem] = useState(false);

  const timestampSpring = useSpring({
    transform: isMouseOverItem ? 'translateX(-0.25rem)' : 'translateX(1.5rem)',
    config: config.stiff,
  });

  const caretSpring = useSpring({
    transform: isMouseOverItem ? 'scale(1)' : 'scale(0)',
    config: {
      clamp: true,
      ...config.stiff,
    },
  });

  if (!itemData) {
    return null;
  }
  const { icon, title } = itemData;

  return (
    <>
      {questId ? (
        <StyledVerticalTimelineItem
          key={event.timestamp}
          icon={icon}
          title={
            <ItemTitle alignItems="center">
              <Blocks.Column>
                {title}
                {event.questTag && (
                  <SmallText dimmed>
                    {event.questTag.replace('hox.quest.', '')}
                  </SmallText>
                )}
              </Blocks.Column>
              {isSpicyMode && (
                <HoxIcon.Spicy color={palette(p => p.accent.danger)} />
              )}
            </ItemTitle>
          }
        >
          <LinkAndTimestamp>
            <StyledLink
              onMouseEnter={() => setIsMouseOverItem(true)}
              onMouseLeave={() => setIsMouseOverItem(false)}
              to={getUserQuestPreviewPath(userId, questId)}
            />
            <AnimatedTimestamp style={timestampSpring}>
              <PreviewAvailable>
                <FormattedMessage
                  id="app.admin.userDetails.activityTimeline.item.previewAvailable"
                  defaultMessage="Preview"
                  description="Text for label in timeline item that has preview available"
                />
              </PreviewAvailable>
              <span>
                <FormattedDate value={event.timestamp} format="default" />
              </span>
            </AnimatedTimestamp>
          </LinkAndTimestamp>
          <AnimatedCaret style={caretSpring} />
        </StyledVerticalTimelineItem>
      ) : (
        <StyledVerticalTimelineItem
          key={event.timestamp}
          icon={icon}
          title={
            <>
              {title}
              {event.questTag && (
                <SmallText dimmed>
                  {event.questTag.replace('hox.quest.', '')}
                </SmallText>
              )}
            </>
          }
        >
          <Timestamp timestamp={event.timestamp} />
        </StyledVerticalTimelineItem>
      )}
    </>
  );
};
