import React from 'react';
import { SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import { tagToString, THEME_CATEGORIES } from './lib';
import { useGetThemeTagsQuery } from './__generated__/GetThemeTags.generated';

interface IThemeTagFieldProps extends PropTypes<typeof SelectField> {
  children: never;
}

const tagToPrimaryText = tag => `${tag.categoryName}: ${tag.name}`;

export const ThemeTagField: React.FC<IThemeTagFieldProps> = props => {
  const { data, loading } = useGetThemeTagsQuery();

  if (loading) {
    return null;
  }

  const options = data.vectorTags.filter(tag =>
    THEME_CATEGORIES.includes(tag.categoryName)
  );

  return (
    <SelectField {...props}>
      <MenuItem value={null} primaryText={'none'} />
      {options.map(tag => (
        <MenuItem
          key={tagToString(tag)}
          value={tagToString(tag)}
          primaryText={tagToPrimaryText(tag)}
        />
      ))}
    </SelectField>
  );
};
