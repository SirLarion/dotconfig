import React, { FC, useState } from 'react';

import { Industry } from '@hox/frontend-utils/src/types/graphql.generated';

import { SelectField } from '../SelectField';
import { useGetIndustryListQuery } from './__generated__/GetIndustryList.generated';
import {
  SetOrgIndustryDocument,
  SetOrgIndustryMutation,
  SetOrgIndustryMutationVariables,
} from './__generated__/SetOrgIndustry.generated';
import { PanelForm } from '../ui/PanelForm/PanelForm';
import {
  mapGqlErrorsToFormErrors,
  resolveFormErrors,
} from '../../utils/formHelpers';
import { Mutation } from '../../utils/apollo';
import { MutationFunction } from '@apollo/client';

class IndustryMutation extends Mutation<
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

  const industries = data?.industryConnection?.nodes || [];
  const industryNames = industries.map(({ name }) => name);

  const handleSubmit = (mutate: MutationFunction) =>
    mutate({
      variables: {
        organizationId,
        industryId: industries.find(({ name }) => name === selected)?._id || '',
      },
    })
      .catch(mapGqlErrorsToFormErrors)
      .then(resolveFormErrors);

  return (
    <IndustryMutation mutation={SetOrgIndustryDocument}>
      {mutate => (
        <PanelForm
          title="Industry"
          onSubmit={() => handleSubmit(mutate)}
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
    </IndustryMutation>
  );
};