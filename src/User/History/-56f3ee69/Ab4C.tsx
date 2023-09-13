import React from 'react';
import { FormattedMessage } from 'react-intl';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import styled from 'styled-components';

import {
  GetQuizTemplatesDocument,
  QuizTemplateQuery,
} from '../../components/QuizTemplateSelector/QuizTemplateQuery';

interface IQuizTemplateSelectorProps {
  onChange: (newValue: any) => void;
  value: string;
  name: string;
  quizTemplateIds: string[];
}

export const BulkQuizTemplateFormField = ({
  input: { onChange, value, name },
  quizModule,
}) => {
  return (
    <QuizTemplateSelector
      onChange={onChange}
      value={value}
      name={name}
      quizTemplateIds={quizModule.quizTemplateIds}
    />
  );
};
// NOTE (TK) Typecheck issues if we don't pass props expcilitely
const SelectStyled = styled(({ ...props }) => <Select {...props} />)`
  width: 100%;
`;

export const QuizTemplateSelector = ({
  onChange,
  value,
  name,
  quizTemplateIds,
}: IQuizTemplateSelectorProps) => {
  return (
    <QuizTemplateQuery
      query={quizTemplateQuery}
      variables={{ quizTemplateIds }}
    >
      {({ loading, error, data }) => {
        return (
          <SelectStyled
            displayEmpty
            onChange={e => onChange(e.target.value)}
            value={value || ''}
            name={name}
            renderValue={(selected: string) => {
              if (selected.length === 0) {
                return (
                  <FormattedMessage
                    id="app.form.quizTemplateIds"
                    defaultMessage="Quiz Template Tags"
                    description="Label for a field that is used to select a quiz template id"
                  />
                );
              }
              return selected;
            }}
          >
            {data.quizTemplates.map(({ tag, _id }) => (
              <MenuItem key={_id} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </SelectStyled>
        );
      }}
    </QuizTemplateQuery>
  );
};
