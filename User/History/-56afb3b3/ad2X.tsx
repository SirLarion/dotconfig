import React, { FC, useState } from 'react';

import { Industry } from '@hox/frontend-utils/src/types/graphql.generated';

import { SelectField } from '../SelectField';
import { useGetIndustryListQuery } from './__generated__/GetIndustryList.generated';
import { useSetOrgIndustryMutation } from './__generated__/SetOrgIndustry.generated';
import { PanelForm } from '../ui/PanelForm/PanelForm';
import { createStyles } from '@material-ui/core';
import { SaveButton } from '../ui/SaveButton/SaveButton';

interface IIndustryFormProps {
  organizationId: string;
  initialIndustry?: Industry;
}

// const FooterStyle = ({ spacing }: Theme) =>
//   createStyles({
//     root: {
//       marginTop: spacing(3),
//     },
//   });

// const StyleProvider = createStyleProvider(FooterStyle);

// export const defaultRenderFooter = ({
//   submitting,
//   invalid,
//   submitError,
//   hasSubmitErrors,
// }: TRenderProps) => (
//   <StyleProvider>
//     {style => (
//       <div className={style.classes.root}>
//         <SaveButton
//           type="submit"
//           disabled={submitting || (invalid && !hasSubmitErrors)}
//           isSaving={submitting}
//           hasSaveErrors={hasSubmitErrors}
//         />
//       </div>
//     )}
//   </StyleProvider>
// );

export const IndustryForm: FC<IIndustryFormProps> = ({
  organizationId,
  initialIndustry,
  ...restProps
}) => {
  const [selected, setSelected] = useState(initialIndustry?.name || '');
  const { data, error } = useGetIndustryListQuery();

  const [mutate, { loading }] = useSetOrgIndustryMutation();

  const industries = data?.industryConnection?.nodes || [];
  const industryNames = industries.map(({ name }) => name);

  const handleSubmit = () => {
    if (!loading) {
      const industryId = industries.find(({ name }) => name === selected)._id;

      if (industryId) {
        return mutate({ variables: { organizationId, industryId } });
      }
    }
  };

  return (
    <PanelForm
      title="Industry"
      onSubmit={handleSubmit}
      renderFields={() => (
        <SelectField
          value={selected}
          items={industryNames}
          onChange={name => setSelected(name)}
          itemToString={i => i}
          errorText={error}
          {...restProps}
        />
      )}
    />
  );
};
