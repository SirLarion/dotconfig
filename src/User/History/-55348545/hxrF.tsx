import React from 'react';
import { FormattedMessage } from 'react-intl';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import styled from 'styled-components';

import { QuizModuleQuery } from '../../components/QuizTemplateSelector/QuizModuleQuery';
import { Field } from '../../components/ui/Form/Field';
import { BulkQuizTemplateFormField } from './BuildQuizTemplateFormField';

interface IQuizModuleSelectorProps {
  onChange: (newValue: any) => void;
  value: string;
  name: string;
}

export const BulkQuizModuleFormField = ({
  input: { onChange, value, name },
}) => <QuizModuleSelector onChange={onChange} value={value} name={name} />;

// NOTE (TK) Typecheck issues if we don't pass props expcilitely
const SelectStyled = styled(({ ...props }) => <Select {...props} />)`
  width: 100%;
`;

export const QuizModuleSelector = ({
  onChange,
  value,
  name,
}: IQuizModuleSelectorProps) => {
  return (
    <QuizModuleQuery query={quizModuleQuery}>
      {({ loading, error, data }) => {
        return (
          <>
            <SelectStyled
              displayEmpty
              onChange={e => onChange(e.target.value)}
              value={value || ''}
              name={name}
              renderValue={(selected: string) => {
                if (selected.length === 0) {
                  return (
                    <FormattedMessage
                      id="app.form.quizModuleIds"
                      defaultMessage="Quiz Module Names"
                      description="Label for a field that is used to select a quiz template id"
                    />
                  );
                }
                return selected;
              }}
            >
              {data.quizModules.map(module => (
                <MenuItem
                  key={module.name.defaultMessage}
                  value={module.name.defaultMessage}
                >
                  {module.name.defaultMessage}
                </MenuItem>
              ))}
            </SelectStyled>
            {value.length > 0 && (
              <Field
                required
                name="quizTemplateTag"
                component={BulkQuizTemplateFormField as any}
                quizModule={data.quizModules.find(
                  module => module.name.defaultMessage === value
                )}
              />
            )}
          </>
        );
      }}
    </QuizModuleQuery>
  );
};
