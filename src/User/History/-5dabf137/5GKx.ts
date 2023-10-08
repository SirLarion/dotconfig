  fragment OrganizationFeatures on Organization {
    features {
      ...TagFields
    }
  }

  fragment OrganizationIncidentPolicySettings on IncidentPolicySettings {
    policyName
    enabled
    requireMaliciousHoxhuntRating
    useCustomEmailTemplate
    emailTemplate {
      subject
      body
    }
  }

  fragment OrganizationThreatSettings on Organization {
    sendThreatFeedback
    pluginRedirect {
      uploadThreats
      redirectPhish
      phishRedirectAddresses
      redirectSpam
      spamRedirectAddresses
    }
    notifications {
      threatEscalationEmails
    }
    threatSettings {
      reportToPlatform
      allowPlatformVendorDataUsage
      threatAnalysisPriority
    }
  }

  fragment OrganizationDomainContext on OrgDomainContext {
    organization {
      ...ContextOrganizationFieldsFragment
    }
    telecomOperator {
      ...ContextOrganizationFieldsFragment
    }
    webmail {
      ...WebserviceFieldsFragment
    }
    persons {
      hr {
        ...PersonFieldsFragment
      }
      ceo {
        ...PersonFieldsFragment
      }
    }
  }