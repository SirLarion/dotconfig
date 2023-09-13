import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { isNil } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { animated } from 'react-spring/dist';

import { AnimatedNumber } from '@hox/ui/AnimatedNumber';
import { DonutChart } from '@hox/ui/DonutChart';
import { FlexDirectionColumn } from '@hox/ui/Flex';
import { Star } from '@hox/ui/Star';
import { palette } from '@hox/ui/styles/theme';
import { Body, Heading2, Heading4, SmallText } from '@hox/ui/Text';

import { DividerCard } from '../../../../components/DividerCard';
import { toPercentage } from '../../../../utils/toPercentage';
import { useAppearSpring } from '../../hooks/useAppearSpring';

import { ITrainingStat, TrainingStat } from './TrainingStat';

const STAR_SIZE_PX = 20;

const PercentagesWrapper = styled.div`
  display: flex;

  > :not(:last-child) {
    margin-right: 3rem;
  }
`;

const UserTrainingStatsContent = styled.div`
  padding-right: 5rem;
  display: flex;
  justify-content: space-between;
`;

const Left = styled(FlexDirectionColumn)`
  justify-content: space-evenly;

  > :not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const TrainingStatsContentLeft = styled(FlexDirectionColumn)`
  > :first-child {
    margin-bottom: 1.25rem;
  }
`;

const StarCountContainer = styled.div`
  display: flex;
  align-items: center;

  > :not(:last-child) {
    margin-right: 0.75rem;
  }
`;

const TimeframeBody = styled(Body)`
  > :first-child {
    margin-right: 0.25rem;
  }
`;

interface IUserTrainingStats {
  trainingActivatedAt: string;
  stars: number;
  totalStars: number;
  totalEmails: number;
  success: number;
  miss: number;
  fail: number;
}

export const UserTrainingStats: FC<IUserTrainingStats> = ({
  trainingActivatedAt,
  stars,
  totalStars,
  totalEmails,
  success,
  miss,
  fail,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const trainingStats: ITrainingStat[] = [
    {
      name: (
        <FormattedMessage
          id="admin.userDetails.trainingStats.success"
          defaultMessage="Success"
          description="Text heading for succeeded training simulations"
        />
      ),
      percentage: toPercentage(success, totalEmails),
      amount: success,
      color: palette(p => p.accent.positive),
    },
    {
      name: (
        <FormattedMessage
          id="admin.userDetails.trainingStats.fail"
          defaultMessage="Fail"
          description="Text heading for failed training simulations"
        />
      ),
      percentage: toPercentage(fail, totalEmails),
      amount: fail,
      color: palette(p => p.accent.danger),
    },
    {
      name: (
        <FormattedMessage
          id="admin.userDetails.trainingStats.miss"
          defaultMessage="Miss"
          description="Text heading for missed training simulations"
        />
      ),
      percentage: toPercentage(miss, totalEmails),
      amount: miss,
      color: palette(p => p.foreground.primary.faded),
    },
  ];

  return (
    <animated.div
      style={useAppearSpring(100)}
      data-test-id="admin-user-details-training-stats-card"
    >
      <DividerCard>
        <Heading4 data-test-id="admin-heading-card-title">
          <FormattedMessage
            id="admin.userDetails.trainingStats.heading"
            defaultMessage="Completed simulations ({totalEmails})"
            description="Text heading for user's training stats containing the amount of emails sent"
            values={{
              totalEmails,
            }}
          />
        </Heading4>
        <UserTrainingStatsContent>
          <Left>
            <TrainingStatsContentLeft>
              <TimeframeBody>
                {trainingActivatedAt ? (
                  <>
                    <span>
                      <FormattedMessage
                        id="admin.userDetails.trainingStats.trainingActiveFrom"
                        defaultMessage="From"
                        description="Text before the date when the user was activated at"
                      />
                    </span>
                    <span>
                      {format(new Date(trainingActivatedAt), 'dd MMMM yyyy')} -{' '}
                      {format(new Date(), 'dd MMMM yyyy')}
                    </span>
                  </>
                ) : (
                  <FormattedMessage
                    id="admin.userDetails.trainingStats.trainingNotActive"
                    defaultMessage="Training has not been activated for the user"
                    description="Text to display in single user's page if their training has not been activated"
                  />
                )}
              </TimeframeBody>
              <SmallText>
                <FormattedMessage
                  id="admin.userDetails.trainingStats.stars"
                  defaultMessage="Stars"
                  description="Text heading for user star count"
                />
              </SmallText>
              <StarCountContainer>
                <Star width={STAR_SIZE_PX} height={STAR_SIZE_PX} />
                <Heading2 data-test-id="admin-user-training-stats-stars">
                  <AnimatedNumber number={stars} />
                </Heading2>
                <SmallText data-test-id="admin-user-training-stats-total-stars">
                  <FormattedMessage
                    id="admin.userDetails.trainingStats.totalStars"
                    defaultMessage="out of {totalStars}"
                    description="Text informing admin about user's total star count"
                    values={{
                      totalStars,
                    }}
                  />
                </SmallText>
              </StarCountContainer>
            </TrainingStatsContentLeft>
            <PercentagesWrapper>
              {trainingStats.map((stat, i) => (
                <div onMouseEnter={() => setActiveIndex(i)} key={i}>
                  <TrainingStat
                    amount={stat.amount}
                    name={stat.name}
                    percentage={stat.percentage}
                    color={stat.color}
                    active={activeIndex === i}
                  />
                </div>
              ))}
            </PercentagesWrapper>
          </Left>
          <div>
            <DonutChart
              size={220}
              strokeWidth={36}
              thiccStrokeWidth={54}
              thiccIndex={activeIndex}
              values={[...trainingStats.map(stat => stat.amount)]}
              colors={[...trainingStats.map(stat => stat.color)]}
              background={palette(p => p.background.primary.level(2))}
              onHover={i => !isNil(i) && setActiveIndex(i)}
            >
              <>
                {totalEmails > 0 ? (
                  <FlexDirectionColumn>
                    <SmallText>{trainingStats[activeIndex].name}</SmallText>
                    <Heading2>
                      {trainingStats[activeIndex].percentage}%
                    </Heading2>
                  </FlexDirectionColumn>
                ) : (
                  <SmallText>
                    <FormattedMessage
                      id="admin.userDetails.trainingStats.graph.noDataText"
                      defaultMessage="No data"
                      description="Text for graph when no data to display"
                    />
                  </SmallText>
                )}
              </>
            </DonutChart>
          </div>
        </UserTrainingStatsContent>
      </DividerCard>
    </animated.div>
  );
};
