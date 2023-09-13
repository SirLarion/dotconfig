import React, { FC, useState } from 'react';

import { Industry } from '@hox/frontend-utils/src/types/graphql.generated';

import { SelectField } from '../SelectField';
import { useGetIndustryListQuery } from './__generated__/GetIndustryList.generated';
import { SetOrgIndustryMutation, SetOrgIndustryMutationVariables, useSetOrgIndustryMutation } from './__generated__/SetOrgIndustry.generated';
import { PanelForm } from '../ui/PanelForm/PanelForm';
import {
  mapGqlErrorsToFormErrors,
  resolveFormErrors,
} from '../../utils/formHelpers';
import { Mutation } from '../../utils/apollo';

export class OrganizationSettingsMutation extends Mutation<
  SetOrgIndustryMutation,
  SetOrgIndustryMutationVariables
> {}

interface IIndustryFormProps {
  organizationId: string;
  initialIndustry?: Industry;
}

export const IndustryForm: FC<IIndustryFormProps> = ({
  organizationId,
  initialIndustry,
}) => {
  const [selected, setSelected] = useState(initialIndustry?.name || '');
  const { data, error } = useGetIndustryListQuery();

  const [mutate, { loading }] = useSetOrgIndustryMutation();

  const industries = data?.industryConnection?.nodes || [];
  const industryNames = industries.map(({ name }) => name);

  const getSelectedIndustryId = industries.find(({ name }) => name === selected)._id;
  const handleSubmit = async () => {
    const industryId = 

    if (industryId) {
      mutate({ variables: { organizationId, industryId } })
        .catch(mapGqlErrorsToFormErrors)
        .then(resolveFormErrors);
    }
  };

  return (
    <Mutation>
      {mutate => (
        <PanelForm
          title="Industry"
          onSubmit={handleSubmit(mutate)} 
          renderFields={() => (
            <SelectField
              value={selected}
              items={industryNames}
              onChange={name => setSelected(name)}
              itemToString={i => i}
              errorText={error}
            />
          )}
        />
      )}
    </Mutation>
  );
};
