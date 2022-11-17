import React from 'react';
import * as R from 'ramda';
import groupBy from 'lodash/groupBy';
import { graphql } from '@apollo/client/react/hoc';
import { FormattedMessage } from 'react-intl';
import { isMainThemeTag } from '../ThemeTagField/lib';
import { compose, injectProps } from '../../components/higherOrderComponents';
import { GetVectorTagsDocument } from './__generated__/GetVectorTags.generated';
import MultiSelect from '../../components/MultiSelect';

const mapQueryResultToProps = ({ data: { loading, vectorTags } }) => {
  return {
    isLoading: loading,
    items: vectorTags,
  };
};

const propInjector = ({ hintText, floatingLabelText, items = [] }) => {
  const itemToString = (t = {}) => t.name;
  return {
    items: R.reject(isMainThemeTag, items),
    groupBy: items => groupBy(items, 'categoryName') || {},
    selectedItemTextRenderer: item =>
      `${item.categoryName}: ${itemToString(item)}`,
    itemToString,
    hintText: hintText || (
      <FormattedMessage
        id="app.components.searchTags"
        defaultMessage="Search tags"
        description="A placeholder shown on an input that can be used to select tags"
      />
    ),
    floatingLabelText: floatingLabelText || (
      <FormattedMessage
        id="app.component.newTagsLabel"
        defaultMessage="Tag blacklist"
        description="A label shown on an input that can be used to select blacklisted tags"
      />
    ),
  };
};

/**
 * @typedef {import('../../components/MultiSelect/MultiSelectContainer').IMultiSelectContainerProps} MultiSelectProps
 *
 * @type React.FC<Omit<MultiSelectProps, 'itemToString' | 'groupBy' | 'selectedItemTextRenderer>>
 */
const TagBlacklistSelector = compose(
  graphql(GetVectorTagsDocument, { props: mapQueryResultToProps }),
  injectProps(propInjector)
)(MultiSelect);

export default TagBlacklistSelector;
