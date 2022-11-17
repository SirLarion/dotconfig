import React from 'react';
import { Query } from '../../../utils/apollo';
import { gql } from '@apollo/client';
import get from 'lodash/get';

import { ITag } from '../../../models/common';
import { ICurrentUserQueryResult, IFeaturesProps } from './models';

class OrgTagsQuery extends Query<ICurrentUserQueryResult> {}

export const hasFeature = (featureTags: ITag[]) => (featureName: string) =>
  (featureTags || []).find(
    ({ categoryName, name }) =>
      categoryName === 'features' && name === featureName
  ) !== undefined;

export const Features: React.SFC<IFeaturesProps> = ({ children }) => (
  <OrgTagsQuery query={orgTagsQuery}>
    {({ loading, error, data }) => (
      <React.Fragment>
        {children({
          loading,
          hasFeature: hasFeature(
            get(data, 'currentUser.organization.features', [])
          ),
        })}
      </React.Fragment>
    )}
  </OrgTagsQuery>
);
