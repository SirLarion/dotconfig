import PropTypes from '../../../../utils/propTypes';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';

import last from 'lodash/last';
import first from 'lodash/first';
import uniqBy from 'lodash/uniqBy';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import once from 'lodash/once';

import { withRouter } from 'react-router-dom';

import {
  compose,
  withKeyboardShortcuts,
  EKeyCode,
  injectAnalytics,
} from '../../../../components/higherOrderComponents';
import WorkQueueView from './WorkQueueView';
import {
  EThreatSeverityGroup,
  THREAT_GROUP,
} from '../ThreatFilterOptionIconMenu/models';
import { EUserReportedAsGroup } from '../UserReportedAsFilter/models';
import { lifecycle } from 'recompose';
import { EClientEvent } from '../../../../models/analytics';

const threatReportConfig = {
  allThreatsShown: undefined,
  showUserReportedSpam: true,
  showUserReportedPhishing: null,
};

const mapUserReportedAsToQueryVar = filter => {
  switch (filter) {
    case EUserReportedAsGroup.ALL:
      return { userMarkedAsSpam: threatReportConfig.allThreatsShown };
    case EUserReportedAsGroup.USER_REPORTED_AS_SPAM:
      return { userMarkedAsSpam: threatReportConfig.showUserReportedSpam };
    case EUserReportedAsGroup.USER_REPORTED_AS_PHISHING:
      return { userMarkedAsSpam: threatReportConfig.showUserReportedPhishing };
    default:
      return { userMarkedAsSpam: threatReportConfig.allThreatsShown };
  }
};

const mapFilterOptionToQueryVar = filter => {
  switch (filter) {
    case EThreatSeverityGroup.NOT_RATED:
      return { severity: null };
    case EThreatSeverityGroup.ALL:
    case THREAT_GROUP:
      return { severity: undefined };
    default:
      return { severity: filter };
  }
};

const mapOrganizationIdFilterToQueryVar = (organizationId, currentUser) => {
  if (currentUser && !currentUser.isSuperAdmin) {
    return { organizationId: currentUser.organization._id };
  }

  return { organizationId: organizationId || undefined };
};

// This is meant to be called only on initial load. If threatId is provided as url path parameter,
// then we want to load content around that threatId and navigate to that item.
const mapQueryDirection = once(threatId => ({
  direction: 'AROUND',
  threatId,
  first: 100,
}));

const mapPropsToQueryOpts = ({
  data,
  selectedItemId,
  searchFilter: {
    filterOption,
    organizationIdFilter,
    searchText,
    campaignThreatId,
    userReportedAsFilter,
  },
}) => ({
  skip: data.currentUser === undefined,
  variables: {
    first: 50,
    ...(selectedItemId ? mapQueryDirection(selectedItemId) : {}),
    ...(searchText ? { searchText } : {}),
    ...(campaignThreatId ? { campaignThreatId } : {}),
    ...mapFilterOptionToQueryVar(filterOption),
    ...mapOrganizationIdFilterToQueryVar(
      organizationIdFilter,
      data.currentUser
    ),
    ...mapUserReportedAsToQueryVar(userReportedAsFilter),
  },
});

const getThreatIdByDirection = (threats, direction) => {
  if (direction === 'OLD') {
    return last(threats)._id;
  }
  if (direction === 'NEW') {
    return first(threats)._id;
  }
  return undefined;
};

const mapPropsToQueryProps = ({
  data: { threats = [], loading, fetchMore },
}) => {
  return {
    threats: uniqBy(threats, '_id'),
    isLoading: loading,
    loadMore(batchSize, direction) {
      return fetchMore({
        variables: {
          first: batchSize,
          direction,
          threatId: getThreatIdByDirection(threats, direction),
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }
          const uniqueThreats = orderBy(
            uniqBy(
              [
                ...get(previousResult, 'threats', []),
                ...get(fetchMoreResult, 'threats', []),
              ],
              '_id'
            ),
            ['createdAt'],
            ['desc']
          );
          return Object.assign({}, previousResult, {
            threats: uniqueThreats,
          });
        },
      });
    },
  };
};

const PROP_TYPES = {
  searchFilter: PropTypes.shape({
    filterOption: PropTypes.string,
    searchText: PropTypes.string,
    campaignThreatId: PropTypes.string,
    userReportedAsFilter: PropTypes.oneOfType([
      PropTypes.boolean,
      PropTypes.undefined,
    ]),
  }).isRequired,
};

const getCurrentThreatIndex = ({ threats, selectedItemId }) =>
  threats.findIndex(threat => threat._id === selectedItemId);

const goToThreat =
  indexDelta =>
  ({ history, location, ...props }) => {
    const currentIndex = getCurrentThreatIndex(props);
    const newThreat = props.threats[currentIndex + indexDelta];

    if (newThreat) {
      history.push({
        pathname: `/threats/${newThreat._id}`,
        query: location.query,
      });
    }
  };

const goToPreviousThreat = goToThreat(-1);
const goToNextThreat = goToThreat(1);

// this function looks ugly because it tries to determine if the
// two arrays are different in the least amount of time. sorry!
const threatsChanged = (props, prevProps) => {
  if (props.loading) {
    return false;
  }

  const [threats, prevThreats] = [
    get(props, 'threats', []),
    get(prevProps, 'threats', []),
  ];

  if (threats.length === 0 && prevThreats.length > 0) {
    return true;
  }

  let changed = false;
  for (let i = 0; i < threats.length; i += 1) {
    if (get(prevThreats[i], '_id') !== get(threats[i], '_id')) {
      changed = true;
      break;
    }
  }
  return changed;
};

export const WorkQueueContainer = compose(
  withRouter,
  graphql(CurrentUserQuery),
  graphql(ThreatWorkQueueQuery, {
    options: mapPropsToQueryOpts,
    props: mapPropsToQueryProps,
  }),
  withKeyboardShortcuts({
    targetElement: document.body,
    shortcuts: {
      [EKeyCode.LEFT_ARROW]: goToPreviousThreat,
      [EKeyCode.UP_ARROW]: goToPreviousThreat,
      [EKeyCode.RIGHT_ARROW]: goToNextThreat,
      [EKeyCode.DOWN_ARROW]: goToNextThreat,
    },
  }),
  injectAnalytics,
  lifecycle({
    componentDidUpdate(prevProps) {
      if (threatsChanged(this.props, prevProps)) {
        this.props.analytics.track(
          EClientEvent.RATE_THREAT_INDEX_VIEW_FILTER_RESULTS_LOADED
        );
      }
    },
  })
)(WorkQueueView);

WorkQueueContainer.propTypes = PROP_TYPES;
