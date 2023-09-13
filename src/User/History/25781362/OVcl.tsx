import React from 'react';
import { Enzyme } from '../../../../../npm/Enzyme';
import {
  getContext,
  getThemeContextDef,
  getApolloContextDef,
  mountWithIntl,
  getSchema,
  matchTestId,
  timeout,
} from '../../../../../utils/testUtils';

import { OrganizationSettings } from '../OrganizationSettings';
import { OrganizationSettingsForm } from '../OrganizationSettingsForm';
import {
  IQueryOrg,
  EUserGameMode,
  EOrgEmailEnvironment,
  EOrgRegion,
} from '../models';

jest.mock('../../../../../utils/config', () => {});

const formTestIds = [
  'general-form',
  'email-domain-mappings-form',
  'office-settings-form',
  'email-delivery-form',
  'sso-form',
  'game-settings-form',
  'other-settings-form',
  'results-settings-form',
  'plugin-settings-form',
  'assets-settings-form',
];

const setup = async (
  overrides = {
    updateSpy: () => {},
    props: {},
  }
) => {
  const schema = getSchema({
    resolvers: {
      RootQuery: {
        organizations: (): IQueryOrg[] => [
          {
            _id: 'mockId',
            name: 'org',
            region: EOrgRegion.EUROPE,
            emailEnvironment: EOrgEmailEnvironment.MICROSOFT,
            tagBlacklist: [{ categoryName: 'cat', name: 'name' }],
            spicyModeTagBlacklist: [],
            features: [{ categoryName: 'features', name: 'feat' }],
            sendThreatFeedback: true,
            askNPSSurvey: true,
            hideZendeskWidget: true,
            emailDomainMappings: [{ from: 'address.org', to: 'address2.com' }],
            game: {
              active: true,
              allowAnyoneToJoin: false,
              defaultGameMode: EUserGameMode.INTENSIVE,
              usersAreAnonymousByDefault: true,
              firstQuestTag: 'hox.quest.bootcamp.0',
            },
            pluginRedirect: {
              redirectPhish: false,
              redirectSpam: false,
              uploadThreats: true,
              phishRedirectAddresses: ['assadasd@asd.com'],
              spamRedirectAddresses: ['asdsadasd@asd.com'],
            },
            plugin: {
              officejs: {
                allowedDomains: [{ name: 'allowed.eu', cert: '' }],
                forceOnlyClientApis: false,
              },
              removeThreatAfterReporting: false,
              removeSimulationAfterReporting: false,
            },
            delivery: {
              email: {
                compressGlobs: ['globbo'],
                customHeaders: [
                  {
                    key: 'key',
                    value: 'val',
                  },
                ],
                privateSmtpConnectionString: '',
                inlineImages: true,
                useReturnPath: true,
                customHiddenEmailBodyIdentifier: '',
              },
            },
            sso: {
              enabled: true,
              endPoint: 'was',
              providerName: 'provider',
              cert: 'cert',
              privateCert: '',
              disableIdentifierFormat: false,
              identifierFormat: '',
            },
            notifications: {
              weeklyReportToAdmins: true,
              threatEscalationEmails: ['email@address.com'],
            },
            images: {
              buttonLocationFirstQuest: {
                url: 'url-to-image',
              },
              buttonLocationInvite: {
                url: 'url-to-image',
              },
              buttonLocationWelcome: {
                url: 'url-to-image',
              },
              logoEmail: {
                url: 'url-to-image',
              },
              customPluginIcon: {
                url: 'url-to-image',
              },
              useCustomGameLogo: true,
              customGameLogo: { url: 'url-to-image' },
              useCustomOnboardingAssets: true,
              logo: { url: 'url-to-image' },
            },
            results: {
              customEmailDisclaimer: 'this is a header <br/>',
            },
            automaticEnrollmentSettings: {
              enabled: false,
              useForcedStart: false,
            },
          },
        ],
        vectorTags: () => [],
        questTemplates: () => [{ _id: 'qt-asd', tag: 'hox.quest.bootcamp.0' }],
        industryConnection: () => ({
          nodes: [{ _id: 'bingbong', name: 'Ping pong paddle manufacturing' }],
        }),
      },
      RootMutation: {
        updateOrganization: overrides.updateSpy,
        setOrganizationIndustry: jest.fn(),
      },
    },
  });

  const props = {
    match: { params: { organizationId: 'mockId' } },
    ...overrides.props,
  };

  const wrapper = mountWithIntl(
    <OrganizationSettings {...props} />,
    getContext(getThemeContextDef(), getApolloContextDef({ schema }))
  );

  // wait for gql to resolve data
  await timeout(0);
  wrapper.update();

  const getSettingsForm = () => wrapper.find(OrganizationSettingsForm);
  const getOrg = (): IQueryOrg => getSettingsForm().props().organization;
  const getForms = () =>
    formTestIds.map(id => getSettingsForm().findWhere(matchTestId(id)));

  return {
    props,
    wrapper,
    getOrg,
    getSettingsForm,
    getForms,
  };
};

describe('<OrganizationSettings />', () => {
  afterEach(() => {
    Enzyme.unmountAll();
  });

  it('should render settings forms', async () => {
    const { getForms } = await setup();

    getForms().forEach(formWrapper =>
      expect(formWrapper.exists()).toEqual(true)
    );
  });

  it('each form should submit partial org data', async () => {
    expect.assertions(10);

    const updateSpy = jest.fn();

    const { wrapper, getForms } = await setup({ updateSpy, props: {} });

    for (const formWrapper of getForms()) {
      formWrapper.find('form').at(0).simulate('submit');

      wrapper.update();
      await timeout(0);

      const [, payload] = updateSpy.mock.calls[0];

      expect(payload).toMatchSnapshot();

      updateSpy.mockClear();
    }
    // timeout
  }, 10000);
});
