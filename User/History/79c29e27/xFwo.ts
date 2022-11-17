import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';
import sinon from 'sinon';

import { SCIM_USER_ID } from '@server/api/auth/authenticators/scimAuthenticator';
import { ADMIN } from '@server/domains/lib/auth/roles';
import {
  insertMockOrganization,
  withOrganizationOverrides,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import { createMockUser } from '@server/domains/lib/testMockCreators/mockUser';
import { testACL } from '@server/domains/lib/testShared';
import {
  createStubGetGlobal,
  createStubGetLogger,
  createStubHandlerCtx,
  getGlobalAnalytics,
} from '@server/domains/lib/testUtil';
import {
  createIntegrationCtx,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { EServerEvent } from '@server/lib/analyticEvents';
import {
  createMockMongoCursor,
  resetDatabase,
} from '@server/lib/serverTestUtils/serverTestUtils';
import { IUser } from '@server/lib/typedSchemas';

import { ERROR_MESSAGE_SCHEMA, toScimUserResponse } from '../lib/common.models';
import {
  EScimUpdateOperationType,
  IScimUserUpdateOperation,
} from '../lib/updateUser.models';
import updateUser, { parseUpdateOperations } from '../updateUser';

chai.use(chaiAsPromised);

let sandbox: ReturnType<typeof sinon.createSandbox>;

describe('admin.scim.updateUser', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    resetDatabase();
  });
  afterEach(() => {
    sandbox.restore();
    resetDatabase();
  });

  testACL(updateUser, [ADMIN]);

  const integrationSetup = async () => {
    await insertMockOrganization(
      withOrganizationOverrides({
        _id: 'testOrg',
        domains: [{ name: 'test.com' }],
      })
    );

    const ctx = await R.pipe(
      withUserIdentity(
        {
          _id: SCIM_USER_ID,
          organizationId: 'testOrg',
        },
        [ADMIN]
      ),
      createIntegrationCtx
    )(null);

    return { ctx };
  };

  const setup = async (user?: IUser) => {
    const FROZEN_DATE = new Date();

    const mockFind = sinon
      .mock()
      .resolves(createMockMongoCursor(user ? [user] : []));
    const mockGet = sinon.mock().returns(user);
    const mockUpsert = sinon.stub().resolves(user);

    const mockPatch = sinon
      .stub()
      .callsFake((_, { data }) =>
        Promise.resolve(R.mergeDeepRight(user, data))
      );
    const mockTrack = sinon.mock();

    return {
      mockFind,
      mockUpsert,
      mockPatch,
      mockTrack,
      ctx: createStubHandlerCtx({
        getConfig: (key: string) =>
          ({
            appUrl: 'http://localhost',
          }[key]),
        getContextLogger: createStubGetLogger(),
        getGlobal: createStubGetGlobal({
          analytics: getGlobalAnalytics(),
          newDate: () => FROZEN_DATE,
        }),
        handlers: {
          collection: {
            user: {
              find: mockFind,
              upsert: mockUpsert,
              get: mockGet,
              patch: mockPatch,
            },
          },
          analytics: {
            sink: {
              track: mockTrack,
            },
          },
        },
      }),
    };
  };

  it('should throw error if one operation fails', async () => {
    const user = await createMockUser({
      _id: 'testId',
      emails: [{ address: 'test@test.fi' }],
    });
    const { ctx } = await setup(user);
    try {
      await updateUser.handler(ctx, {
        scimId: 'testId',
        updateOperations: [
          {
            op: EScimUpdateOperationType.REPLACE,
            path: 'emails[type eq "work"].value',
            value: [],
          },
          {
            op: EScimUpdateOperationType.REPLACE,
            path: 'emails[type wrongOperation "asdasdadas"].value',
            value: [],
          },
        ],
      });
      expect.fail('Should have thrown');
    } catch (error) {
      expect(error.name).eq('ScimOperationError');
      expect(error.message).eq(
        'Update operation failed for user with scimId testId'
      );
      expect(error.errorCode).eq(400, 'error code should be 400');
      expect(error.response).to.deep.equal({
        schemas: [ERROR_MESSAGE_SCHEMA],
        detail: 'Update operation failed for user with scimId testId',
        scimType: 'invalidPath',
      });
    }
  });

  it('should throw error if user not found with the scimId', async () => {
    const { ctx } = await setup();
    try {
      await updateUser.handler(ctx, {
        scimId: 'testId',
        updateOperations: [
          {
            op: EScimUpdateOperationType.REPLACE,
            path: 'emails',
            value: [],
          },
        ],
      });
      expect.fail('Should have thrown');
    } catch (error) {
      expect(error.name).eq('ScimOperationError');
      expect(error.message).eq('Failed to retrieve user with scimId testId');
      expect(error.errorCode).eq(404, 'error code should be 404');
      expect(error.response).to.deep.equal({
        schemas: [ERROR_MESSAGE_SCHEMA],
        detail: 'Failed to retrieve user with scimId testId',
      });
    }
  });

  it('should restore saved user scim data if one update operation fails', async () => {
    const user = await createMockUser({ _id: 'testId' });
    const { ctx, mockUpsert } = await setup(user);

    try {
      await updateUser.handler(ctx, {
        scimId: 'testId',
        updateOperations: [
          {
            op: EScimUpdateOperationType.REPLACE,
            path: 'emails[type eq "work"].value',
            value: 'asd',
          },
          {
            op: EScimUpdateOperationType.REPLACE,
            path: 'emails[type wrongOp "asdads"]',
            value: {},
          },
        ],
      });
    } catch (error) {
      expect(mockUpsert.callCount).eq(0, 'patch should be called zero times');
      expect(error.name).eq('ScimOperationError');
      expect(error.message).eq(
        'Update operation failed for user with scimId testId'
      );
      expect(error.errorCode).eq(400, 'error code should be 400');
      expect(error.response).to.deep.equal({
        schemas: [ERROR_MESSAGE_SCHEMA],
        detail: 'Update operation failed for user with scimId testId',
        scimType: 'invalidPath',
      });
    }
  });

  it('should return the scim user response object on succesful update', async () => {
    const createdDate = new Date();

    const user = await createMockUser({
      _id: 'testId',
      createdAt: createdDate,
      updatedAt: createdDate,
      emails: [{ address: 'test@test.fi' }],
    });
    const { ctx, mockPatch } = await setup(user);

    const { response } = await updateUser.handler(ctx, {
      scimId: 'testId',
      updateOperations: [
        {
          op: EScimUpdateOperationType.REPLACE,
          path: 'emails[type eq "work"].value',
          value: 'newEmail@test.fi',
        },
      ],
    });

    expect(mockPatch.callCount).to.eq(
      1,
      'patch operation should be called once'
    );
    expect(response).to.deep.eq(
      await toScimUserResponse(ctx, {
        ...user,
        emails: [
          {
            address: 'newEmail@test.fi',
          },
        ],
      })
    );
  });

  it('should create soft deleted analytics event if user is soft deleted', async () => {
    const createdDate = new Date();

    const softDeletedAtDate = new Date();
    sandbox.useFakeTimers(softDeletedAtDate.getTime());

    const user = await createMockUser({
      _id: 'testId',
      createdAt: createdDate,
      updatedAt: createdDate,
    });
    const { ctx, mockTrack } = await setup(user);

    await updateUser.handler(ctx, {
      scimId: 'testId',
      updateOperations: [
        {
          op: EScimUpdateOperationType.REPLACE,
          path: 'active',
          value: 'False',
        },
      ],
    });

    expect(
      mockTrack.firstCall.args[1].event === EServerEvent.USER_SOFT_DELETED,
      'should create soft deleted event'
    );
  });

  it('should create new soft deleted reversed analytics event if user soft deletion is removed', async () => {
    const createdDate = new Date();

    const softDeletedAtDate = new Date();
    sandbox.useFakeTimers(softDeletedAtDate.getTime());

    const user = await createMockUser({
      _id: 'testId',
      createdAt: createdDate,
      updatedAt: createdDate,
      softDeletedAt: new Date(),
    });
    const { ctx, mockTrack } = await setup(user);

    await updateUser.handler(ctx, {
      scimId: 'testId',
      updateOperations: [
        {
          op: EScimUpdateOperationType.REPLACE,
          path: 'active',
          value: 'True',
        },
      ],
    });
    expect(mockTrack.firstCall.args[1].event).eql(
      EServerEvent.USER_SOFT_DELETE_CANCELLED,
      'should create soft deleted reversed event'
    );
  });

  it('should set user softDeletedAt when updating scim active attribute', async () => {
    const createdDate = new Date();

    const softDeletedAtDate = new Date();
    sandbox.useFakeTimers(softDeletedAtDate.getTime());

    const user = await createMockUser({
      _id: 'testId',
      createdAt: createdDate,
      updatedAt: createdDate,
    });
    const { ctx, mockPatch } = await setup(user);

    const { response } = await updateUser.handler(ctx, {
      scimId: 'testId',
      updateOperations: [
        {
          op: EScimUpdateOperationType.REPLACE,
          path: 'active',
          value: 'False',
        },
      ],
    });

    const patchCallArgs = mockPatch.firstCall.args[1];

    expect(patchCallArgs.data.softDeletedAt).eql(
      new Date(),
      'Patch should have set softDeletedAt'
    );
    expect(patchCallArgs.data.game.active).eql(
      false,
      'Patch should have set deactivated user game'
    );

    expect(response).to.deep.equals(
      await toScimUserResponse(ctx, {
        ...user,
        // if softDeletedAt is set, user is deactivated
        softDeletedAt: new Date(),
      })
    );
  });

  it('should set multiple attributes correctly when no path set', async () => {
    const createdDate = new Date();

    const softDeletedAtDate = new Date();
    sandbox.useFakeTimers(softDeletedAtDate.getTime());

    const user = await createMockUser({
      _id: 'testId',
      createdAt: createdDate,
      updatedAt: createdDate,
    });
    const { ctx, mockPatch } = await setup(user);

    const { response } = await updateUser.handler(ctx, {
      scimId: 'testId',
      updateOperations: [
        {
          op: EScimUpdateOperationType.REPLACE,
          value: {
            active: false,
            name: {
              givenName: 'test-given-name',
              familyName: 'test-family-name',
            },
          },
        },
      ],
    });

    const patchCallArgs = mockPatch.firstCall.args[1];

    expect(patchCallArgs.data.softDeletedAt).eql(
      new Date(),
      'Patch should have set softDeletedAt'
    );
    expect(patchCallArgs.data.game.active).eql(
      false,
      'Patch should have set deactivated user game'
    );

    expect(response).to.deep.equals(
      await toScimUserResponse(ctx, {
        ...user,
        profile: {
          ...user.profile,
          firstName: 'test-given-name',
          lastName: 'test-family-name',
        },
        softDeletedAt: new Date(),
      })
    );
  });

  it('should set user softDeletedAt correctly when no path is set', async () => {
    const createdDate = new Date();

    const softDeletedAtDate = new Date();
    sandbox.useFakeTimers(softDeletedAtDate.getTime());

    const user = await createMockUser({
      _id: 'testId',
      createdAt: createdDate,
      updatedAt: createdDate,
    });
    const { ctx, mockPatch } = await setup(user);

    const { response } = await updateUser.handler(ctx, {
      scimId: 'testId',
      updateOperations: [
        {
          op: EScimUpdateOperationType.REPLACE,
          value: { active: 'false' },
        },
      ],
    });

    const patchCallArgs = mockPatch.firstCall.args[1];

    expect(patchCallArgs.data.softDeletedAt).eql(
      new Date(),
      'Patch should have set softDeletedAt'
    );
    expect(patchCallArgs.data.game.active).eql(
      false,
      'Patch should have set deactivated user game'
    );

    expect(response).to.deep.equals(
      await toScimUserResponse(ctx, {
        ...user,
        // if softDeletedAt is set, user is deactivated
        softDeletedAt: new Date(),
      })
    );
  });

  it('should create required mongo field projections for updatable fields correctly', async () => {
    const { ctx } = await setup();

    const updateOperations: IScimUserUpdateOperation[] = [
      {
        op: EScimUpdateOperationType.REPLACE,
        path: 'emails[type eq "work"].value',
        value: 'asd',
      },
      {
        op: EScimUpdateOperationType.REPLACE,
        path: 'active',
        value: 'False',
      },
    ];

    const { mongoFieldProjection } = parseUpdateOperations(
      ctx,
      updateOperations,
      'fakeId'
    );

    expect(mongoFieldProjection).to.deep.equals({
      emails: 1,
      // Soft delete requires both softDeletedAt and game
      softDeletedAt: 1,
      game: 1,
      softDeleteRestorationValues: 1,
    });
  });

  it('should throw uniqueness error if user with userName already exists', async () => {
    const { ctx } = await integrationSetup();
    await createMockUser(
      {
        _id: 'testId',
        organizationId: 'testOrg',
        scim: {
          userName: 'testId@test.com',
          lastProvisionedAt: new Date(),
        },
      },
      { persist: true }
    );
    await createMockUser(
      {
        _id: 'existingUser',
        organizationId: 'testOrg',
        scim: {
          userName: 'existingUser@test.com',
          lastProvisionedAt: new Date(),
        },
      },
      { persist: true }
    );

    const updateOperations: IScimUserUpdateOperation[] = [
      {
        op: EScimUpdateOperationType.REPLACE,
        path: 'userName',
        value: 'existingUser@test.com',
      },
    ];
    await expect(
      ctx.handlers.admin.scim.updateUser(ctx, {
        scimId: 'testId',
        updateOperations,
      })
    ).rejectedWith(
      `Update operation failed for user with scimId testId. Resource with this userName already exists.`
    );
  });

  it('should throw uniqueness error if user with email already exists', async () => {
    const { ctx } = await integrationSetup();
    await createMockUser(
      {
        _id: 'testId',
        organizationId: 'testOrg',
        emails: [{ address: 'testId@test.com' }],
        scim: {
          userName: 'testId@test.com',
          lastProvisionedAt: new Date(),
        },
      },
      { persist: true }
    );

    await createMockUser(
      {
        _id: 'existingUser',
        organizationId: 'testOrg',
        emails: [{ address: 'existingUser@test.com' }],
        scim: {
          userName: 'existingUser@test.com',
          lastProvisionedAt: new Date(),
        },
      },
      { persist: true }
    );

    const updateOperations: IScimUserUpdateOperation[] = [
      {
        op: EScimUpdateOperationType.REPLACE,
        path: 'emails[type eq "work"].value',
        value: 'existingUser@test.com',
      },
    ];
    await expect(
      ctx.handlers.admin.scim.updateUser(ctx, {
        scimId: 'testId',
        updateOperations,
      })
    ).rejectedWith(
      `Update operation failed for user with scimId testId. Resource with this email already exists.`
    );
  });
});
