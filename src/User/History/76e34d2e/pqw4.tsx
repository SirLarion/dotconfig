import React from 'react';
import { FormRenderProps, FormProps } from 'react-final-form';
import {
  Panel,
  PanelHeader,
  PanelContent,
} from '../../../components/ui/Panel/Panel';
import { Form } from '../../../components/ui/Form/Form';
import { SaveButton } from '../../../components/ui/SaveButton/SaveButton';
import setFieldData from 'final-form-set-field-data';
import arrayMutators from 'final-form-arrays';
import { createStyleProvider } from '../../../components/ui/Style/createStyled';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { FormErrorSection } from '../../../components/ui/Form/FormErrorSection';

export type TRenderProps = FormRenderProps;

export interface IPanelFormProps extends FormProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  renderFields?: (props: TRenderProps) => React.ReactNode;
  renderFooter?: (props: TRenderProps) => React.ReactNode;
}

const FooterStyle = ({ spacing }: Theme) =>
  createStyles({
    root: {
      marginTop: spacing(3),
    },
  });

const StyleProvider = createStyleProvider(FooterStyle);

export const defaultRenderFooter = ({
  submitting,
  invalid,
  submitError,
  hasSubmitErrors,
}: TRenderProps) => (
  <StyleProvider>
    {style => (
      <div className={style.classes.root}>
        <SaveButton
          type="submit"
          disabled={submitting || (invalid && !hasSubmitErrors)}
          isSaving={submitting}
          hasSaveErrors={hasSubmitErrors}
        />
      </div>
    )}
  </StyleProvider>
);

export const defaultMutators = {
  setFieldData,
  ...arrayMutators,
};

export const PanelForm: React.SFC<IPanelFormProps> = ({
  title,
  description,
  renderFooter = defaultRenderFooter,
  renderFields,
  mutators = defaultMutators,
  ...formProps
}) => (
  <Panel>
    <PanelHeader title={title} subTitle={description} />
    <PanelContent>
      <Form
        {...formProps}
        mutators={mutators}
        render={renderProps => {
          console.log(renderProps);
          return (
            <form onSubmit={renderProps.handleSubmit}>
              {renderFields && renderFields(renderProps)}
              <FormErrorSection
                hasErrors={renderProps.hasSubmitErrors}
                errors={[renderProps.submitError]}
              />
              {renderFooter && renderFooter(renderProps)}
            </form>
          );
        }}
      />
    </PanelContent>
  </Panel>
);
