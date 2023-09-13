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
  PATCH_SCHEMA,
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
import { ESupportedLocales } from '@server/lib/i18n';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

describe('scim handler-endpoints', () => {
  beforeEach(() => resetDatabase());

  after(() => resetDatabase());

  describe('PATCH /services/scim/Users', () => {
    const callEndpointWithoutAuth =
      (server: Express) => (userId: string, data: object) =>
        supertest(server)
          .patch(`/services/scim/Users/${userId}`)
          .send(data)
          .set('Accept', 'application/scim+json');

    const callEndpoint =
      (server: Express, auth: string) => (userId: string, data: object) =>
        supertest(server)
          .patch(`/services/scim/Users/${userId}`)
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
            locale: {
              ui: 'fi' as ESupportedLocales,
            },
          },
          scim: {
            userName: 'validScimUser1',
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
          scim: {
            userName: 'validScimUser2',
            lastProvisionedAt: new Date(),
          },
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
          scim: {
            userName: 'validScimUser3',
            lastProvisionedAt: new Date(),
          },
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
      const patch = callEndpoint(server, token);
      const patchWithBadAuth = callEndpoint(server, 'not_valid_token');
      const patchWithoutAuth = callEndpointWithoutAuth(server);
      const users = await populateDB(payload);

      return { ctx, patch, patchWithBadAuth, patchWithoutAuth, ...users };
    };

    it('should return 200 and REPLACE work type emails and return the changed scim object with given attributes', async () => {
      const { ctx, patch, validScimUser1 } = await setup();

      const response = await patch('testUser', {
        schemas: [PATCH_SCHEMA],
        Operations: [
          {
            path: 'emails[type eq "work"].value',
            value: 'test@test.fi',
            op: 'Replace',
          },
        ],
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
        userName: validScimUser1.scim.userName,
        name: {
          givenName: validScimUser1.profile.firstName,
          familyName: validScimUser1.profile.lastName,
        },
        [EXTENSION_USER_SCHEMA]: {
          department: 'department',
          division: null,
        },
        preferredLanguage: null,
        addresses: [
          { primary: true, type: 'work', country: null, locality: null },
        ],
        emails: [{ primary: true, type: 'work', value: 'test@test.fi' }],
        active: true,
        externalId: null,
      });
      expect(response.body.meta.lastModified).to.not.equal(undefined);
      expect(userAfterUpdate.emails).to.deep.equal(
        [
          {
            address: 'test@test.fi',
          },
        ],
        'user should have the old email replaced with the new'
      );
    });

    // todo(Anssi): this test does seem rather insane, because without email
    // our user is effectively blocked out
    it('should return 200 and DELETE email and return the changed user', async () => {
      const { ctx, patch, validScimUser1 } = await setup();

      const response = await patch('testUser', {
        schemas: [PATCH_SCHEMA],
        Operations: [
          {
            path: 'emails[type eq "work"].value',
            op: 'Remove',
          },
        ],
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
        userName: 'validScimUser1',
        name: {
          givenName: validScimUser1.profile.firstName,
          familyName: validScimUser1.profile.lastName,
        },
        [EXTENSION_USER_SCHEMA]: {
          department: 'department',
          division: null,
        },
        preferredLanguage: null,
        addresses: [
          { primary: true, type: 'work', country: null, locality: null },
        ],
        // email value is null because our mapping removes the email
        // object altogether, hence difference to other attribute removals
        emails: [{ primary: true, type: 'work', value: null }],
        active: true,
        externalId: null,
      });
      expect(response.body.meta.lastModified).to.not.equal(undefined);
      expect(userAfterUpdate.emails).to.deep.equal(
        [],
        'user should have the old email deleted'
      );
    });

    it('should return 200 and ADD(replace) new email and return the changed user', async () => {
      const { ctx, patch, validScimUser1 } = await setup();

      const response = await patch('testUser', {
        schemas: [PATCH_SCHEMA],
        Operations: [
          {
            path: 'emails[type eq "work"].value',
            value: 'test@test.fi',
            op: 'Add',
          },
        ],
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
        userName: validScimUser1.scim.userName,
        name: {
          givenName: validScimUser1.profile.firstName,
          familyName: validScimUser1.profile.lastName,
        },
        [EXTENSION_USER_SCHEMA]: {
          department: 'department',
          division: null,
        },
        preferredLanguage: null,
        addresses: [
          { primary: true, type: 'work', country: null, locality: null },
        ],
        emails: [{ primary: true, type: 'work', value: 'test@test.fi' }],
        active: true,
        externalId: null,
      });
      expect(response.body.meta.lastModified).to.not.equal(undefined);
      expect(userAfterUpdate.emails).to.deep.equal(
        [{ address: 'test@test.fi' }],
        'user should have the old email replaced with the new'
      );
    });

    it('should return 200 and complete multiple operations on user', async () => {
      const { ctx, patch, validScimUser1 } = await setup();

      const response = await patch('testUser', {
        schemas: [PATCH_SCHEMA],
        Operations: [
          {
            path: 'emails[type eq "work"].value',
            value: 'test@test.fi',
            op: 'Replace',
          },
          {
            path: 'name.givenName',
            value: 'newName',
            op: 'Replace',
          },
          {
            path: 'name.familyName',
            value: 'newLastName',
            op: 'Replace',
          },
          {
            path: 'urn:ietf:params:scim:schemas:extension:enterprise:2.0:user:division',
            value: 'newDivision',
            op: 'Add',
          },
          {
            path: 'preferredLanguage',
            value: 'en',
            op: 'Replace',
          },
          {
            path: 'urn:ietf:params:scim:schemas:extension:enterprise:2.0:user:department',
            op: 'Remove',
          },
          {
            path: 'active',
            value: 'False',
            op: 'Replace',
          },
          {
            path: 'userName',
            value: 'newUserName',
            op: 'Replace',
          },
        ],
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
        userName: 'newUserName',
        name: {
          givenName: 'newName',
          familyName: 'newLastName',
        },
        [EXTENSION_USER_SCHEMA]: {
          department: null,
          division: 'newDivision',
        },
        preferredLanguage: 'en',
        addresses: [
          { primary: true, type: 'work', country: null, locality: null },
        ],
        emails: [{ primary: true, type: 'work', value: 'test@test.fi' }],
        active: false,
        externalId: null,
      });
      expect(response.body.meta.lastModified).to.not.equal(undefined);
      expect(userAfterUpdate).to.deep.equal(
        {
          ...userAfterUpdate,
          emails: [{ address: 'test@test.fi' }],
          profile: {
            ...R.omit(['department'], userAfterUpdate.profile),
            firstName: 'newName',
            lastName: 'newLastName',
          },
        },
        'new user should have new emails, first name, last name and department removed'
      );
      expect(validScimUser1.softDeletedAt).to.be.an('undefined');
    });

    it('should return 404 if user with the given scimId is not found', async () => {
      const { patch } = await setup();

      const result = await patch('notFoundUser', {
        schemas: [PATCH_SCHEMA],
        Operations: [
          {
            path: 'emails[type eq "work"].value',
            op: 'Remove',
          },
        ],
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

    it('should return 400 if there was an error with an operation', async () => {
      const { patch } = await setup();

      const result = await patch('testUser', {
        schemas: [PATCH_SCHEMA],
        Operations: [
          {
            path: 'emails[type eq "work"].value sqdqdqwdqwd',
            op: 'removeasdsad',
          },
        ],
      });
      const response = result.body;

      const expectedResponse = {
        detail: 'Update operation failed for user with scimId testUser',
        schemas: ['urn:ietf:params:scim:api:messages:2.0:Error'],
        scimType: 'invalidPath',
      };
      expect(result.status).to.eq(400, 'http status code should be 400');
      expect(response).to.eql(
        expectedResponse,
        'invalid result should have the correct error'
      );
    });

    it('should return 400 and not modify the user if another operation fails after a succesful operation', async () => {
      const { ctx, patch, validScimUser1 } = await setup();

      const result = await patch('testUser', {
        schemas: [PATCH_SCHEMA],
        Operations: [
          {
            path: 'emails[type eq "work"].value',
            value: 'test@test.fi',
            op: 'Replace',
          },
          {
            path: 'invalidOperation',
            value: 'test@test.fi',
            op: 'Replace',
          },
        ],
      });
      const response = result.body;

      const expectedResponse = {
        detail: 'Update operation failed for user with scimId testUser',
        schemas: ['urn:ietf:params:scim:api:messages:2.0:Error'],
        scimType: 'invalidPath',
      };
      expect(result.status).to.eq(400, 'http status code should be 400');
      expect(response).to.deep.eq(
        expectedResponse,
        'invalid result should have expected error'
      );

      const newUser = await runHandlerWithTaskRunnerRole(
        ctx,
        ctx.handlers.collection.user.get,
        { id: validScimUser1._id }
      );
      expect(newUser.emails).to.deep.equal(validScimUser1.emails);
    });

    it('should return 401 without any supplied credentials', async () => {
      const { patchWithoutAuth, validScimUser1 } = await setup();
      const id = validScimUser1._id;
      const response = await patchWithoutAuth(id, {});
      expect(response.status).to.eql(401);
    });

    it('should return 401 with bad credentials', async () => {
      const { patchWithBadAuth, validScimUser1 } = await setup();
      const id = validScimUser1._id;
      const response = await patchWithBadAuth(id, {});
      expect(response.status).to.eql(401);
    });
  });
});
