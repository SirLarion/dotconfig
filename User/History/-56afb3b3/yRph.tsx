import React, { FC, useState } from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

import { Industry } from '@hox/frontend-utils/src/types/graphql.generated';

import { createStyleProvider } from '../Style/createStyled';
import { SaveButton } from '../SaveButton/SaveButton';
import { SelectField } from '../SelectField';
import { useGetIndustryListQuery } from './__generated__/GetIndustryList.generated';
import { useSetOrgIndustryMutation } from './__generated__/SetOrgIndustry.generated';
import { Panel, PanelContent, PanelHeader } from '../ui/Panel/Panel';

interface IIndustryFormProps {
  organizationId: string;
  initialIndustry?: Industry;
}

const FooterStyle = ({ spacing }: ThemkK) =>
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

export const IndustryForm: FC<IIndustryFormProps> = ({
  organizationId,
  initialIndustry,
  ...restProps
}) => {
  const [selected, setSelected] = useState(initialIndustry?.name || '');
  const { data } = useGetIndustryListQuery();

  const [mutate, { loading }] = useSetOrgIndustryMutation();

  const industries = data?.industryConnection?.nodes || [];
  const industryNames = industries.map(({ name }) => name);

  const handleChangeSelected = (industryName: string) => {
    if (!loading) {
      setSelected(industryName);

      const industryId = industries.find(
        ({ name }) => name === industryName
      )._id;
      mutate({
        variables: { organizationId, industryId },
      });
    }
  };

  return (
    <Panel>
      <PanelHeader title="Industry" />
      <PanelContent>
        <SelectField
          label="Industry"
          floatingLabelText="Industry"
          value={selected}
          items={industryNames}
          onChange={handleChangeSelected}
          itemToString={i => i}
          {...restProps}
        />
      </PanelContent>
    </Panel>
  );
};
