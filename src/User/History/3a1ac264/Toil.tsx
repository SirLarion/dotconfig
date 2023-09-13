import React from 'react';
import { QuestTemplateQuery } from '../../components/QuestTemplateSelector/QuestTemplateQuery';
import { FormattedMessage } from 'react-intl';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

interface IQuestTemplateSelectorProps {
  onChange: (newValue: any) => void;
  value: string;
  name: string;
}

export const BulkQuestSendingFormField = ({
  input: { onChange, value, name },
}) => <QuestTemplateSelector onChange={onChange} value={value} name={name} />;

export const QuestTemplateSelector = ({
  onChange,
  value,
  name,
}: IQuestTemplateSelectorProps) => {
  return (
    <QuestTemplateQuery query={questTemplateQuery}>
      {({ loading, error, data }) => {
        return (
          <Select
            style={{
              width: '100%',
            }}
            multiple
            displayEmpty
            onChange={e => onChange(e.target.value)}
            value={!value ? [] : value}
            name={name}
            renderValue={(selected: string[]) => {
              if (selected.length === 0) {
                return (
                  <FormattedMessage
                    id="app.form.questTemplateTag"
                    defaultMessage="Quest Template Tag"
                    description="Label for a field that is used to select a quest template tag"
                  />
                );
              }
              return selected.join(', ');
            }}
          >
            {data.questTemplates.map(({ tag }) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        );
      }}
    </QuestTemplateQuery>
  );
};
