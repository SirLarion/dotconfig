import { expect } from 'chai';
import R from 'ramda';
import sinon from 'sinon';

import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import {
  EIdentityAuthenticationLevel,
  getIdentity,
} from '@server/domains/lib/identity';
import {
  insertMockOrganization,
  withIncidentSettings,
  withThreatSettings,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import { createMockUser } from '@server/domains/lib/testMockCreators/mockUser';
import {
  createStubGetGlobal,
  createStubGetTaskQueue,
  createStubHandlerCtx,
  getGlobalAnalytics,
} from '@server/domains/lib/testUtil';
import {
  createIntegrationCtx,
  withAppConfig,
  withEmailTranslations,
  withHandlerTree,
  withMockUserIdentity,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { EServerEvent } from '@server/lib/analyticEvents';
import { EBulkUserActionKind } from '@server/lib/bulkUserActions';
import { EIncidentPolicyName } from '@server/lib/typedSchemas/Incident/models';
import { TIncidentPolicySettings } from '@server/lib/typedSchemas/Organization/models';
import { EThreatAnalysisPriority } from '@server/lib/typedSchemas/Organization/OrgThreatSettings';
import {
  FEEDBACK_RULES,
  OPTIONAL_INSTANT_FEEDBACK,
  TEAMS_BOT,
} from '@server/tags/features';

import { resetDatabase } from '../../../../../lib/serverTestUtils/serverTestUtils';
import getResolvers from '../../root';
import {
  removeGameCooldownFromOrganizationUsers,
  updateOrganizationIncidentPolicySettings,
  updateOrganizationThreatUploadBackupEmail,
} from '../organizationMutations';

describe('organizationMutations', () => {
  before(() => resetDatabase());
  afterEach(() => resetDatabase());

  const { updateOrganization, startGameForUnstartedUsers, createOrganization } =
    getResolvers().Mutation;

  describe('createOrganization', () => {
    it('should send input to organization create', async () => {
      const orgData = { name: 'New one' };
      const create = sinon.stub().resolves(orgData);

      const ctx = createStubHandlerCtx({
        handlers: {
          collection: {
            organization: {
              create,
            },
          },
        },
      });

      const result = await createOrganization(
        null,
        { organization: orgData },
        ctx
      );

      expect(result).eql(orgData);
      expect(create.lastCall.args).eql([ctx, { data: orgData }]);
    });
  });

  describe('updateOrganization', () => {
    const setup = (overrides?: { orgData?: Record<string, unknown> }) => {
      const orgId = 'old-org';

      const orgData = {
        name: 'JEsh',
        ...(overrides?.orgData && { ...overrides.orgData }),
      };

      const get = sinon.stub().resolves(orgData);

      const ctx = createStubHandlerCtx({
        getGlobal: createStubGetGlobal({ analytics: getGlobalAnalytics() }),
        handlers: {
          collection: {
            organization: {
              patch: sinon
                .stub()
                .callsFake((_, { data }) => Promise.resolve(data)),
              get,
            },
          },
          analytics: {
            sink: {
              track: sinon.stub().resolves(),
            },
          },
        },
      });

      return { ctx, orgId, orgData };
    };

    const setupIntegrationCtx = async () => {
      const ctx = await R.pipe(
        withMockUserIdentity({ roles: [SUPER_ADMIN] }),
        createIntegrationCtx
      )(null);

      return { ctx };
    };
    it('should send input to organization patch', async () => {
      const { ctx, orgId, orgData } = setup();

      const result = await updateOrganization(
        null,
        { organizationId: orgId, organization: orgData },
        ctx
      );

      expect(result).eql(orgData);
      expect(ctx.handlers.collection.organization.patch.lastCall.args).eql([
        ctx,
        { id: orgId, data: { name: orgData.name } },
      ]);
    });

    it('should create an analytics event when removing a feature flag', async () => {
      const { ctx, orgId } = setup({
        orgData: {
          name: 'foo',
          features: [
            {
              categoryName: 'features',
              name: FEEDBACK_RULES,
            },
          ],
        },
      });

      await updateOrganization(
        null,
        {
          organizationId: orgId,
          organization: {
            features: [],
          },
        },
        ctx
      );

      const trackCallArgs = ctx.handlers.analytics.sink.track.args[0][1];

      expect(ctx.handlers.analytics.sink.track.callCount).eql(
        1,
        "Expected an analytics event to have been tracked but one wasn't"
      );
      expect(trackCallArgs.event).eql(
        EServerEvent.ORGANIZATION_FEATURE_FLAG_REMOVED
      );
      expect(trackCallArgs.properties).eql({
        organizationId: orgId,
        featureFlagName: FEEDBACK_RULES,
      });
    });

    it('should create an analytics event when adding a feature flag', async () => {
      const { ctx, orgId } = setup({
        orgData: {
          name: 'foo',
          features: [],
        },
      });

      await updateOrganization(
        null,
        {
          organizationId: orgId,
          organization: {
            features: [
              {
                categoryName: 'features',
                name: OPTIONAL_INSTANT_FEEDBACK,
              },
            ],
          },
        },
        ctx
      );

      const trackCallArgs = ctx.handlers.analytics.sink.track.args[0][1];

      expect(ctx.handlers.analytics.sink.track.callCount).eql(
        1,
        "Expected an analytics event to have been tracked but one wasn't"
      );
      expect(trackCallArgs.event).eql(
        EServerEvent.ORGANIZATION_FEATURE_FLAG_ADDED
      );
      expect(trackCallArgs.properties).eql({
        organizationId: orgId,
        featureFlagName: OPTIONAL_INSTANT_FEEDBACK,
      });
    });

    it('should handle analytics for feature flags correctly when removals & additions are both in update', async () => {
      const { ctx, orgId } = setup({
        orgData: {
          name: 'foo',
          features: [
            {
              categoryName: 'features',
              name: OPTIONAL_INSTANT_FEEDBACK,
            },
          ],
        },
      });

      await updateOrganization(
        null,
        {
          organizationId: orgId,
          organization: {
            features: [
              {
                categoryName: 'features',
                name: FEEDBACK_RULES,
              },
              {
                categoryName: 'features',
                name: TEAMS_BOT,
              },
            ],
          },
        },
        ctx
      );

      expect(ctx.handlers.analytics.sink.track.callCount).eql(
        3,
        "Expected an analytics event to have been tracked but one wasn't"
      );

      const expectedEventArgs = [
        {
          event: EServerEvent.ORGANIZATION_FEATURE_FLAG_REMOVED,
          userId: 'abc',
          properties: {
            organizationId: orgId,
            featureFlagName: OPTIONAL_INSTANT_FEEDBACK,
          },
        },
        {
          event: EServerEvent.ORGANIZATION_FEATURE_FLAG_ADDED,
          userId: 'abc',
          properties: {
            organizationId: orgId,
            featureFlagName: FEEDBACK_RULES,
          },
        },
        {
          event: EServerEvent.ORGANIZATION_FEATURE_FLAG_ADDED,
          userId: 'abc',
          properties: {
            organizationId: orgId,
            featureFlagName: TEAMS_BOT,
          },
        },
      ].map(ctx.getGlobal('analytics').buildEvent);

      const trackArgs = ctx.handlers.analytics.sink.track.args;

      const handlerCallArgs = [
        trackArgs[0][1],
        trackArgs[1][1],
        trackArgs[2][1],
      ];

      expect(handlerCallArgs).to.have.deep.members(expectedEventArgs);
    });

    it('should track an analytics event if threatAnalysisPriority is assigned', async () => {
      const { ctx, orgId } = setup();

      await updateOrganization(
        null,
        {
          organizationId: orgId,
          organization: {
            threatSettings: {
              threatAnalysisPriority: EThreatAnalysisPriority.DEFAULT,
            },
          },
        },
        ctx
      );

      expect(ctx.handlers.analytics.sink.track.callCount).eql(
        1,
        "Expected an analytics event to have been tracked but one wasn't"
      );
      expect(ctx.handlers.analytics.sink.track.args[0][1].properties).eql({
        organizationId: orgId,
        threatAnalysisPriority: EThreatAnalysisPriority.DEFAULT,
      });
    });

    it('should correctly update threatUploadBackupEmail', async () => {
      const { ctx } = await setupIntegrationCtx();

      const org = await insertMockOrganization(
        withThreatSettings({
          reportToPlatform: false,
          allowPlatformVendorDataUsage: false,
          threatAnalysisPriority: EThreatAnalysisPriority.DEFAULT,
          threatUploadBackupEmail: 'foo.bar@test.com',
        })
      );

      const updateString = 'foo.bar@test.com';

      const updatedOrg = await updateOrganizationThreatUploadBackupEmail(
        null,
        { organizationId: org._id, backupEmail: updateString },
        ctx
      );

      expect(updatedOrg.threatSettings.threatUploadBackupEmail).to.equal(
        updateString
      );
    });

    it('should not-allow update for threatUploadBackupEmail field that is not an email', async () => {
      const { ctx } = await setupIntegrationCtx();

      const org = await insertMockOrganization();

      const updateString = 'test email';

      expect(
        updateOrganizationThreatUploadBackupEmail(
          null,
          { organizationId: org._id, backupEmail: updateString },
          ctx
        )
      ).rejectedWith(
        'Threat upload backup email must be a valid email address (threatSettings.threatUploadBackupEmail) in Organizations update'
      );
    });
  });

  describe('updateOrganizationIncidentPolicySettings', () => {
    const setup = async ({ stubCompilation }: { stubCompilation: boolean }) => {
      const compileTemplateStub = sinon.stub().resolves();

      const ctx = await R.pipe(
        R.ifElse(
          () => stubCompilation,
          withHandlerTree({
            templating: {
              handlebars: {
                compileTemplate: compileTemplateStub,
              },
            },
          }),
          R.identity
        ),
        withAppConfig({
          appUrl: 'http://foo.bar',
        }),
        withEmailTranslations(),
        withUserIdentity(await createMockUser(), [SUPER_ADMIN]),
        createIntegrationCtx
      )(null);

      return { ctx, compileTemplateStub };
    };

    it('should not validate if there are no changes to the template', async () => {
      const { ctx, compileTemplateStub } = await setup({
        stubCompilation: true,
      });

      const policySettings: TIncidentPolicySettings = {
        emailTemplate: {
          body: '<html><head></head><body>123 {{ classification }}</body></html>',
          subject: 'Bar',
        },
        enabled: true,
        policyName: EIncidentPolicyName.BUSINESS_EMAIL_COMPROMISE,
        policySettings: {
          creationThreshold: null,
        },
        requireMaliciousHoxhuntRating: true,
        useCustomEmailTemplate: true,
      };

      const org = await insertMockOrganization(
        withIncidentSettings({ policies: [policySettings] })
      );

      await updateOrganizationIncidentPolicySettings(
        null,
        {
          organizationId: org._id,
          policySettings,
        },
        ctx
      );

      expect(compileTemplateStub.callCount).eql(0);
    });

    it('should validate custom incident email template', async () => {
      const { ctx, compileTemplateStub } = await setup({
        stubCompilation: true,
      });

      const policySettings: TIncidentPolicySettings = {
        emailTemplate: {
          body: '<html><head></head><body>123 {{ classification }}</body></html>',
          subject: 'Bar',
        },
        enabled: true,
        policyName: EIncidentPolicyName.BUSINESS_EMAIL_COMPROMISE,
        policySettings: {
          creationThreshold: null,
        },
        requireMaliciousHoxhuntRating: true,
        useCustomEmailTemplate: true,
      };

      const org = await insertMockOrganization();

      await updateOrganizationIncidentPolicySettings(
        null,
        {
          organizationId: org._id,
          policySettings,
        },
        ctx
      );

      expect(compileTemplateStub.callCount).eql(1);
    });

    it('should throw if given bad data in custom emailTemplate', async () => {
      const { ctx } = await setup({
        stubCompilation: false,
      });

      const policySettings: TIncidentPolicySettings = {
        emailTemplate: {
          body: '<html><head></head><body>123 {{ badData }}</body></html>',
          subject: 'Bar',
        },
        enabled: true,
        policyName: EIncidentPolicyName.BUSINESS_EMAIL_COMPROMISE,
        policySettings: {
          creationThreshold: null,
        },
        requireMaliciousHoxhuntRating: true,
        useCustomEmailTemplate: true,
      };

      const org = await insertMockOrganization();

      await expect(
        updateOrganizationIncidentPolicySettings(
          null,
          {
            organizationId: org._id,
            policySettings,
          },
          ctx
        )
      ).to.be.rejectedWith(
        'Bad variable found in the template body with the value of: "badData"'
      );
    });
  });

  describe('removeGameCooldownFromOrganizationUsers', () => {
    it('should remove game cooldowns', async () => {
      const organizationId = 'mockId';

      const users = await Promise.all([
        createMockUser({ organizationId }),
        createMockUser({ organizationId }),
        createMockUser({ organizationId }),
      ]);

      const stubFind = sinon
        .stub()
        .resolves({ fetch: sinon.stub().resolves(users) });
      const stubFanout = sinon.stub().resolves([]);

      const stubCtx = createStubHandlerCtx({
        handlers: {
          collection: {
            user: {
              find: stubFind,
            },
          },
          user: {
            bulkAction: {
              fanOut: stubFanout,
            },
          },
        },
      });
      await removeGameCooldownFromOrganizationUsers(
        null,
        { organizationId },
        stubCtx
      );
      expect(stubFind.callCount).eql(1);
      expect(stubFanout.callCount).eql(1);
      expect(stubFanout.args[0][1].emails.length).eql(3);
      expect(stubFanout.args[0][1].actionKind).eql(
        EBulkUserActionKind.REMOVE_GAME_COOLDOWN
      );

      const hasAllUserIds = users.every(user =>
        stubFanout.args[0][1].emails.includes(user.emails[0].address)
      );
      expect(hasAllUserIds).eql(true);
    });
  });

  describe('startGameForUnstartedUsers', () => {
    it('should schedule game start tasks for unstarted users', async () => {
      const organizationId = 'orgToStart';

      const caller = {
        _id: 'userId',
        organizationId: 'organizationId',
        roles: {},
      };

      const ctx = createStubHandlerCtx({
        identity: getIdentity({
          authenticationLevel: EIdentityAuthenticationLevel.NORMAL,
          user: caller,
        }),
        getTaskQueue: createStubGetTaskQueue(),
      });

      const taskQueue = await ctx.getTaskQueue();

      await startGameForUnstartedUsers(null, { organizationId }, ctx);

      const [, handlerFn, group] = taskQueue.submitTaskGroup.firstCall.args;
      const { description, ...groupWithoutDescription } = group;

      expect(handlerFn).eql(
        ctx.handlers.game.user.startGameForOrganizationsUnstartedUsers
      );
      expect(groupWithoutDescription).eql({
        userId: caller._id,
        organizationId: caller.organizationId,
        signature: 'game.user.startGameForOrganizationsUnstartedUsers',
        tasks: [
          {
            args: {
              params: {
                caller: {
                  userId: caller._id,
                  organizationId: caller.organizationId,
                },
                organizationId,
              },
            },
          },
        ],
      });
    });
  });
});
