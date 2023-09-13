import React from 'react';
import { ImportUsersMutation } from '../../modules/AddUsers/ImportUsersMutation';
import { UploadUsersCsvDocument } from './__generated__/UploadUsersCsv.generated';
import Grid from '@material-ui/core/Grid/Grid';
import { OrganizationSelector } from '../../components/OrganizationSelector/OrganizationSelectorContainer';
import { FormattedMessage } from 'react-intl';
import { FileInput } from '../../components/FileInput/FileInput';
import { Button } from '../../components/ui/Button/Button';
import { StatefulContainer } from '../../components/StatefulContainer';
import { FormErrorSection } from '../../components/ui/Form/FormErrorSection';

interface IImportUsersSetupProps {
  onImportStart: (importTaskGroupId: string) => void;
}

const getImportButtonLabel = (loading, state) => {
  if (loading) {
    return (
      <FormattedMessage
        id="app.components.importUsers.buttonLoadingLabel"
        defaultMessage="Starting import"
        description="Label shown on a button that starts a user import process, while waiting for the process to start"
      />
    );
  }

  return (
    <FormattedMessage
      id="app.components.importUsers.buttonLabel"
      defaultMessage="Import"
      description="Label shown on a button that starts a user import process."
    />
  );
};

export const ImportUsersSetup: React.SFC<IImportUsersSetupProps> = ({
  onImportStart,
}) => (
  <StatefulContainer>
    {(state, setState) => (
      <ImportUsersMutation mutation={UploadUsersCsvDocument}>
        {(mutate, { loading }) => (
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <OrganizationSelector
                value={state.organizationId}
                onChange={organizationId => setState({ organizationId })}
                floatingLabelText={
                  <FormattedMessage
                    id="app.form.organizationLabel"
                    defaultMessage="Organization"
                    description="Label for a field that is used to select an organization"
                  />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FileInput
                id="user-csv-import-file-selector"
                value={state.file}
                onFilesChanged={([newFile]) => setState({ file: newFile })}
                inputProps={{
                  accept: '.csv',
                }}
                ButtonProps={{
                  color: 'secondary',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                data-test-id="csv-import-button"
                disabled={loading || !state.file || !state.organizationId}
                color="secondary"
                onClick={() =>
                  mutate({
                    variables: {
                      file: state.file,
                      organizationId: state.organizationId,
                    },
                  })
                    .then(result => {
                      if (result) {
                        onImportStart(result.data.uploadUsersCsv._id);
                        setState({ file: undefined, errorMessage: undefined });
                      }
                    })
                    .catch(error => {
                      setState({ errorMessage: error.message });
                    })
                }
              >
                {getImportButtonLabel(loading, state)}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <FormErrorSection
                hasErrors={state.errorMessage !== undefined}
                errors={[state.errorMessage]}
              />
            </Grid>
          </Grid>
        )}
      </ImportUsersMutation>
    )}
  </StatefulContainer>
);
