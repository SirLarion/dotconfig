import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';
import { withHandlers, compose } from 'recompose';
import get from 'lodash/get';
import { RateThreatDocument } from '../../../../graphql/__generated__/RateThreat.generated';
import { QuickRatingView } from './QuickRatingView';
import { EThreatSeverity } from '../../../../models/threat';
import { GetQuickRatingDocument } from './__generated__/GetQuickRating.generated';

const quickRatingQueryConf = {
  options: ({
    match: {
      params: { threatId },
    },
  }) => {
    return {
      variables: {
        threatId,
      },
    };
  },
  props: ({ data = {} }) => {
    return {
      currentSeverity: get(data, 'threats.0.severity'),
    };
  },
  skip: ({
    match: {
      params: { threatId },
    },
  }) => !threatId,
};

const rateThreatMutationConf = {
  props: ({ mutate, ownProps }) => {
    return {
      rateThreat: (severity: EThreatSeverity) =>
        mutate({
          variables: {
            rating: { _id: ownProps.match.params.threatId, severity },
          },
        }),
    };
  },
};

export const QuickRatingContainer = compose(
  withRouter,
  graphql(GetQuickRatingDocument, quickRatingQueryConf),
  graphql(RateThreatDocument, rateThreatMutationConf),
  withHandlers({
    rateThreat:
      ({ rateThreat }) =>
      (e: React.SyntheticEvent<{ getAttribute }>) => {
        rateThreat(e.currentTarget.getAttribute('data-severity'));
      },
  })
)(QuickRatingView);
