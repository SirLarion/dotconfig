import React from 'react';
import PropTypes from '../../utils/propTypes';
import { MenuItem } from '../../components/Menu';
import SelectField from 'material-ui/SelectField';

export interface ISelectFieldProps {
  items: unknown[];
  value: string;
  onChange: () => void;
  itemToString: PropTypes.func;
}

const DEFAULT_PROPS = {
  itemToString: v => v,
};

const SelectFieldView = ({
  items,
  value,
  itemToString,
  onChange,
  ...selectProps
}) => (
  <SelectField
    {...selectProps}
    autoWidth
    onChange={(e, i) => onChange(items[i])}
    value={value}
  >
    {items.map(item => (
      <MenuItem
        key={itemToString(item)}
        value={item}
        primaryText={itemToString(item)}
      />
    ))}
  </SelectField>
);

SelectFieldView.propTypes = PROP_TYPES;
SelectFieldView.defaultProps = DEFAULT_PROPS;

export default SelectFieldView;
