import { expect } from 'chai';
import { merge, omit } from 'lodash';
import sinon from 'sinon';

import { UserSchema } from '@server/collections/users/collection';
import { INewUser } from '@server/domains/collection/user/lib/create.models';
import { USER } from '@server/domains/lib/auth/roles';
import {
  buildMockOrganization,
  withDomains,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import { createStubHandlerCtx } from '@server/domains/lib/testUtil';
import { ESupportedLocales } from '@server/lib/i18n';
import { EUserGameMode } from '@server/lib/typedSchemas/User/models';

import {
  cleanNewUserData,
  defaultsFromOrg,
  determineDefaultSimulationLanguages,
  getUserDoc,
} from '../create.lib';
import { isEmailInOrgDomains } from '../shared.lib';

describe('collection.user.create.lib', () => {
  describe('isEmailInOrgDomains', () => {
    it('should return true if email address is in the domain list', () => {
      const domains = [{ name: 'jest.com' }, { name: 'best.com' }];

      const emailAddress = 'test@best.com';
      expect(isEmailInOrgDomains(domains, emailAddress)).to.eql(true);
    });

    it('should return true if email address is in a subdomain', () => {
      const domains = [{ name: 'jest.com' }, { name: 'best.com' }];

      const emailAddress = 'test@maybe.best.com';
      expect(isEmailInOrgDomains(domains, emailAddress)).to.eql(true);
    });

    it('should return false if email address is not in the domain list', () => {
      const domains = [
        { name: 'rbest.com' },
        { name: 'est.com' },
        { name: 'best.com.uk' },
      ];

      const emailAddress = 'test@best.com';
      expect(isEmailInOrgDomains(domains, emailAddress)).to.eql(false);
    });

    it('should return false if email address is malformed', () => {
      const domains = [{ name: 'jest.com' }, { name: 'best.com' }];

      const malformed = 'some_people_want_to_see_the_email_burn';
      expect(isEmailInOrgDomains(domains, malformed)).to.eql(false);

      const missing: string = undefined;
      expect(isEmailInOrgDomains(domains, missing)).to.eql(false);
    });
  });

  describe('defaultsFromOrg', () => {
    const orgs = [
      {
        _id: 'organizationId',
        name: 'Organization',
        game: {
          defaultGameMode: EUserGameMode.INTENSIVE,
          active: true,
          allowAnyoneToJoin: true,
          usersAreAnonymousByDefault: true,
        },
        domains: [
          {
            name: 'HoxHunt',
            defaultUiLanguage: ESupportedLocales.EN,
            context: {
              organization: {
                name: 'hoxhunt.fi',
                url: 'http://hoxhunt.fi',
              },
            },
          },
        ],
      },
      {
        _id: 'organizationIdB',
        name: 'OrganizationB',
        game: {
          defaultGameMode: EUserGameMode.INTENSIVE,
          active: false,
          allowAnyoneToJoin: false,
          usersAreAnonymousByDefault: false,
        },
        domains: [
          {
            name: 'Space X',
            defaultUiLanguage: ESupportedLocales.DE,
            context: {
              organization: {
                name: 'hoxhunt.com',
                url: 'http://hoxhunt.com',
              },
            },
          },
        ],
      },
    ];

    const newUserData: INewUser = {
      emails: [
        {
          address: 'ulof@hoxhunt.com',
        },
      ],
      profile: {
        firstName: 'Ulof',
        lastName: 'Vanderbilt',
      },
      organizationId: 'fsd746fsf',
      game: {
        mode: EUserGameMode.INTENSIVE,
      },
    };

    for (const org of orgs) {
      const defaults = defaultsFromOrg(org as any, newUserData);

      it('Sets org name to defaults', () => {
        expect(defaults.organizationName).eql(org.name);
      });
      it('Sets USER role to org', () => {
        expect(defaults.roles[org._id]).eql([USER]);
      });
      it('Sets default locale', () => {
        expect(defaults.profile.locale.ui).eql(
          org.domains[0].defaultUiLanguage
        );
      });
      it('Sets game mode', () => {
        expect(defaults.game.mode).eql(org.game.defaultGameMode);
      });
      it('Sets anonymous mode', () => {
        expect(defaults.profile.isAnonymous).eql(
          org.game.usersAreAnonymousByDefault
        );
      });
      it('Never sets game mode', () => {
        expect(defaults.game).not.to.have.property('active');
      });
    }
  });

  describe('cleanUserData', () => {
    it('should lowerCase email addresses', () => {
      const data: INewUser = {
        organizationId: 'orgId',
        emails: [
          { address: 'NORWEGIAN@FOLKLORE.ORG' },
          { address: 'BHUTANESE@FOLKLORE.ORG' },
        ],
        profile: {
          firstName: 'Svelanka',
          lastName: 'Börg',
        },
      };

      const cleaned = cleanNewUserData(data);

      const expected = merge({}, data, {
        emails: [
          { address: 'norwegian@folklore.org' },
          { address: 'bhutanese@folklore.org' },
        ],
      });

      expect(cleaned).to.deep.equal(expected);
    });

    it('should remove unsupported languages', () => {
      const data: INewUser = {
        organizationId: 'orgId',
        emails: [],
        profile: {
          firstName: 'Svelanka',
          lastName: 'Börg',
          locale: {
            ui: 'mu' as any, // for mumblenese
          },
        },
      };

      const cleaned = cleanNewUserData(data);

      const expected = omit(data, 'profile.locale.ui');

      expect(cleaned).eql(expected);
    });

    it('should keep supported languages', () => {
      const data: INewUser = {
        organizationId: 'orgId',
        emails: [],
        profile: {
          firstName: 'Svelanka',
          lastName: 'Börg',
          locale: {
            ui: ESupportedLocales.SV,
          },
        },
      };
      const cleaned = cleanNewUserData(data);
      expect(cleaned).eql(data);
    });

    it('should add parsed first and last name from email if not supplied', () => {
      const permutations = [
        {
          firstName: 'Svelanka',
          lastName: 'Börg',
          expectedName: 'Svelanka Börg',
        },
        {
          firstName: 'Svelanka',
          expectedName: 'Bolenka Sverg',
        },
        {
          lastName: 'Börg',
          expectedName: 'Bolenka Sverg',
        },
        {
          expectedName: 'Bolenka Sverg',
        },
      ];

      for (const { firstName, lastName, expectedName } of permutations) {
        const data: INewUser = {
          organizationId: 'orgId',
          emails: [{ address: 'bolenka.sverg@org.com' }],
          profile: {
            firstName,
            lastName,
          },
        };
        const cleaned = cleanNewUserData(data);

        const [expectedFirst, expectedLast] = expectedName.split(' ');

        const expected = merge({}, data, {
          profile: {
            firstName: expectedFirst,
            lastName: expectedLast,
          },
        });

        expect(cleaned).eql(expected);
      }
    });
  });

  describe('getUserDoc', () => {
    const setup = async () => {
      const org = await buildMockOrganization();

      const newUserData: INewUser = {
        organizationId: org._id,
        emails: [{ address: 'mail@asd.com' }],
        profile: { firstName: 'name', lastName: 'last' },
      };
      const orgDefaults = defaultsFromOrg(org, newUserData);
      const userDefaults = UserSchema.clean({});

      const rewards = ['mockAchievement'];

      const ctx = createStubHandlerCtx({
        handlers: {
          game: {
            user: {
              getChangedRewards: sinon.stub().resolves({ rewards }),
            },
          },
          internal: {
            features: {
              hasFeature: sinon.stub().resolves(false),
            },
          },
        },
      });

      return { ctx, org, newUserData, orgDefaults, userDefaults, rewards };
    };

    it('should take defaults from org', async () => {
      const { ctx, org, newUserData, orgDefaults } = await setup();
      const doc = await getUserDoc(ctx, org, newUserData);

      expect(doc.organizationName).eql(orgDefaults.organizationName);
      expect(doc.roles).eql(orgDefaults.roles);
      expect(doc.profile.locale.ui).eql(orgDefaults.profile.locale.ui);
      expect(doc.game.mode).eql(orgDefaults.game.mode);
    });

    it('should take defaults from user schema', async () => {
      const { ctx, org, newUserData, userDefaults } = await setup();
      const doc = await getUserDoc(ctx, org, newUserData);

      expect(doc.game.active).eql(userDefaults.game.active);
    });

    it('should use overrides from newUserData', async () => {
      const { ctx, org, newUserData } = await setup();

      const actualNewUserData = {
        ...newUserData,
        profile: {
          ...newUserData.profile,
          locale: { ui: ESupportedLocales.DE },
          isAnonymous: true,
        },
        externalId: 'external',
        game: { mode: EUserGameMode.INTENSIVE },
      };
      const doc = await getUserDoc(ctx, org, actualNewUserData);

      expect(doc.profile.locale.ui).eql(actualNewUserData.profile.locale.ui);
      expect(doc.profile.isAnonymous).eql(
        actualNewUserData.profile.isAnonymous
      );
      expect(doc.externalId).eql(actualNewUserData.externalId);
      expect(doc.game.mode).eql(actualNewUserData.game.mode);
    });

    it('should add rewards', async () => {
      const { ctx, org, newUserData, rewards } = await setup();

      const doc = await getUserDoc(ctx, org, newUserData);

      expect(doc.player.rewards).eql(rewards);
    });
  });

  describe('determineDefaultSimulationLanguages', () => {
    const setup = (): INewUser => ({
      emails: [
        {
          address: 'ulof@hoxhunt.com',
        },
      ],
      profile: {
        firstName: 'Ulof',
        lastName: 'Vanderbilt',
      },
      organizationId: 'fsd746fsf',
      game: {
        mode: EUserGameMode.INTENSIVE,
      },
    });

    it('should return empty default sim languages for unconfigured domain', async () => {
      const newUserData = setup();

      const org = await buildMockOrganization(
        withDomains([
          {
            name: 'hoxhunt.fi',
            defaultUiLanguage: ESupportedLocales.EN,
            defaultSimulationLanguages: [ESupportedLocales.ES],
          },
        ])
      );

      const defaultSimulationLanguages = determineDefaultSimulationLanguages(
        org,
        newUserData
      );
      expect(defaultSimulationLanguages).eql([]);
    });
    it('should return correct default sim languages', async () => {
      const newUserData = setup();

      const org = await buildMockOrganization(
        withDomains([
          {
            name: 'hoxhunt.com',
            defaultUiLanguage: ESupportedLocales.DE,
            defaultSimulationLanguages: [ESupportedLocales.ES],
          },
        ])
      );

      const defaultSimulationLanguages = determineDefaultSimulationLanguages(
        org,
        newUserData
      );
      expect(defaultSimulationLanguages).eql([ESupportedLocales.ES]);
    });
    it('should return default sim languages when none specified', async () => {
      const newUserData = setup();

      const org = await buildMockOrganization(
        withDomains([
          {
            name: 'hoxhunt.com',
            defaultUiLanguage: ESupportedLocales.DE,
          },
        ])
      );

      const defaultSimulationLanguages = determineDefaultSimulationLanguages(
        org,
        newUserData
      );
      expect(defaultSimulationLanguages).eql([]);
    });
    it(`should return allowed x default sim languages when allowed languages are specified`, async () => {
      const newUserData = setup();

      const org = await buildMockOrganization(
        withDomains([
          {
            name: 'hoxhunt.com',
            defaultUiLanguage: ESupportedLocales.DE,
            defaultSimulationLanguages: [
              ESupportedLocales.ES,
              ESupportedLocales.FI,
            ],
            allowedSimulationLanguages: [ESupportedLocales.ES],
          },
        ])
      );

      const defaultSimulationLanguages = determineDefaultSimulationLanguages(
        org,
        newUserData
      );
      expect(defaultSimulationLanguages).eql([ESupportedLocales.ES]);
    });
    it(`should return empty sim languages when only allowed languages are specified`, async () => {
      const newUserData = setup();

      const org = await buildMockOrganization(
        withDomains([
          {
            name: 'hoxhunt.com',
            defaultUiLanguage: ESupportedLocales.DE,
            allowedSimulationLanguages: [ESupportedLocales.ES],
          },
        ])
      );

      const defaultSimulationLanguages = determineDefaultSimulationLanguages(
        org,
        newUserData
      );
      expect(defaultSimulationLanguages).eql([]);
    });
  });
});
