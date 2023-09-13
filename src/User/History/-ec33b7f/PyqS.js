import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import RateThreatView from './RateThreatView';
import get from 'lodash/get';
import { isSuperAdmin } from '../../models/userGetters';

import { PlayerCardUserFragment } from '../../types/userFragments';
import { EClientEvent } from '../../models/analytics';

import {
  compose,
  injectAnalytics,
} from '../../components/higherOrderComponents';
import { lifecycle } from 'recompose';

const CurrentUserQuery = gql`
  query RateThreatContainerCurrentUserQuery {
    currentUser {
      _id
      isSuperAdmin
      organization {
        _id
      }
    }
  }
`;

const RateThreatContainerQuery = gql`
  query RateThreatContainerQuery($id: ID!, $organizationId: ID) {
    threats(filter: { _id_eq: $id, organizationId_eq: $organizationId }) {
      _id
      severity
      createdAt
      feedbackSentAt
      userModifiers {
        userActedOnThreat
        repliedToEmail
        downloadedFile
        openedAttachment
        visitedLink
        enteredCredentials
        userMarkedAsSpam
        other
      }
      enrichments {
        hops {
          from
          fromScore
          by
          byScore
        }
        links {
          label
          href
          score
        }
      }
      email {
        subject
        sanitizedBody {
          signedUrl
        }
        headers {
          name
          value
        }
        from {
          name
          address
        }
        to {
          name
          address
        }
        attachments {
          type
          hash
          size
          name
          content {
            signedUrl
          }
          score
        }
        mime {
          signedUrl
        }
      }
      organization {
        _id
        name
        notifications {
          threatEscalationEmails
        }
      }
      escalationEmail {
        sendDate
      }
      escalationEmail {
        sendDate
        message
      }
      reporterUser {
        ...PlayerCardUserFragment
      }
    }
  }
  ${PlayerCardUserFragment}
`;

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
  graphql(CurrentUserQuery),
  graphql(RateThreatContainerQuery, {
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
