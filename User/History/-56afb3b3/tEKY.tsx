import React, { FC, useState } from 'react';

import { Industry } from '@hox/frontend-utils/src/types/graphql.generated';

import { SelectField } from '../SelectField';
import { useGetIndustryListQuery } from './__generated__/GetIndustryList.generated';
import { useSetOrgIndustryMutation } from './__generated__/SetOrgIndustry.generated';

interface IIndustryFormProps {
  organizationId: string;
  initialIndustry?: Industry;
}

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
    <SelectField
      label="Industry"
      floatingLabelText="Industry"
      value={selected}
      items={industryNames}
      onChange={handleChangeSelected}
      itemToString={i => i}
      {...restProps}
    />
  );
};
