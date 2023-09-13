import React from 'react';
import { SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import { useQuery } from '@apollo/client';
import { tagToString, THEME_CATEGORIES } from './lib';

interface IThemeTagFieldProps extends PropTypes<typeof SelectField> {
  children: never;
}

const tagToPrimaryText = tag => `${tag.categoryName}: ${tag.name}`;

export const ThemeTagField: React.FC<IThemeTagFieldProps> = props => {
  const { data, loading } = useQuery(TAGS_QUERY);

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
