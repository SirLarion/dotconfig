import { gql } from '@apollo/client';

export const GET_CURRENT_ORGANIZATION_DEFAULT_SETTINGS_QUERY = gql`
  query CurrentUserOrganizationDefaultSettingsQuery {
    currentUser {
      _id
      organization {
        _id
        game {
          defaultGameMode
          usersAreAnonymousByDefault
        }
        domains {
          name
          defaultUiLanguage
          defaultSimulationLanguages
          allowedSimulationLanguages
        }
      }
    }
  }
`;
