import React from 'react';
import { Query } from '../../../utils/apollo';
import get from 'lodash/get';

import { ITag } from '../../../models/common';
import { ICurrentUserQueryResult, IFeaturesProps } from './models';
import { GetCurrentUserFeaturesDocument } from './__generated__/GetCurrentUserFeatures.generated';

class OrgTagsQuery extends Query<ICurrentUserQueryResult> {}

export const hasFeature = (featureTags: ITag[]) => (featureName: string) =>
  (featureTags || []).find(
    ({ categoryName, name }) =>
      categoryName === 'features' && name === featureName
  ) !== undefined;

export const Features: React.SFC<IFeaturesProps> = ({ children }) => (
  <OrgTagsQuery query={GetCurrentUserFeaturesDocument}>
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
