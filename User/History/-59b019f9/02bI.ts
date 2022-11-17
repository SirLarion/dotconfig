import { expect } from 'chai';

import { EUserRole } from '@server/domains/lib/auth/roles';
import {
  buildMockUser,
  withRoles,
} from '@server/domains/lib/testMockCreators/mockUser';
import { withOrganizationId } from '@server/domains/lib/testMockCreators/mockUtil';
import {
  createStubGetConfig,
  createStubGetGlobal,
  createStubHandlerCtx,
  getGlobalAnalytics,
} from '@server/domains/lib/testUtil';
import { EServerEvent } from '@server/lib/analyticEvents';
import { EUserGameMode } from '@server/lib/typedSchemas/User/models';

import patch from '../../patch';
import { IPatchPayload, IUser } from '../models';
import {
  buildUserInfoUpdatedEvent,
  buildUserRoleChangedEvent,
} from '../patch.analytics.lib';

describe('collection.user.patch.analytics.lib', () => {
  it('analyticsEventBuilder should include two trackers', () => {
    expect(patch.analyticsEventBuilder).eql([
      buildUserInfoUpdatedEvent,
      buildUserRoleChangedEvent,
    ]);
  });
  describe('buildUserInfoUpdatedEvent', () => {
    it('should return correct event from trackUserInfoUpdates with some changed properties', async () => {
      const user = await buildMockUser();
      const mockTimestamp = new Date();

      const ctx = createStubHandlerCtx({
        meta: {
          domain: 'collection',
          service: 'user',
          handler: 'patch',
        },
        user,
        getGlobal: createStubGetGlobal({
          newDate: () => mockTimestamp,
          analytics: getGlobalAnalytics(),
        }),
      });

      const mockUpdateData: IPatchPayload['data'] = {
        profile: {
          country: 'VU',
          department: 'Technology',
          site: 'Remote',
        },
      };

      const result = buildUserInfoUpdatedEvent(
        ctx,
        {
          id: user._id,
          data: mockUpdateData,
        },
        user
      );
      expect(result).eql(
        ctx.getGlobal('analytics').buildEvent({
          userId: user._id,
          properties: { ...mockUpdateData.profile },
          event: EServerEvent.USER_INFO_UPDATED,
        }),
        'trackUserInfoUpdates should give correct event for user_info_updated'
      );
    });
    it('should return correct event from trackUserInfoUpdates with all changed properties', async () => {
      const user = await buildMockUser();
      const mockTimestamp = new Date();

      const ctx = createStubHandlerCtx({
        meta: {
          domain: 'collection',
          service: 'user',
          handler: 'patch',
        },
        user,
        getGlobal: createStubGetGlobal({
          analytics: getGlobalAnalytics(),
          newDate: () => mockTimestamp,
        }),
      });

      const mockUpdateData: IPatchPayload['data'] = {
        emails: [
          {
            address: 'tubo@escape.es',
          },
        ],
        game: {
          active: true,
          mode: EUserGameMode.INTENSIVE,
        },
        profile: {
          country: 'VU',
          department: 'Technology',
          city: 'TKU',
          site: 'Remote',
        },
      };

      const result = buildUserInfoUpdatedEvent(
        ctx,
        {
          id: user._id,
          data: mockUpdateData,
        },
        user
      );
      expect(result).eql(
        ctx.getGlobal('analytics').buildEvent({
          userId: user._id,
          properties: {
            ...mockUpdateData.profile,
            ...mockUpdateData.game,
            emailAddress: 'tubo@escape.es',
          },
          event: EServerEvent.USER_INFO_UPDATED,
        }),
        'trackUserInfoUpdates should give correct event for user_info_updated'
      );
    });
    it('should return null from trackUserInfoUpdates', async () => {
      const user = await buildMockUser();

      const ctx = createStubHandlerCtx({
        meta: {
          domain: 'collection',
          service: 'user',
          handler: 'patch',
        },
        user,
        getGlobal: createStubGetGlobal({
          analytics: getGlobalAnalytics(),
          newDate: () => new Date(),
        }),
      });

      const result = buildUserInfoUpdatedEvent(
        ctx,
        {
          id: user._id,
          data: { profile: { phone: '12345678' } },
        },
        user
      );
      expect(result).eql(
        null,
        'trackUserInfoUpdates result should be null if no tracked fields were updated'
      );
    });
  });
  describe('buildUserRoleChangedEvent', () => {
    it('should return null if input does not include role changes', async () => {
      const ctx = createStubHandlerCtx({
        getGlobal: createStubGetGlobal({ analytics: getGlobalAnalytics() }),
      });

      const input = {
        id: 'userId',
        data: {},
      };

      const output = {} as IUser;

      expect(await buildUserRoleChangedEvent(ctx, input, output)).eql(null);
    });

    const FROZEN_DATE = new Date();

    const tests: Array<{
      description: string;
      updatedRoles: EUserRole[];
      expectedEventRole: EUserRole;
    }> = [
      {
        description: 'User role should have the least importance',
        updatedRoles: [EUserRole.USER],
        expectedEventRole: EUserRole.USER,
      },
      {
        description: 'SOC operator should outrank user',
        updatedRoles: [EUserRole.USER, EUserRole.SOC_OPERATOR],
        expectedEventRole: EUserRole.SOC_OPERATOR,
      },
      {
        description: 'Admin should outrank SOC',
        updatedRoles: [EUserRole.USER, EUserRole.SOC_OPERATOR, EUserRole.ADMIN],
        expectedEventRole: EUserRole.ADMIN,
      },
      {
        description: 'Super admin should outrank everything',
        updatedRoles: [
          EUserRole.USER,
          EUserRole.SOC_OPERATOR,
          EUserRole.ADMIN,
          EUserRole.SUPER_ADMIN,
        ],
        expectedEventRole: EUserRole.SUPER_ADMIN,
      },
    ];

    for (const test of tests) {
      it(test.description, async () => {
        const organizationId = 'organizationId';

        const orgRoles = test.updatedRoles.filter(
          role => role !== EUserRole.SUPER_ADMIN
        );

        const globalRoles = test.updatedRoles.filter(
          role => role === EUserRole.SUPER_ADMIN
        );

        const user = await buildMockUser(
          withOrganizationId(organizationId),
          withRoles({
            [organizationId]: orgRoles,
            __global_roles__: globalRoles,
          })
        );

        const ctx = createStubHandlerCtx({
          getGlobal: createStubGetGlobal({
            analytics: getGlobalAnalytics(),
            newDate: () => FROZEN_DATE,
          }),
          getConfig: createStubGetConfig({
            auth: {
              enableSuperAdminAccess: true,
            },
          }),
        });

        const input = {
          id: user._id,
          data: {
            roles: user.roles,
          },
        };

        const result = await buildUserRoleChangedEvent(ctx, input, user);

        expect(result).eql(
          ctx.getGlobal('analytics').buildEvent({
            event: EServerEvent.ADMIN_USER_ROLE_CHANGED,
            userId: user._id,
            properties: {
              organizationId: user.organizationId,
              userRole: test.expectedEventRole,
            },
          })
        );
      });
    }
  });
});
