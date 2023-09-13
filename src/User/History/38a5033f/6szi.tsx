import React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Enzyme } from '../../../npm/Enzyme/index';
import {
  getApolloContextDef,
  getSchema,
  timeout,
} from '../../../utils/testUtils';

import { ClientTimingTrackerQueryComponent } from '../ClientTimingTracker';
import { ClientMetricSubmissionDocument } from '../__generated__/ClientMetricSubmission.generated';

interface ITestMocks {
  windowPerformanceTiming: sinon.SinonStub;
  currentUserResolver: sinon.SinonStub;
  trackClientMetricsResolver: sinon.SinonStub;
}

const getMocks = (overrides = {}) => {
  const windowPerformanceTiming = sinon.stub().returns(
    Promise.resolve({
      navigationStart: 1533893985362,
      unloadEventStart: 1533894021042,
      unloadEventEnd: 1533894021042,
      redirectStart: 0,
      redirectEnd: 0,
      fetchStart: 1533893985371,
      domainLookupStart: 1533893985375,
      domainLookupEnd: 1533893985437,
      connectStart: 1533893985437,
      connectEnd: 1533893985532,
      secureConnectionStart: 1533893985442,
      requestStart: 1533893985532,
      responseStart: 1533894021038,
      responseEnd: 1533894021041,
      domLoading: 1533894021054,
      domInteractive: 1533894021718,
      domContentLoadedEventStart: 1533894021719,
      domContentLoadedEventEnd: 1533894021752,
      domComplete: 1533894024013,
      loadEventStart: 1533894024013,
      loadEventEnd: 1533894024099,
    })
  );

  const currentUserResolver = sinon.stub().resolves({ _id: 'abc' });
  const trackClientMetricsResolver = sinon.stub().resolves(true);

  return {
    windowPerformanceTiming,
    currentUserResolver,
    trackClientMetricsResolver,
    ...overrides,
  };
};

describe('<ClientTimingTracker />', () => {
  describe('mounting', () => {
    const tests: Array<{
      description: string;
      mocks: ITestMocks;
      userResolveCalls: number;
      isTrackClientMetricsResolverCalled: boolean;
      isCurrentUserResolverCalled: boolean;
      isWindowPerformanceTimingCalled: boolean;
    }> = [
      {
        description:
          'should submit performance metrics if authenticated and timing is finished',
        mocks: getMocks(),
        userResolveCalls: 1,
        isTrackClientMetricsResolverCalled: true,
        isCurrentUserResolverCalled: true,
        isWindowPerformanceTimingCalled: true,
      },
      {
        description: 'should not submit performance metrics if not signed in',
        mocks: getMocks({
          currentUserResolver: sinon.stub().resolves({ _id: '' }),
        }),
        userResolveCalls: 1,
        isTrackClientMetricsResolverCalled: false,
        isCurrentUserResolverCalled: true,
        isWindowPerformanceTimingCalled: false,
      },
      {
        description: 'should submit performance metrics once the user signs in',
        mocks: getMocks({
          currentUserResolver: sinon
            .stub()
            .onFirstCall()
            .resolves({ _id: '' })
            .onSecondCall()
            .resolves({ _id: 'abc' }),
        }),
        userResolveCalls: 2,
        isTrackClientMetricsResolverCalled: true,
        isCurrentUserResolverCalled: true,
        isWindowPerformanceTimingCalled: true,
      },
    ];

    for (const test of tests) {
      it(test.description, async () => {
        const {
          windowPerformanceTiming,
          currentUserResolver,
          trackClientMetricsResolver,
        } = test.mocks;
        const schema = getSchema({
          resolvers: {
            RootQuery: {
              currentUser: currentUserResolver,
            },
            RootMutation: {
              trackClientMetrics: trackClientMetricsResolver,
            },
          },
        });

        const mountContext = getApolloContextDef({ schema });
        const { client } = mountContext.context;
        const clientTimingTrackedMount = Enzyme.mount(
          <ClientTimingTrackerQueryComponent
            client={client}
            windowPerformanceTiming={windowPerformanceTiming}
          />,
          mountContext
        );

        await timeout(0); // wait for mount

        // if multiple calls are expected by the test, expect the metrics to only be submitted after the last one
        for (let i = 1; i < test.userResolveCalls; i++) {
          expect(trackClientMetricsResolver.called).equal(false);
          expect(windowPerformanceTiming.called).equal(false);
          await client.query({
            fetchPolicy: 'network-only',
            query: ClientMetricSubmissionDocument,
          });
        }

        await timeout(0); // wait for perf timing promise resolve
        expect(currentUserResolver.callCount).equal(test.userResolveCalls);
        expect(currentUserResolver.called).equal(
          test.isCurrentUserResolverCalled
        );
        expect(trackClientMetricsResolver.called).equal(
          test.isTrackClientMetricsResolverCalled
        );
        expect(windowPerformanceTiming.called).equal(
          test.isWindowPerformanceTimingCalled
        );

        clientTimingTrackedMount.unmount();
      });
    }
  });
});
