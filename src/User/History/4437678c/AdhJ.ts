import { expect } from 'chai';
import { Express } from 'express';
import R from 'ramda';
import supertest from 'supertest';

import {
  runHandlerWithAddedRoles,
  runHandlerWithTaskRunnerRole,
} from '@server/core/tasks/lib';
import {
  CORE_USER_SCHEMA,
  EXTENSION_USER_SCHEMA,
} from '@server/domains/admin/scim/lib/common.models';
import { ICreateScimTokenResult } from '@server/domains/auth/scim/lib/createScimToken.models';
import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { createMockOrganization } from '@server/domains/lib/testMockCreators/mockOrganization';
import { createMockUser } from '@server/domains/lib/testMockCreators/mockUser';
import { createStubLogger } from '@server/domains/lib/testUtil';
import {
  createHandlerAppServer,
  createIntegrationCtx,
  withAppConfig,
  withBodyParser,
  withCtx,
  withHiapAuthentication,
  withLogger,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

describe('scim handler-endpoints', () => {
  beforeEach(() => resetDatabase());

  after(() => resetDatabase());

  describe('PUT /services/scim/Users', () => {
    const callEndpointWithoutAuth =
      (server: Express) => (userId: string, data: object) =>
        supertest(server)
          .put(`/services/scim/Users/${userId}`)
          .send(data)
          .set('Accept', 'application/scim+json');

    const callEndpoint =
      (server: Express, auth: string) => (userId: string, data: object) =>
        supertest(server)
          .put(`/services/scim/Users/${userId}`)
          .send(data)
          .set('Accept', 'application/scim+json')
          .set('Authorization', `Bearer ${auth}`);

    const populateDB = async (
      tokenPayload: ICreateScimTokenResult['payload']
    ) => {
      const organization1 = await createMockOrganization(
        {
          _id: 'scim-enabled-organization',
          scim: { authToken: tokenPayload },
          domains: [{ name: 'hox365dev.onmicrosoft.com' }, { name: 'test.fi' }],
        },
        {
          persist: true,
        }
      );
      const organization2 = await createMockOrganization({}, { persist: true });

      const validScimUser1 = await createMockUser(
        {
          _id: 'testUser',
          organizationId: organization1._id,
          emails: [
            {
              address: 'user1.test1@hox365dev.onmicrosoft.com',
            },
          ],
          profile: {
            department: 'department',
            site: 'division',
          },
          scim: {
            userName: 'userName',
            lastProvisionedAt: new Date(),
          },
        },
        { persist: true }
      );

      const validScimUser2 = await createMockUser(
        {
          _id: 'testUser2',
          organizationId: organization1._id,
          emails: [
            {
              address: 'user2.test2@hox365dev.onmicrosoft.com',
            },
          ],
        },
        { persist: true }
      );

      const validScimUser3 = await createMockUser(
        {
          _id: 'testUser3',
          organizationId: organization1._id,
          emails: [
            {
              address: 'user3.test3@hox365dev.onmicrosoft.com',
            },
          ],
        },
        { persist: true }
      );

      const notFoundScimUser = await createMockUser(
        {
          _id: 'notFoundtestUser3',
          organizationId: organization1._id,
        },
        { persist: true }
      );

      const differentOrganizationScimUser = await createMockUser(
        {
          _id: 'testUser4',
          organizationId: organization2._id,
        },
        { persist: true }
      );

      return {
        validScimUser1,
        validScimUser2,
        validScimUser3,
        notFoundScimUser,
        differentOrganizationScimUser,
      };
    };

    const setup = async () => {
      const config = {
        corsAllowedHostGlobs: '',
        httpRedirectAllowedHostGlobs: '',
        scim: {
          scimSigningSecret: 'scim-signing-secret',
        },
        appUrl: 'http://localhost',
      };
      const logger = createStubLogger();

      const ctx = await R.pipe(
        withAppConfig(config),
        withLogger(logger),
        withUserIdentity(await createMockUser()),
        createIntegrationCtx
      )(null);

      const server = await createHandlerAppServer(
        withCtx(ctx),
        withHiapAuthentication,
        withBodyParser()
      )(ctx.app, ctx.handlers);

      const { token, payload } = await runHandlerWithAddedRoles([SUPER_ADMIN])(
        ctx,
        ctx.handlers.auth.scim.createScimToken,
        {}
      );
      const put = callEndpoint(server, token);
      const putWithBadAuth = callEndpoint(server, 'not_valid_token');
      const putWithoutAuth = callEndpointWithoutAuth(server);
      const users = await populateDB(payload);

      return { ctx, put, putWithBadAuth, putWithoutAuth, ...users };
    };

    it('should return 200 and REPLACE attributes correctly', async () => {
      const { ctx, put, validScimUser1 } = await setup();

      const response = await put('testUser', {
        schemas: [CORE_USER_SCHEMA],
        name: {
          givenName: 'test1',
          familyName: 'test2',
        },
        active: false,
        emails: [
          {
            value: 'asdasd@hoxhunt.fi',
            type: 'work',
          },
        ],
        addresses: [
          {
            country: 'testCountry',
            locality: 'testCity',
          },
        ],
        userName: 'userNameNew',
        externalId: 'newExternalId',
      });

      const userAfterUpdate = await runHandlerWithTaskRunnerRole(
        ctx,
        ctx.handlers.collection.user.get,
        { id: validScimUser1._id }
      );

      expect(response.status).to.eq(200, 'http status code should be 200');
      expect(
        R.dissocPath(['meta', 'lastModified'], response.body)
      ).to.deep.equal({
        id: 'testUser',
        schemas: [CORE_USER_SCHEMA, EXTENSION_USER_SCHEMA],
        meta: {
          resourceType: 'User',
          location: 'http://localhost/services/scim/Users/testUser',
          created: validScimUser1.createdAt.toISOString(),
        },
        userName: 'userNameNew',
        name: {
          givenName: 'test1',
          familyName: 'test2',
        },
        [EXTENSION_USER_SCHEMA]: {
          department: 'department',
          division: 'division',
        },
        preferredLanguage: null,
        addresses: [
          {
            primary: true,
            type: 'work',
            country: 'testCountry',
            locality: 'testCity',
          },
        ],
        emails: [
          {
            primary: true,
            type: 'work',
            value: 'asdasd@hoxhunt.fi',
          },
        ],
        active: false,
        externalId: 'newExternalId',
      });
      expect(response.body.meta.lastModified).to.not.equal(undefined);
      expect(userAfterUpdate.profile.firstName).to.equal(
        'test1',
        'firstName should be replaced'
      );
      expect(userAfterUpdate.profile.lastName).to.equal(
        'test2',
        'lastName should be replaced'
      );
      expect(userAfterUpdate.emails[0].address).to.equal(
        'asdasd@hoxhunt.fi',
        'email should be replaced'
      );
      expect(userAfterUpdate.softDeletedAt).to.not.equal(
        undefined,
        'user should have softDeletedAt'
      );
      expect(userAfterUpdate.game.active).to.equal(
        false,
        'game should be deactivated'
      );
      expect(userAfterUpdate.profile.city).to.equal(
        'testCity',
        'city should be set correctly'
      );
      expect(userAfterUpdate.scim.externalId).to.equal(
        'newExternalId',
        'externalId should be set correctly'
      );
    });

    it('should ignore unsupported attributes', async () => {
      const { put } = await setup();

      const response = await put('testUser', {
        schemas: [CORE_USER_SCHEMA],
        name: {
          givenName: 'test1',
          familyName: 'test2',
        },
        unsupportedAttribute: 'test',
      });
      expect(response.status).to.eq(200, 'http status code should be 200');
    });

    it('should return 400 if trying to update wrong format value', async () => {
      const { put } = await setup();

      const response = await put('testUser', {
        schemas: [CORE_USER_SCHEMA],
        emails: {
          wrongFormat: 'asd',
        },
      });

      const expectedResponse = {
        detail: 'Invalid value for attribute',
        schemas: ['urn:ietf:params:scim:api:messages:2.0:Error'],
      };
      expect(response.status).to.eq(400, 'http status code should be 400');
      expect(response.body).to.deep.eq(
        expectedResponse,
        'invalid result should have the correct error'
      );
    });

    it('should return 404 if user with the given scimId is not found', async () => {
      const { put } = await setup();

      const result = await put('notFoundUser', {
        schemas: [CORE_USER_SCHEMA],
        name: {
          givenName: 'asd',
        },
      });
      const response = result.body;

      const expectedResponse = {
        detail: 'Failed to retrieve user with scimId notFoundUser',
        schemas: ['urn:ietf:params:scim:api:messages:2.0:Error'],
      };
      expect(result.status).to.eq(404, 'http status code should be 404');
      expect(response).to.deep.eq(
        expectedResponse,
        'invalid result should have the correct error'
      );
    });

    it('should return 401 without any supplied credentials', async () => {
      const { putWithoutAuth, validScimUser1 } = await setup();
      const id = validScimUser1._id;
      const response = await putWithoutAuth(id, {});
      expect(response.status).to.eql(401);
    });

    it('should return 401 with bad credentials', async () => {
      const { putWithBadAuth, validScimUser1 } = await setup();
      const id = validScimUser1._id;
      const response = await putWithBadAuth(id, {});
      expect(response.status).to.eql(401);
    });
  });
});
