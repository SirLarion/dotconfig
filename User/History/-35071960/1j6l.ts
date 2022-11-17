  query GetImpersonateUsersList(
    $limit: Int!
    $skip: Int!
    $sort: [User_sort]
    $organizationId: ID!
    $email: String
    $search: String
  ) {
    organizations(first: 1, filter: { _id_eq: $organizationId }) {
      _id
      usersConnection(
        first: $limit
        skip: $skip
        sort: $sort
        filter: { emails__address_starts_with: $email }
        search: $search
      ) {
        nodes {
          _id
          status
          organizationName
          emails {
            address
          }
          roles
          profile {
            firstName
            lastName
          }
          game {
            mode
            active
          }
          player {
            stars
            stats {
              success
              failureRate
              last10Quests
            }
          }
        }
      }
    }
  }