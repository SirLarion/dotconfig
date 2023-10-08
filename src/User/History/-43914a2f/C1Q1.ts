  fragment ContextOrganizationFieldsFragment on ContextOrganization {
    name
    url
    fakeUrl
    fakeUrls
    fakeUrlPostfix
    postAddress {
      street
      postCode
      city
    }
    theme {
      mainColor
      logo {
        url
      }
    }
  }

  fragment WebserviceFieldsFragment on ContextWebService {
    name
    url
    fakeUrl
  }

  fragment PersonFieldsFragment on ContextPerson {
    name
    email
  }