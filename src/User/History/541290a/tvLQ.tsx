import React from 'react';
/* eslint-disable no-restricted-imports */
import capitalize from 'lodash/capitalize';
/* eslint-enable no-restricted-imports */
import { FormApi } from 'final-form';

import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { PanelForm } from '../../../../components/ui/PanelForm/PanelForm';
import { FormSection } from '../../../../components/ui/Form/FormSection';
import { FormattedMessage } from 'react-intl';
import { FormTextField } from '../../../../components/ui/Form/FormTextField';
import { FormDomainField } from '../../../../components/ui/Form/FormDomainField';
import { Intl } from '../intl';

import { Field } from '../../../../components/ui/Form/Field';
import { TagSelector, tagToString } from '../../../../components/TagSelector';
import { TagBlacklistSelector } from '../../../../components/TagBlacklistSelector';
import { SelectField } from '../../../../components/SelectField';
import { FormImageUploadField } from '../../../../components/ui/Form/FormImageUploadField';
import { FieldArray } from '../../../../components/ui/Form/FieldArray';
import { Button } from '../../../../components/ui/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import Switch from '@material-ui/core/Switch/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import { GameModeSelector } from '../../../../components/GameModeSelector';
import { ALLOWED_GLOBS } from '../../../../models/organization';
import { CopyTextField } from './CopyTextField';
import {
  Paragraph,
  Title,
} from '../../../../components/ui/Typography/Typography';

import { EOrgEmailEnvironment, EOrgRegion, IQueryOrg } from './models';
import { getScopedFormProps } from '../../lib';

import { TCloudinaryUploadOptions } from '../../../../components/Cloudinary/useCloudinaryWidget';
import { QuestTemplateSelectFormField } from '../../../../components/QuestTemplateSelector/QuestTemplateSelectField';
import { useGetIndustryListQuery } from './__generated__/GetIndustryList.generated';

interface IOrganizationSettingsFormProps {
  organization: IQueryOrg;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (org: Partial<IQueryOrg>, formApi: FormApi) => Promise<any | void>;
}

const onboardingAssetUploadSettings: TCloudinaryUploadOptions = {
  uploadPreset: 'organizationImage',
  maxFileSize: 200000, // 0.2mb
  maxImageWidth: 2000,
  maxImageHeight: 1000,
  cropping: true,
  croppingAspectRatio: null,
  croppingCoordinatesMode: 'custom',
};

const customPluginIconUploadSettings: TCloudinaryUploadOptions = {
  uploadPreset: 'organizationImage',
  maxFileSize: 200000, // 0.2mb
  maxImageWidth: 128,
  maxImageHeight: 128,
  cropping: true,
  croppingAspectRatio: 1,
  croppingCoordinatesMode: 'custom',
};

const formatCert = (cert: string): string => {
  if (!cert) {
    return cert;
  }
  // The regex magic: match any whitespace outside of -----BEGIN CERTIFICATE-----/-----END CERTIFICATE-----
  // The matching relies on stateful regex parsing: we cannot match a space after
  // BEGIN / END with the first rule as we're parsing the secondary rule
  //
  // The check in match just verifies the string is not whitespace.
  // If not, we replace whitespace with newline as we are not parsing the BEGIN / END - block.

  return cert
    .trim()
    .replace(/\s+|-----.*?-----/g, s => (s.charAt(0) === '-' ? s : '\n'));
};

export const OrganizationSettingsForm: React.FC<
  IOrganizationSettingsFormProps
> = props => {
  const { organization } = props;
  const { data: industryData } = useGetIndustryListQuery();
  const getPanelFormProps = getScopedFormProps(props);

  return (
    <React.Fragment>
      <PanelForm
        {...getPanelFormProps([
          'name',
          'emailEnvironment',
          'region',
          'industryId',
          'features',
          'tagBlacklist',
          'spicyModeTagBlacklist',
        ])}
        title="General"
        data-test-id="general-form"
        renderFields={() => (
          <FormSection>
            <FormTextField
              name="name"
              label={<FormattedMessage {...Intl.organizationName} />}
            />
            <Field
              name="emailEnvironment"
              render={({ input }) => (
                <div>
                  <SelectField
                    {...input}
                    label={<FormattedMessage {...Intl.emailEnvironment} />}
                    floatingLabelText={
                      <FormattedMessage {...Intl.emailEnvironment} />
                    }
                    items={Object.values(EOrgEmailEnvironment)}
                    itemToString={capitalize}
                  />
                </div>
              )}
            />
            <Field
              name="region"
              render={({ input }) => (
                <SelectField
                  {...input}
                  label={<FormattedMessage {...Intl.region} />}
                  floatingLabelText={<FormattedMessage {...Intl.region} />}
                  items={[null].concat(Object.values(EOrgRegion))}
                  itemToString={capitalize}
                />
              )}
            />
            <Field
              name="industryId"
              render={({ input }) => (
                <SelectField
                  {...input}
                  label="Industry"
                  floatingLabelText="Industry"
                  items={industryData?.industries.map(i => i.name) || []}
                  itemToString={i => i}
                />
              )}
            />
            <Field
              name="features"
              render={({ input }) => (
                <TagSelector
                  {...input}
                  tagFilter={({ categoryName }) => categoryName === 'features'}
                  selectedItemTextRenderer={tagToString}
                  hintText={
                    <FormattedMessage
                      id="app.components.searchFeatures.hint"
                      defaultMessage="Search features"
                      description="A placeholder shown on an input that can be used to select features"
                    />
                  }
                  floatingLabelText={
                    <FormattedMessage
                      id="app.components.featuresLabel"
                      defaultMessage="Features"
                      description="A label shown on an input that can be used to select features"
                    />
                  }
                  fullWidth
                />
              )}
            />
            <Field
              name="tagBlacklist"
              render={({ input }) => (
                <TagBlacklistSelector {...input} fullWidth />
              )}
            />
            <Field
              name="spicyModeTagBlacklist"
              render={({ input }) => (
                <TagBlacklistSelector
                  {...input}
                  floatingLabelText="Spicy Mode blacklist (ll tags are on by default in Spicy Mode)."
                  fullWidth
                />
              )}
            />
          </FormSection>
        )}
      />
      <PanelForm
        {...getPanelFormProps(['emailDomainMappings'])}
        title="Email domain mappings"
        data-test-id="email-domain-mappings-form"
        renderFields={() => (
          <FormSection>
            <FieldArray
              name="emailDomainMappings"
              renderField={({ fieldName, getRemoveButtonProps }) => (
                <Grid container spacing={8} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <FormDomainField name={`${fieldName}.from`} label="From" />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormDomainField name={`${fieldName}.to`} label="To" />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button {...getRemoveButtonProps()} />
                  </Grid>
                </Grid>
              )}
            />
          </FormSection>
        )}
      />
      <PanelForm
        {...getPanelFormProps([
          'plugin.officejs.allowedDomains',
          'plugin.officejs.forceOnlyClientApis',
        ])}
        title="Office 365 settings"
        data-test-id="office-settings-form"
        renderFields={() => (
          <>
            <FormSection title={'Allowed email servers'}>
              <FieldArray
                name="plugin.officejs.allowedDomains"
                renderField={({ fieldName, getRemoveButtonProps }) => (
                  <Grid container spacing={8} alignItems="center">
                    <Grid item xs={12} md={3}>
                      <FormDomainField
                        name={`${fieldName}.name`}
                        label="Email server address"
                      />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7}>
                      <FormTextField
                        name={`${fieldName}.cert`}
                        label="Certificate"
                        multiline
                        rowsMax={4}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
                      <Button {...getRemoveButtonProps()} />
                    </Grid>
                  </Grid>
                )}
              />
            </FormSection>
            <FormSection title="Plugin API override settings">
              <FormGroup>
                <Field
                  name="plugin.officejs.forceOnlyClientApis"
                  type="checkbox"
                  render={({ input }) => (
                    <FormControlLabel
                      control={
                        <Switch {...input} value="forceOnlyClientApis" />
                      }
                      label="Force to use only client APIs for OfficeJs plugin"
                    />
                  )}
                />
              </FormGroup>
            </FormSection>
          </>
        )}
      />
      <PanelForm
        {...getPanelFormProps([
          'delivery.email.compressGlobs',
          'delivery.email.customHeaders',
          'delivery.email.privateSmtpConnectionString',
          'delivery.email.inlineImages',
          'delivery.email.useReturnPath',
          'delivery.email.customHiddenEmailBodyIdentifier',
        ])}
        title="Email delivery"
        data-test-id="email-delivery-form"
        renderFields={() => (
          <React.Fragment>
            <FormSection>
              <FormGroup>
                <Field
                  name="delivery.email.compressGlobs"
                  type="checkbox"
                  format={(v = []) => !!v.length}
                  parse={v => (v ? ALLOWED_GLOBS : [])}
                  render={({ input }) => (
                    <FormControlLabel
                      control={<Switch {...input} value="compressGlobs" />}
                      label="Compress attachments"
                    />
                  )}
                />
                <Field
                  name="delivery.email.inlineImages"
                  type="checkbox"
                  format={v => !!v}
                  render={({ input }) => (
                    <FormControlLabel
                      control={<Switch {...input} value="inlineImages" />}
                      label="Inline images"
                    />
                  )}
                />
                <Field
                  name="delivery.email.useReturnPath"
                  type="checkbox"
                  format={v => !!v}
                  render={({ input }) => (
                    <FormControlLabel
                      control={<Switch {...input} value="useReturnPath" />}
                      label="Use Return Path"
                    />
                  )}
                />
              </FormGroup>
              <FormTextField
                name="delivery.email.privateSmtpConnectionString"
                multiline
                label={
                  <FormattedMessage {...Intl.privateSmtpConnectionString} />
                }
              />
            </FormSection>
            <FormSection title="Custom email headers">
              <FieldArray
                name="delivery.email.customHeaders"
                renderField={({ fieldName, getRemoveButtonProps }) => (
                  <Grid container spacing={8} alignItems="center">
                    <Grid item xs={12} md={3}>
                      <FormTextField name={`${fieldName}.key`} label="Name" />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7}>
                      <FormTextField
                        name={`${fieldName}.value`}
                        label="Value"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
                      <Button {...getRemoveButtonProps()} />
                    </Grid>
                  </Grid>
                )}
              />
            </FormSection>
            <FormSection>
              <FormTextField
                name="delivery.email.customHiddenEmailBodyIdentifier"
                label={
                  <FormattedMessage {...Intl.customHiddenEmailBodyIdentifier} />
                }
              />
            </FormSection>
          </React.Fragment>
        )}
      />
      <PanelForm
        {...getPanelFormProps([
          'sso.enabled',
          'sso.endPoint',
          'sso.providerName',
          'sso.cert',
          'sso.privateCert',
          'sso.identifierFormat',
          'sso.disableIdentifierFormat',
        ])}
        title="Single sign-on"
        data-test-id="sso-form"
        renderFields={() => (
          <FormSection>
            <Field
              name="sso.enabled"
              type="checkbox"
              render={({ input }) => (
                <FormControlLabel
                  control={<Switch {...input} value="ssoEnabled" />}
                  label={input.checked ? 'Enabled' : 'Disabled'}
                />
              )}
            />
            <CopyTextField
              text={`${window.location.origin}/saml/consume/${organization._id}`}
              label={<FormattedMessage {...Intl.samlConsumerUrl} />}
            />
            <FormTextField name="sso.endPoint" label="EndPoint" />
            <FormTextField name="sso.providerName" label="Provider Name" />
            <FormTextField
              name="sso.cert"
              label="Cert"
              formatOnBlur
              format={formatCert}
            />
            <FormTextField
              name="sso.privateCert"
              label="Private Cert"
              formatOnBlur
              format={formatCert}
            />
            <FormTextField
              name="sso.identifierFormat"
              label="Identifier Format"
            />
            <FormGroup>
              <Field
                name="sso.disableIdentifierFormat"
                type="checkbox"
                render={({ input }) => (
                  <FormControlLabel
                    control={
                      <Switch {...input} value="disableIdentifierFormat" />
                    }
                    label="Disable Identifier Format"
                  />
                )}
              />
            </FormGroup>
          </FormSection>
        )}
      />
      <PanelForm
        {...getPanelFormProps([
          'game.defaultGameMode',
          'game.active',
          'game.allowAnyoneToJoin',
          'game.usersAreAnonymousByDefault',
          'game.firstQuestTag',
        ])}
        title="Game settings"
        data-test-id="game-settings-form"
        renderFields={() => (
          <FormSection>
            <Field
              name="game.defaultGameMode"
              label={<FormattedMessage {...Intl.orgDefaultGameMode} />}
              render={({ input }) => <GameModeSelector {...input} />}
            />
            <FormGroup>
              <Field
                name="game.active"
                type="checkbox"
                render={({ input }) => (
                  <FormControlLabel
                    control={<Switch {...input} value="gameActive" />}
                    label="Game active"
                  />
                )}
              />
              <Field
                name="game.allowAnyoneToJoin"
                type="checkbox"
                render={({ input }) => (
                  <FormControlLabel
                    control={
                      <Switch {...input} value="gameAllowAnyoneToJoin" />
                    }
                    label="Anyone can join"
                  />
                )}
              />
              <Field
                name="game.usersAreAnonymousByDefault"
                type="checkbox"
                render={({ input }) => (
                  <FormControlLabel
                    control={
                      <Switch {...input} value="usersAreAnonymousByDefault" />
                    }
                    label="Users are anonymous by default"
                  />
                )}
              />
            </FormGroup>
            <FormGroup style={{ paddingBottom: '16px' }}>
              <FormLabel component="p">
                <FormattedMessage {...Intl.orgFirstQuestTagExplanation} />
              </FormLabel>
              <Field
                name="game.firstQuestTag"
                render={({ input }) => (
                  <QuestTemplateSelectFormField
                    input={input}
                    label={<FormattedMessage {...Intl.orgFirstQuestTagLabel} />}
                    itemFilter={{ tag_starts_with: 'hox.quest.bootcamp.0' }}
                    autoComplete={false}
                  />
                )}
              />
            </FormGroup>
          </FormSection>
        )}
      />
      <PanelForm
        {...getPanelFormProps(['askNPSSurvey', 'hideZendeskWidget'])}
        title="Other settings"
        data-test-id="other-settings-form"
        renderFields={() => (
          <FormSection>
            <FormGroup>
              <Field
                name="askNPSSurvey"
                type="checkbox"
                render={({ input }) => (
                  <FormControlLabel
                    control={<Switch {...input} value="askNPSSurvey" />}
                    label="Ask NPS survey"
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Field
                name="hideZendeskWidget"
                type="checkbox"
                render={({ input }) => (
                  <FormControlLabel
                    control={<Switch {...input} value="hideZendeskWidget" />}
                    label="Hide Zendesk Widget"
                  />
                )}
              />
            </FormGroup>
          </FormSection>
        )}
      />
      <PanelForm
        {...getPanelFormProps(['results.customEmailDisclaimer'])}
        title="Result settings"
        data-test-id="results-settings-form"
        renderFields={() => (
          <FormSection>
            <FormGroup>
              <FormTextField
                name="results.customEmailDisclaimer"
                multiline
                label={<FormattedMessage {...Intl.customEmailDisclaimer} />}
              />
            </FormGroup>
          </FormSection>
        )}
      />
      <PanelForm
        {...getPanelFormProps([
          'automaticEnrollmentSettings.enabled',
          'automaticEnrollmentSettings.useForcedStart',
        ])}
        title="Automatic enrollment settings"
        data-test-id="automatic-enrollment-settings-form"
        description="If this feature is enabled, the game is automatically
                started for all eligible users on every Wednesday 14:00"
        renderFields={() => (
          <FormSection>
            <FormGroup>
              <Field
                name="automaticEnrollmentSettings.enabled"
                type="checkbox"
                render={({ input }) => (
                  <FormControlLabel
                    control={<Switch {...input} value="enabled" />}
                    label="Automatic enrollment of users"
                  />
                )}
              />
              <Field
                name="automaticEnrollmentSettings.useForcedStart"
                type="checkbox"
                render={({ input }) => (
                  <FormControlLabel
                    control={<Switch {...input} value="useForcedStart" />}
                    label="Use forced start"
                  />
                )}
              />
            </FormGroup>
          </FormSection>
        )}
      />
      <PanelForm
        {...getPanelFormProps([
          'plugin.removeThreatAfterReporting',
          'plugin.removeSimulationAfterReporting',
        ])}
        title="After reporting removal settings"
        description="These settings are only applicable for the most recent plugin api version beta. Note that removal always happens when reported as spam. If 'Report to platform' is enabeld threats are removed regardless."
        data-test-id="plugin-settings-form"
        renderFields={() => (
          <FormSection>
            <FormGroup>
              <Field
                name="plugin.removeThreatAfterReporting"
                type="checkbox"
                render={({ input }) => (
                  <FormControlLabel
                    control={
                      <Switch {...input} value="removeThreatAfterReporting" />
                    }
                    label="Remove threat after reporting"
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Field
                name="plugin.removeSimulationAfterReporting"
                type="checkbox"
                render={({ input }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        {...input}
                        value="removeSimulationAfterReporting"
                      />
                    }
                    label="Remove simulation after reporting"
                  />
                )}
              />
            </FormGroup>
          </FormSection>
        )}
      />
      <PanelForm
        {...getPanelFormProps([
          'images.logo',
          'images.useCustomGameLogo',
          'images.customGameLogo',
          'images.useCustomOnboardingAssets',
          'images.logoEmail',
          'images.buttonLocationFirstQuest',
          'images.buttonLocationInvite',
          'images.buttonLocationWelcome',
          'images.customPluginIcon',
        ])}
        title="Assets"
        description="General assets used in onboarding or simulations"
        data-test-id="assets-settings-form"
        renderFields={({ form }) => (
          <FormSection>
            <FormImageUploadField
              name="images.logo"
              label="Organization's logo used for simulations."
              imageName={organization._id}
            />

            <FormGroup style={{ padding: '30px 0 0' }}>
              <Field
                name="images.useCustomGameLogo"
                type="checkbox"
                render={({ input }) => (
                  <FormControlLabel
                    control={
                      <Switch {...input} value="images.useCustomGameLogo" />
                    }
                    label="Use custom logo in Game -app"
                  />
                )}
              />
            </FormGroup>
            {form.getState().values?.images?.useCustomGameLogo && (
              <>
                <div>
                  <Title>Tutorial how to format image</Title>
                  <Paragraph>
                    1. Use White or Light coloured logo -asset
                  </Paragraph>
                  <Paragraph>
                    2. Keep aspect ratio between 1:1 and 1:2, meaning for
                    example 100px height / 100px width and 100px height / 200px
                    width
                  </Paragraph>
                  <Paragraph>3. Use transparent .png file</Paragraph>
                  <Paragraph>4. Keep image size below 30kb</Paragraph>
                </div>
                <FormImageUploadField
                  name="images.customGameLogo"
                  label="Organizations logo used next to Hoxhunt -logo in Game -application."
                  imageName={`${organization._id}-logo_game_app`}
                />
              </>
            )}

            <FormGroup style={{ padding: '30px 0 0' }}>
              <Field
                name="images.useCustomOnboardingAssets"
                type="checkbox"
                render={({ input }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        {...input}
                        value="images.useCustomOnboardingAssets"
                      />
                    }
                    label="Use custom onboarding assets"
                  />
                )}
              />
            </FormGroup>
            {form.getState().values?.images?.useCustomOnboardingAssets && (
              <>
                <FormImageUploadField
                  name="images.logoEmail"
                  label="Organization Logo which is used next to Hoxhunt Logo on our messages, including Welcome Email."
                  imageName={`${organization._id}-logo_email`}
                />
                <br />
                <FormImageUploadField
                  uploadSettings={onboardingAssetUploadSettings}
                  name="images.buttonLocationFirstQuest"
                  label="Image to show where to find Hoxhunt Button, used Bootcamp 0 Email heading section."
                  imageName={`${organization._id}-button_location_first_quest`}
                />
                <FormImageUploadField
                  uploadSettings={onboardingAssetUploadSettings}
                  name="images.buttonLocationInvite"
                  label="Image to show where to find Hoxhunt Button, used in Invitation Email heading section."
                  imageName={`${organization._id}-button_location_invite`}
                />
                <br />
                <FormImageUploadField
                  uploadSettings={onboardingAssetUploadSettings}
                  name="images.buttonLocationWelcome"
                  label="Image to show where to find Hoxhunt Button, used in Welcome Email heading section."
                  imageName={`${organization._id}-button_location_welcome`}
                />
              </>
            )}
            <FormImageUploadField
              uploadSettings={customPluginIconUploadSettings}
              name="images.customPluginIcon"
              label="Organization's custom plugin logo. For now, logo must also be uploaded normally to plugin frontend. Icon size should be 128 x 128."
              imageName={`${organization._id}-customPluginIcon-128`}
            />
          </FormSection>
        )}
      />
    </React.Fragment>
  );
};
