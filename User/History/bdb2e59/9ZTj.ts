import {
  ContextOrganization,
  ContextPerson,
  ContextTheme,
  ContextWebService,
} from '@server/api/graphql/schema/context';

export const Domain = `
# Domain
type Domain {
    # Domain e.g. hox.com
    name: String!
    # Default UI Language for new users in org
    defaultUiLanguage: String
    # Default simulation languages for new users in org
    defaultSimulationLanguages: [String!]
    # Allowed simulation languages for all users in org
    allowedSimulationLanguages: [String!]
    # Context tied to the domain
    context: OrgDomainContext
  }
`;

export const DomainInput = `
  # Domain input
  input DomainInput {
    # Domain e.g. hox.com
    name: String
    # Default UI Language for new users in org
    defaultUiLanguage: String
    # Default simulation languages for new users in org
    defaultSimulationLanguages: [String]
    # Allowed simulation languages for all users in org
    allowedSimulationLanguages: [String]
    # Context tied to the domain
    context: OrgDomainContextInput
  }
`;

export const DomainMutationResult = `
  type DomainMutationResult implements MutationResult {
    data: Domain
    errors: [MutationError!]!
  }
`;

export default () => [
  Domain,
  DomainInput,
  DomainMutationResult,
  ContextOrganization,
  ContextWebService,
  ContextTheme,
  ContextPerson,
];
