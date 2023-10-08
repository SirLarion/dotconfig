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