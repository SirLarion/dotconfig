import React from 'react';
import { FormattedMessage } from 'react-intl';
import groupBy from 'lodash/groupBy';
import { graphql } from '@apollo/client/react/hoc';
import get from 'lodash/get';

import { injectProps } from '../../components/higherOrderComponents';
import { GetTagsDocument } from './__generated__/GetTags.generated';

import {
  MultiSelectContainer,
  IMultiSelectContainerProps,
} from '../../components/MultiSelect/MultiSelectContainer';

export interface ITag {
  categoryName: string;
  name: string;
}

export interface ITagSelectorContainerProps
  extends Omit<IMultiSelectContainerProps, 'itemToString'> {
  itemToString?: (tag: ITag) => string;
  tagFilter?: (tag: ITag) => boolean;
}

export const itemToString = (tag: ITag) => get(tag, 'name');

const mapQueryResultToProps = ({
  data,
  ownProps: { tagFilter, ...rest },
}: {
  data?: { tags?: ITag[]; loading: boolean };
  ownProps: ITagSelectorContainerProps;
}) => {
  const tags = data.tags || [];
  return {
    isLoading: data.loading,
    items: tagFilter ? tags.filter(tagFilter) : tags,
    ...rest,
  };
};

const propInjector = ({
  hintText,
  floatingLabelText,
  selectedItemTextRenderer,
}) => {
  return {
    groupBy: items => groupBy(items, 'categoryName') || {},
    selectedItemTextRenderer:
      selectedItemTextRenderer ||
      (item => `${item.categoryName}: ${itemToString(item)}`),
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
        id="app.component.tagsLabel"
        defaultMessage="Tags"
        description="A label shown on an input that can be used to select tags"
      />
    ),
  };
};

export const TagSelectorContainer: React.ComponentType<ITagSelectorContainerProps> =
  graphql(GetTagsDocument, {
    props: mapQueryResultToProps,
  })(injectProps(propInjector)(MultiSelectContainer));
