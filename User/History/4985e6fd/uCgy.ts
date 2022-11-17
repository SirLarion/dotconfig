import { addMinutes } from 'date-fns';

import {
  withOrganizationId,
  withUserId,
} from '@hox/telemetry-shared/gen_attribute_setters';

import { TASK_RUNNER } from '@server/domains/lib/auth/roles';
import { errorNotFound } from '@server/util/error';

import { TFetchEmailDeliveryAccessTokenHandlerConfig } from './lib/fetchEmailDeliveryAccessToken.models';

const asJwtTime = (date: Date) => Math.floor(date.getTime() / 1000);

const fetchEmailDeliveryAccessToken: TFetchEmailDeliveryAccessTokenHandlerConfig =
  {
    roles: [TASK_RUNNER],
    async handler(ctx, { emailAddress: email, organizationId, userId }) {
      const user = await ctx.handlers.collection.user.get(ctx, {
        id: userId,
        params: {
          selector: { organizationId },
        },
      });
      const emailAddress = user?.emails[0].address || email;

      const { requiredScopes } = await ctx.getConfig('gmailApiDelivery');
      const { clientEmail, privateKey } =
        await ctx.handlers.integration.gmail.getApiCredentials(ctx, {});

      const now = new Date();
      const jwt = await ctx.handlers.infrastructure.jwt.create(ctx, {
        payload: {
          iss: clientEmail,
          scope: requiredScopes,
          aud: 'https://oauth2.googleapis.com/token',
          // Google uses email address as an id.
          // The access token will impersonate the given user
          sub: emailAddress,
          iat: asJwtTime(now),
          exp: asJwtTime(addMinutes(now, 10)),
        },
        options: {
          secret: privateKey,
          /**
           * The only signing algorithm supported by the Google OAuth 2.0 Authorization Server is RSA using SHA-256 hashing algorithm.
           * This is expressed as RS256 in the alg field in the JWT header.
           */
          algorithm: 'RS256',
        },
      });

      const {
        statusCode,
        data: { access_token: accessToken, error_description: errorMessage },
      } = await ctx.handlers.integration.http.request(ctx, {
        url: 'https://oauth2.googleapis.com/token',
        method: 'post',
        params: {
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: jwt,
        },
      });

      if (statusCode !== 200) {
        throw errorNotFound(
          ctx,
          errorMessage || 'Failed to fetch api access token',
          withOrganizationId(organizationId),
          withUserId(user?._id)
        );
      }

      return { accessToken };
    },
  };

export default fetchEmailDeliveryAccessToken;
