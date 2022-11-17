import React, { FC } from 'react';
import styled from 'styled-components';
import { animated, config, useTrail } from 'react-spring/dist';

import { Blocks } from '@hox/ui/Blocks';
import { LoadingIndicator } from '@hox/ui/LoadingIndicator';

import { Layout } from '../../components/Layout';

import { TechnicalTestTable } from './components/Table';
import { useGroupTestCases } from './components/Table/hooks/useGroupTestCases';
import { TestingGuide } from './components/TestingGuide';
import { TestingKbLink } from './components/TestingKbLink';
import { TestSender } from './components/TestSender';
import { usePollActiveTests } from './hooks/usePollActiveTests';
import { TGroupedTechnicalTestCase } from './types';

const TRAIL_ITEMS_COUNT = 3;
const TRAIL_DELAY_MS = 120;

const TechnicalTestingStyled = styled(Layout.View)`
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const ContentStyled = styled(Layout.Content)`
  > :first-child {
    margin-bottom: 2rem;
  }
`;

// Spring animates last item "on top" of everything else which hides the dropdowns, hence z-index here
const TestSenderAnimated = styled(animated.div)`
  position: relative;
  z-index: 1;
`;

const CurrentComponentAnimated = animated(Blocks.Column);

const getCurrentComponent = (
  loading: boolean,
  groupedTests: TGroupedTechnicalTestCase[]
) => {
  if (loading) {
    return (
      <Blocks.Row justifyContent="center">
        <LoadingIndicator />
      </Blocks.Row>
    );
  }

  if (groupedTests.length > 0) {
    return groupedTests.map(groupedTest => (
      <TechnicalTestTable
        key={groupedTest.testName}
        testName={groupedTest.testName}
        testCases={groupedTest.testCases}
      />
    ));
  }

  return <TestingGuide />;
};

export const TechnicalTestingView: FC = ({ ...restProps }) => {
  const { activeTests, loading } = usePollActiveTests();
  const { groupedTests } = useGroupTestCases(activeTests);

  const trail = useTrail(TRAIL_ITEMS_COUNT, {
    config: { ...config.stiff, clamp: true },
    from: { opacity: 0, transform: 'translate3d(0, 1rem, 0)' },
    opacity: 1,
    transform: 'translate3d(0, 0rem, 0)',
    delay: TRAIL_DELAY_MS,
  });

  return (
    <TechnicalTestingStyled {...restProps}>
      <ContentStyled>
        <animated.div style={trail[0]}>
          <Blocks.Row justifyContent="space-between" alignItems="center">
            <Layout.PageTitle>Technical testing</Layout.PageTitle>
            <TestingKbLink withIcon />
          </Blocks.Row>
        </animated.div>
        <TestSenderAnimated style={trail[1]}>
          <TestSender resetButtonDisabled={activeTests.length > 0} />
        </TestSenderAnimated>
        <CurrentComponentAnimated style={trail[2]}>
          {getCurrentComponent(loading, groupedTests)}
        </CurrentComponentAnimated>
      </ContentStyled>
    </TechnicalTestingStyled>
  );
};
