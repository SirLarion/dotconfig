import React, { FC } from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring/dist';

import { skeletonLoaderPulseAnimation } from '../../../SkeletonLoader';
import { palette } from '../../../styles/theme';
import { BaseAnalyticsCard } from '../BaseAnalyticsCard';

interface IAnalyticsSkeletonLoaderCardProps {
  splitCard?: boolean;
}

const BaseAnalyticsCardStyled = styled(animated(BaseAnalyticsCard))`
  display: flex;
  ${skeletonLoaderPulseAnimation};
`;

const TitleBox = styled.div`
  width: 80%;
  height: 20%;
`;

const MainValueBox = styled.div`
  width: 70%;
  height: 35%;
`;

const SubtitleBox = styled.div`
  width: 100%;
  height: 15%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  > * {
    background: ${palette(p => p.background.overlay)};
    border-radius: 0.5rem;
  }
`;

const RightSideContent = styled.div`
  height: 100%;
  width: 70%;
  align-self: end;
`;

export const AnalyticsSkeletonLoaderCard: FC<
  IAnalyticsSkeletonLoaderCardProps
> = ({ splitCard, ...restProps }) => {
  return (
    <BaseAnalyticsCardStyled {...restProps} title={null}>
      <Section>
        <TitleBox></TitleBox>
        <MainValueBox></MainValueBox>
        <SubtitleBox></SubtitleBox>
      </Section>
      {splitCard && (
        <Section>
          <RightSideContent></RightSideContent>
        </Section>
      )}
    </BaseAnalyticsCardStyled>
  );
};
