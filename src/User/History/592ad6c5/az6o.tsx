import React from 'react';
import { Query } from '@apollo/client/react/components';
import { withApollo } from '@apollo/client/react/hoc';
import { ApolloClient } from '@apollo/client';
import { withProps } from 'recompose';
import pick from 'lodash/pick';
import debounce from 'lodash/debounce';
import compose from 'lodash/flowRight';
import get from 'lodash/get';
import { ClientMetricSubmissionDocument } from './__generated__/ClientMetricSubmission.generated';
import { CurrentUserIdDocument } from './__generated__/CurrentUserId.generated';

// NOTE!
// This component MUST be present EXACTLY ONCE in the rendered component tree.
// The purpose of this component is to track the initial load time for the page, up to
// the latter of its render OR up to the loadEventEnd in window.performance.timing API.
//
// Furthermore, the component MUST be present on a page which is loaded via initial
// browser navigation. I.e. it SHOULD NOT be present on a page the user navigates to after
// the app has been loaded once. Such behavior may cause skew into the total time metric
// depending on how the specific browser handles navigationStart event in the performance
// timing API.
//
// Finally, the component MUST preserve the components mount time as render time to prevent skew.
// The user may initially be unauthenticated and we want the metrics only after authentication.
export class ClientTimingTrackerLogic extends React.Component<
  {
    client: ApolloClient<any>;
    authenticated: boolean;
    windowPerformanceTiming(): Promise<PerformanceTiming>;
  },
  {
    componentRenderTime: number;
    reported: boolean;
  }
> {
  private reported = false;
  private componentRenderTime: number;

  public async componentDidMount() {
    if (!this.componentRenderTime) {
      this.componentRenderTime = Date.now();
    }
    if (this.props.authenticated) {
      await this.reportClientTiming(this.componentRenderTime);
      this.reported = true;
    }
  }
  public async componentDidUpdate(prevProps) {
    if (
      this.props.authenticated &&
      this.props.authenticated !== prevProps.authenticated
    ) {
      await this.reportClientTiming(this.componentRenderTime);
      this.reported = true;
    }
  }

  public render() {
    return null;
  }

  private reportClientTiming(componentRenderTime: number) {
    if (this.reported) {
      return;
    }

    // Depending on the speed of query resolving it is possible to receive the response before onloadend event is completed. This hackity whackity ensures we never send the collected metrics before window perf timing has completed.
    return this.props.windowPerformanceTiming().then(timingMetrics => {
      return this.props.client.mutate({
        mutation: ClientMetricSubmissionDocument,
        variables: {
          clientName: 'HoxApp',
          metrics: {
            // IE11 adds non-standard fields to timing which GraphQL does not like so we limit to the standard, accepted, fields only
            ...pick(
              timingMetrics,
              'connectEnd',
              'connectStart',
              'domComplete',
              'domContentLoadedEventEnd',
              'domContentLoadedEventStart',
              'domInteractive',
              'domLoading',
              'domainLookupEnd',
              'domainLookupStart',
              'fetchStart',
              'loadEventEnd',
              'loadEventStart',
              'navigationStart',
              'redirectEnd',
              'redirectStart',
              'requestStart',
              'responseEnd',
              'responseStart',
              'secureConnectionStart',
              'unloadEventEnd',
              'unloadEventStart'
            ),
            componentRenderTime,
          },
        },
      });
    });
  }
}

// BEWARE: no automated tests exist for this as window.performance.timing is read-only API
const injectProps = () => ({
  windowPerformanceTiming: () =>
    new Promise(resolve => {
      const waitAndResolve = debounce(() => {
        if (window.performance.timing.loadEventEnd > 0) {
          resolve(window.performance.timing);
          return;
        }
        waitAndResolve();
      }, 50);
      waitAndResolve();
    }),
});

export const ClientTimingTrackerQueryComponent: React.SFC<{
  client: ApolloClient<any>;
  windowPerformanceTiming(): Promise<PerformanceTiming>;
}> = ({ client, windowPerformanceTiming }) => (
  <Query query={CurrentUserIdQuery}>
    {({ data }) => (
      <ClientTimingTrackerLogic
        authenticated={!!get(data, 'currentUser._id', '')}
        client={client}
        windowPerformanceTiming={windowPerformanceTiming}
      />
    )}
  </Query>
);

export const ClientTimingTracker: React.ComponentType = compose(
  withApollo as any,
  withProps(injectProps)
)(ClientTimingTrackerQueryComponent) as any;
