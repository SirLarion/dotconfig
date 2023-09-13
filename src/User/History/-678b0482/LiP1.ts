import { graphql } from '@apollo/client/react/hoc';
import { mapProps } from 'recompose';
import compose from 'lodash/flowRight';
import { createFieldComponent } from '../../utils/reduxFormHelpers';
import { GetSelectorOrganizationsDocument } from './__generated__/GetSelectorOrganizations.generated';

import {
  IOrganizationSelectorProps,
  IOrganizationSelectorViewProps,
} from './models';
import { OrganizationSelectorView } from './OrganizationSelectorView';

interface IOrganizationQueryOptsProps {
  data?: {
    loading?: boolean;
    organizations?: any[];
  };
}

const organizationQueryOpts = {
  props: ({
    data: { loading = false, organizations = [] } = {},
  }: IOrganizationQueryOptsProps) => {
    return {
      isLoading: loading,
      organizations,
    };
  },
};

const byId = id => organization => organization._id === id;

const mapSelectFieldProps = ({
  onChange,
  value,
  mapNewValue,
  ...rest
}: IOrganizationSelectorProps &
  IGraphQlProps): IOrganizationSelectorViewProps => {
  const selectedOrg = value && rest.organizations.find(byId(value));

  return {
    ...rest,
    onChange: (e, i, orgId) =>
      onChange(
        mapNewValue ? mapNewValue(rest.organizations.find(byId(orgId))) : orgId
      ),
    value: selectedOrg ? selectedOrg._id : value,
  };
};

type IQueryResult = Pick<IOrganizationSelectorViewProps, 'organizations'>;

type IGraphQlProps = Pick<
  IOrganizationSelectorViewProps,
  'isLoading' | 'organizations'
>;

export const OrganizationSelector = compose(
  graphql<IOrganizationSelectorProps, IQueryResult, {}, IGraphQlProps>(
    GetSelectorOrganizationsDocument,
    organizationQueryOpts
  ),
  mapProps(mapSelectFieldProps)
)(OrganizationSelectorView);

export const OrganizationSelectorReduxForm =
  createFieldComponent(OrganizationSelector);
