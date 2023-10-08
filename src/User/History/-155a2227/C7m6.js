import { graphql } from '@apollo/client/react/hoc';

import { GetOrganizationsDocument } from './__generated__/GetOrganizations.generated';
import { compose } from '../../components/higherOrderComponents';
import MultiSelect from '../../components/MultiSelect';

const getOrgIdMap = organizations => {
  return organizations.reduce(
    (result, org) => ({ ...result, [org._id]: org.name }),
    {}
  );
};

const mapQueryResultToProps = ({ data: { loading, organizations } }) => {
  const organizationItems = organizations || [];
  const organizationsMap = getOrgIdMap(organizationItems);
  const itemToString = orgId => organizationsMap[orgId];
  return {
    isLoading: loading,
    items: organizationItems.map(o => o._id),
    itemToString,
  };
};

export default compose(
  graphql(GetOrganizationsDocument, { props: mapQueryResultToProps })
)(MultiSelect);