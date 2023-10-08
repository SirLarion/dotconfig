import React, { FC, useState } from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

import { Industry } from '@hox/frontend-utils/src/types/graphql.generated';

import { createStyleProvider } from '../ui/Style/createStyled';
import { SaveButton } from '../ui/SaveButton/SaveButton';
import { SelectField } from '../SelectField';
import { useGetIndustryListQuery } from './__generated__/GetIndustryList.generated';
import { useSetOrgIndustryMutation } from './__generated__/SetOrgIndustry.generated';
import { Panel, PanelContent, PanelHeader } from '../ui/Panel/Panel';

interface IIndustryFormProps {
  organizationId: string;
  initialIndustry?: Industry;
}

const FooterStyle = ({ spacing }: Theme) =>
  createStyles({
    root: {
      marginTop: spacing(3),
    },
  });

const StyleProvider = createStyleProvider(FooterStyle);

export const IndustryForm: FC<IIndustryFormProps> = ({
  organizationId,
  initialIndustry,
  ...restProps
}) => {
  const [selected, setSelected] = useState(initialIndustry?.name || '');
  const [saved, setSaved] = useState(true);
  const { data } = useGetIndustryListQuery();

  const [mutate, { loading, error }] = useSetOrgIndustryMutation();

  const industries = data?.industryConnection?.nodes || [];
  const industryNames = industries.map(({ name }) => name);

  const handleSubmit = () => {
    if (!loading) {
      const industryId = industries.find(({ name }) => name === selected)._id;
      mutate({
        variables: { organizationId, industryId },
      });
    }
  };

  return (
    <StyleProvider>
      {style => (
        <Panel>
          <PanelHeader title="Industry" />
          <PanelContent>
            <SelectField
              label="Industry"
              floatingLabelText="Industry"
              value={selected}
              items={industryNames}
              onChange={name => setSelected(name)}
              itemToString={i => i}
              {...restProps}
            />
            <div className={style.classes.root}>
              <SaveButton
                onClick={() => setSaved(false)}
                type="submit"
                disabled={loading}
                isSaving={saved}
                hasSaveErrors={!!error}
              />
            </div>
          </PanelContent>
        </Panel>
      )}
    </StyleProvider>
  );
};