import { expect } from 'chai';
import R from 'ramda';
import sinon, { SinonStub } from 'sinon';

import * as mongo from '@server/domains/collection/lib/mongo';
import {
  ADMIN,
  SUPER_ADMIN,
  TASK_RUNNER,
  USER,
} from '@server/domains/lib/auth/roles';
import { EIdentityAuthenticationLevel } from '@server/domains/lib/identity';
import {
  insertMockOrganization,
  withDomains,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import {
  createMockUser,
  insertMockUser,
  withOrganizationId,
} from '@server/domains/lib/testMockCreators/mockUser';
import { testACL } from '@server/domains/lib/testShared';
import {
  createStubHandlerCtx,
  getMockUserIdentity,
} from '@server/domains/lib/testUtil';
import {
  createIntegrationCtx,
  withIdentity,
  withTaskRunnerUserRole,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { ESupportedLocales } from '@server/lib/i18n';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';
import { IUser } from '@server/lib/typedSchemas';

import { EUserGameMode } from '../../../../lib/typedSchemas/User/models';
import { SCIM_FIELDS } from '../lib/patch.validation.lib';
import { getUpdatedAnalyticsTrackedFields } from '../lib/shared.lib';
import patch from '../patch';

describe('collection.user.patch', () => {
  testACL(patch, [SUPER_ADMIN, ADMIN, USER, TASK_RUNNER]);

  let stubPatch: SinonStub;

  beforeEach(async () => {
    await resetDatabase();
    stubPatch = sinon
      .stub(mongo, 'patch')
      .callsFake((ctx, args) => args as any);
  });

  afterEach(async () => {
    await resetDatabase();
    stubPatch.restore();
  });

  it('should allow patching of jwtPayloads for admins', async () => {
    const userId = 'userId';
    const organizationId = 'orgId';

    const ctx = createStubHandlerCtx({
      meta: {
        domain: 'collection',
        service: 'user',
        handler: 'patch',
      },
      user: { _id: userId, organizationId, roles: { global: [ADMIN] } },
    });

    const result = await patch.inputAuthorizer(ctx, {
      id: userId,
      data: {
        jwtPayloads: [{ description: 'fo', jti: 'ff', sub: 'foo', iat: 221 }],
      },
    });

    expect(result).eqls({
      id: 'userId',
      data: {
        jwtPayloads: [{ description: 'fo', jti: 'ff', sub: 'foo', iat: 221 }],
      },
    });
  });

  it('should not allow patching of jwtPayloads for users', async () => {
    const userId = 'userId';

    const ctx = createStubHandlerCtx({
      meta: {
        domain: 'collection',
        service: 'user',
        handler: 'patch',
      },
      identity: getMockUserIdentity({
        _id: userId,
        organizationId: 'org',
        roles: [USER],
      }),
    });

    const result = await patch.inputAuthorizer(ctx, {
      id: userId,
      data: {
        events: [],
        jwtPayloads: [{ description: 'fo', jti: 'ff', sub: 'foo', iat: 221 }],
      },
    });

    expect(result).eqls({
      id: 'userId',
      data: { events: [] },
    });
  });

  it('should allow subset of fields to be updated with WEAK authenticationLevel', async () => {
    stubPatch.restore();
    const user = await insertMockUser();

    const ctx = await R.pipe(
      withIdentity(
        getMockUserIdentity({
          _id: user._id,
          authenticationLevel: EIdentityAuthenticationLevel.WEAK,
        })
      ),
      createIntegrationCtx
    )(null);

    const result = await ctx.handlers.collection.user.patch(ctx, {
      id: user._id,
      data: {
        profile: {
          locale: {
            quests: ['en'],
            ui: ESupportedLocales.EN,
            tz: 'EET',
          },
        },
      },
    });

    expect(result.profile.locale.quests).to.have.all.members(['en']);
    expect(result.profile.locale.ui).eq(ESupportedLocales.EN);
    expect(result.profile.locale.tz).eq('EET');

    await expect(
      ctx.handlers.collection.user.patch(ctx, {
        id: user._id,
        data: {
          profile: {
            locale: {
              disableAutomaticTimezoneUpdate: false,
            },
          },
        },
      })
    ).to.be.rejectedWith('Unauthorized DB access');
  });

  it('should lowercase email addresses when patched', async () => {
    stubPatch.restore();

    const org = await insertMockOrganization(
      withDomains([{ name: 'big.tings' }])
    );
    const user = await insertMockUser(withOrganizationId(org._id));

    const ctx = await R.pipe(
      withTaskRunnerUserRole,
      createIntegrationCtx
    )(null);

    const patchedUser = await ctx.handlers.collection.user.patch(ctx, {
      id: user._id,
      data: {
        emails: [{ address: 'BIG_TINGS_COMIN@big.tings' }],
      },
    });
    expect(patchedUser.emails[0].address).eql('big_tings_comin@big.tings');
  });

  it('should throw if attempting to set an empty email address', async () => {
    stubPatch.restore();

    const org = await insertMockOrganization();
    const user = await insertMockUser(withOrganizationId(org._id));

    const ctx = await R.pipe(
      withTaskRunnerUserRole,
      createIntegrationCtx
    )(null);

    await expect(
      ctx.handlers.collection.user.patch(ctx, {
        id: user._id,
        data: {
          emails: [{ address: '' }],
        },
      })
    ).rejectedWith('Input email address cannot be empty');
  });

  it('should correctly format analytics event empty strings', async () => {
    const updateData: DeepPartial<IUser> = {
      profile: {
        department: '',
        site: '',
        country: '',
        city: '',
      },
    };
    expect(getUpdatedAnalyticsTrackedFields(updateData)).deep.eq({
      department: null,
      site: null,
      country: null,
      city: null,
    });
  });

  it('should set game active to false if game mode set to report only', async () => {
    stubPatch.restore();

    const user = await createMockUser(
      {
        game: {
          mode: EUserGameMode.INTENSIVE,
          active: true,
        },
      },
      { persist: true }
    );

    const ctx = await R.pipe(
      withTaskRunnerUserRole,
      createIntegrationCtx
    )(null);

    const patchedUser = await ctx.handlers.collection.user.patch(ctx, {
      id: user._id,
      data: {
        game: {
          mode: EUserGameMode.REPORT_ONLY,
        },
      },
    });
    expect(patchedUser.game.active).eql(false);
  });

  const scimFieldsTestData: Record<typeof SCIM_FIELDS[number], unknown> = {
    'profile.firstName': 'Test',
    emails: [
      {
        address: 'test@test.com',
      },
    ],
    'profile.country': 'Finland',
    'profile.department': 'Dep',
    'profile.lastName': 'Last name',
    'profile.site': 'Site',
  };

  SCIM_FIELDS.forEach(field => {
    it(`${field} should be editable by SCIM_LOGICAL_USER`, async () => {
      stubPatch.restore();

      const user = await createMockUser(
        {
          scim: {
            lastProvisionedAt: new Date(),
          },
        },
        { persist: true }
      );

      const taskRunnerUser = await createMockUser(
        { _id: 'SCIM_LOGICAL_USER' },
        { persist: true }
      );

      const ctx = await R.pipe(
        withUserIdentity(taskRunnerUser, [TASK_RUNNER]),
        createIntegrationCtx
      )(null);
      await expect(
        ctx.handlers.collection.user.patch(ctx, {
          id: user._id,
          data: R.assocPath(field.split('.'), scimFieldsTestData[field], {}),
        })
      ).to.not.be.rejectedWith(
        `Editing of field ${field} is not allowed for SCIM provisioned user`
      );
    });

    it(`${field} should be editable by SUPER_ADMIN`, async () => {
      stubPatch.restore();

      const user = await createMockUser(
        {
          scim: {
            lastProvisionedAt: new Date(),
          },
        },
        { persist: true }
      );
      const superAdmin = await createMockUser({}, { persist: true });

      const ctx = await R.pipe(
        withUserIdentity(superAdmin, [SUPER_ADMIN]),
        createIntegrationCtx
      )(null);
      await expect(
        ctx.handlers.collection.user.patch(ctx, {
          id: user._id,
          data: R.assocPath(field.split('.'), scimFieldsTestData[field], {}),
        })
      ).to.not.be.rejectedWith(
        `Editing of field ${field} is not allowed for SCIM provisioned user`
      );
    });

    it(`${field} should not be editable by other users than SCIM_LOGICAL_USER`, async () => {
      stubPatch.restore();

      const user = await createMockUser(
        {
          scim: {
            lastProvisionedAt: new Date(),
          },
        },
        { persist: true }
      );

      const ctx = await R.pipe(
        withTaskRunnerUserRole,
        createIntegrationCtx
      )(null);
      await expect(
        ctx.handlers.collection.user.patch(ctx, {
          id: user._id,
          data: R.assocPath(field.split('.'), scimFieldsTestData[field], {}),
        })
      ).to.be.rejectedWith(
        `Editing of field ${field} is not allowed for SCIM provisioned user`
      );
    });
  });
});
