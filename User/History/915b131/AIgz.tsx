import React, { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { animated, config, useSpring } from 'react-spring/dist';

import { Blocks } from '@hox/ui/Blocks';
import { Card } from '@hox/ui/Card';
import { HoxIcon } from '@hox/ui/HoxIcon';
import { ProgressBar } from '@hox/ui/ProgressBar';
import { palette, themeDark } from '@hox/ui/styles/theme';
import { Heading2, SmallText, SmallTextStrong } from '@hox/ui/Text';

import { onboardingPaths } from '../../../../layouts/paths';
import { ONBOARDING_TASK_GROUP_METADATA } from '../../../../onboarding/lib';
import { toPercentage } from '../../../../utils/toPercentage';
import { useOnboardingProgressBarData } from '../../hooks/useOnboardingProgressData';

const ProgressContentStyled = styled.div`
  flex: 1;
  display: grid;
  align-items: center;
  padding: 1rem;
  grid-template-columns: 1fr minmax(6rem, 0.4fr);

  > a {
    text-decoration: none;
  }

  > :last-child {
    justify-content: flex-end;
  }
`;

const IconBackground = styled.span`
  display: inline;
  padding: 0.5rem;
  border-radius: 100%;
  background-color: ${palette(p => p.cta.primary.faded)};
`;

const ProgressBarCard = styled(animated(Card))`
  padding: 1rem;
  background-color: ${palette(p => p.background.primary)};

  > :first-child {
    margin-bottom: 0.75rem;
  }
`;

const ProgressBarStyled = styled(ProgressBar)`
  background-color: ${palette(p => p.background.overlay)};
`;

const ProgressHorizontal = styled.div`
  display: flex;
  align-items: center;

  > :not(:last-child) {
    margin-right: 1rem;
  }

  > :not(${ProgressBarStyled}) {
    flex-shrink: 0;
  }
`;

type TLocationState = {
  groupKey?: string;
};

export const ProgressContent: FC = ({ ...restProps }) => {
  const location = useLocation();
  const state = location.state as TLocationState;

  const { counts } = useOnboardingProgressBarData();
  const requiredRatio = counts.required.completed / counts.required.total;
  const optionalRatio = counts.optional.completed / counts.optional.total;

  const progressCardSpring = useSpring({
    from: {
      opacity: 0,
    },
    opacity: 1,
    delay: 150,
    config: { ...config.stiff, clamp: true },
  });

  return (
    <ProgressContentStyled {...restProps}>
      <Link to={onboardingPaths.root}>
        <Blocks.HorizontalGroup gap="large">
          <IconBackground>
            <HoxIcon.Rocket
              size={2}
              color={palette(p => p.foreground.primary)}
            />
          </IconBackground>

          <Heading2>
            {state && state.groupKey
              ? ONBOARDING_TASK_GROUP_METADATA[state.groupKey].title
              : 'Launch setup'}
          </Heading2>
        </Blocks.HorizontalGroup>
      </Link>

      <ThemeProvider theme={themeDark}>
        <ProgressBarCard style={progressCardSpring}>
          <ProgressHorizontal>
            <SmallText>Required</SmallText>
            <ProgressBarStyled
              ratio={requiredRatio}
              color={palette(p => p.cta.primary)}
            />
            <SmallText dimmed>
              {counts.required.completed} / {counts.required.total}
            </SmallText>
            <SmallTextStrong>
              {toPercentage(counts.required.completed, counts.required.total)}%
            </SmallTextStrong>
          </ProgressHorizontal>
          <ProgressHorizontal>
            <SmallText>Optional</SmallText>
            <ProgressBarStyled
              ratio={optionalRatio}
              color={palette(p => p.accent.boring)}
            />
            <SmallText dimmed>
              {counts.optional.completed} / {counts.optional.total}
            </SmallText>
            <SmallTextStrong>
              {toPercentage(counts.optional.completed, counts.optional.total)}%
            </SmallTextStrong>
          </ProgressHorizontal>
        </ProgressBarCard>
      </ThemeProvider>
    </ProgressContentStyled>
  );
};
