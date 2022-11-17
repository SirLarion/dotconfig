import React from 'react';
import { SelectField } from '../../components/SelectField';
import { TQtFilter, QuestTemplateQuery } from './models';

type SelectFieldProps = PropTypes<typeof SelectField>;

type TQuestTemplateSelectProps = {
  onChange: (val: string) => unknown;
  value: string;
  label?: React.ReactNode;
  itemFilter?: TQtFilter;
  name?: string;
  itemToString?: SelectFieldProps['itemToString'];
};

export const QuestTemplateSelect: React.FC<TQuestTemplateSelectProps> = ({
  itemToString = v => v,
  itemFilter,
  label,
  ...props
}) => (
  <QuestTemplateQuery
    query={questTemplateQuery}
    variables={{ filter: itemFilter }}
  >
    {({ data }) => (
      <SelectField
        {...props}
        floatingLabelText={label}
        items={data.questTemplates.map(({ tag }) => tag)}
        itemToString={itemToString}
      />
    )}
  </QuestTemplateQuery>
);

export const QuestTemplateSelectFormField = ({
  input: { onChange, value, name },
  ...props
}) => (
  <QuestTemplateSelect
    onChange={onChange}
    value={value}
    name={name}
    {...props}
  />
);
