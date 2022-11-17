import { graphql } from '@apollo/client/react/hoc';
import RateThreatView from './RateThreatView';
import get from 'lodash/get';
import { isSuperAdmin } from '../../models/userGetters';
import { EClientEvent } from '../../models/analytics';
import {
  RateThreatContainerCurrentUserDocument,
  RateThreatContainerDocument,
} from './__generated__/RateThreatContainer.generated';

import {
  compose,
  injectAnalytics,
} from '../../components/higherOrderComponents';
import { lifecycle } from 'recompose';

const mapPropsToQueryOpts = ({ threatId, data }) => {
  if (!data.currentUser) {
    return {
      skip: true,
    };
  }

  const organizationId = !data.currentUser.isSuperAdmin
    ? data.currentUser.organization._id
    : undefined;

  return {
    variables: {
      id: threatId,
      organizationId,
    },
  };
};

const mapQueryResultToProps = ({
  data: { loading, threats = [] },
  ownProps,
}) => {
  const [threat] = threats;
  const currentUser = get(ownProps, 'data.currentUser');

  return {
    isLoading: loading,
    threat,
    allowDeletion: isSuperAdmin(currentUser),
  };
};

export default compose(
  graphql(RateThreatContainerCurrentUserDocument),
  graphql(RateThreatContainerDocument, {
    options: mapPropsToQueryOpts,
    props: mapQueryResultToProps,
  }),
  injectAnalytics,
  lifecycle({
    componentDidUpdate(prevProps) {
      const threatId = get(this, 'props.params.threatId');
      if (threatId != null && threatId !== get(prevProps, 'params.threatId')) {
        this.props.analytics.track(EClientEvent.RATE_THREAT_VIEW_OPENED, {
          threatId,
        });
      }
    },
    componentWillMount() {
      const threatId = get(this, 'props.params.threatId');
      this.props.analytics.track(EClientEvent.RATE_THREAT_VIEW_OPENED, {
        threatId,
      });
    },
  })
)(RateThreatView);
