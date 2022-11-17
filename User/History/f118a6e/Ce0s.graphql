  fragment QuestTemplateFields on QuestTemplate {
    _id
    tag
    isActive
    valid
    internalNotes
    softDeletedAt
    attributes {
      language
      difficultyEstimate
      validFrom
      validTo
      forOrganizations
      forUsers
      forCountries
      recurrence {
        freq
        bymonth
        byweekno
      }
    }
    tags {
      name
      categoryName
    }
    emailTemplate {
      markers {
        from {
          ...MarkerFields
        }
        general {
          ...MarkerFields
        }
        subject {
          ...MarkerFields
        }
        attachment {
          ...MarkerFields
        }
        embedded {
          ...MarkerFields
        }
      }
      email {
        subject
        from {
          address
          name
        }
        attachments {
          filename
          path
          content
          doZip
          isLink
        }
        html
      }
      translations {
        ...IcuFields
      }
    }
  }
