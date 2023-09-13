import { withUserId } from '@hox/telemetry-shared/gen_attribute_setters';

import { createMigration } from './utils';

const userIds = `NAoFiuTBvH2aYc5iH,
KiknLPF8aHwoWuKMx,
617ffcacbd734a001ac779a1,
6244119b3ef375001b9eb767,
617ffcc54f2f8f001a134b08,
62a7349c2bc669001c9ac70e,
60f543e5c13f581e823ea594,
6267aaaa956ded001b5cd48b,
632c69f5f39fa800185ab35b,
6239ab9e0b3f9f001cb61386,
62b2e49ab8e4f8001b013b78,
622a3a5aeea22f001cb19e31,
62682c2763b5d0001bf060a7,
62682c26956ded001b5d8a73,
62682c28956ded001b5d8a92,
62682c2863b5d0001bf060ac,
62e14b755742240017310c7c,
6238910d9ba4c2001b02e7a8,
62ea391689805d00181c835c,
62960811eaa6dd001c401803,
624c7e4801a9c6001b71dc90,
627d3e0082589b001bc5267b,
62227d23c000b2001b839d2c,
620de6c44d88ba001b228028,
620de6dd4d88ba001b228097,
620de6e64d88ba001b2280df,
61c334b3cd0a21001b5212fa,
620aacf9f3d641001b6df2a9,
620de6d64d88ba001b22806d,
620de6c79cc12c001be1d6f5,
620de6d79cc12c001be1d72d,
620de6ec9cc12c001be1d7b2,
62227d27c000b2001b839d2f,
620de6d44d88ba001b22806b,
620de6c94d88ba001b22803f,
620de6e24d88ba001b2280c3,
620d2c9b9cc12c001be1b649,
620d2bab9cc12c001be1b0f5,
620d2cbe9cc12c001be1b769,
620d2c9c4d88ba001b226106,
620d2c9e4d88ba001b22610a,
620d2c9a9cc12c001be1b63c,
62d981fe929801001c1aba73,
620d2c9c9cc12c001be1b64d,
632ddbf7d453fa0018827f38,
632ddbf6e04fd1001742ffa0,
622a4cc8eea22f001cb1a4a4,
620d2bb69cc12c001be1b16d,
62a8d52d2bc669001c9b2a98,
620d2bb04d88ba001b225ba6,
62bc98b148eda0001cc27cf3,
62bb4e316cf8e6001c4e0c13,
6270040f7a592a001c70b62f,
6270040f7a592a001c70b632,
620d2bec4d88ba001b225c9a,
620d2cbc4d88ba001b226202,
620d2bc64d88ba001b225c0f,
63109c4ce40745001801163`.split(',');

/**
 * Patch departments for selected users to generate new analytics event with correct department data
 * https://github.com/hoxhunt/hox/issues/19897
 */
export default createMigration({
  version: 271,
  up: async (_, ctx) => {
    const logger = ctx.getContextLogger();
    logger.info(ctx, `[v271] Starting migration`);

    await Promise.all(
      userIds.map(async userId => {
        logger.info(
          ctx,
          `[v271] Processing userId ${userId}`,
          withUserId(userId)
        );

        const user = await ctx.handlers.collection.user.get(ctx, {
          id: userId,
        });

        if (!user) {
          logger.info(
            ctx,
            `[v271] User ${userId} not found`,
            withUserId(userId)
          );

          return;
        }

        // Verify that the users actually have empty/null department
        if (!user.profile.department || user.profile.department === '') {
          logger.info(
            ctx,
            `[v271] Patching userId ${userId}`,
            withUserId(userId)
          );
          await ctx.handlers.collection.user.patch(ctx, {
            id: userId,
            data: {
              profile: {
                department: null,
              },
            },
          });
          logger.info(
            ctx,
            `[v271] Patched userId ${userId}`,
            withUserId(userId)
          );
        } else {
          logger.info(
            ctx,
            `[v271] Skipped userId ${userId}`,
            withUserId(userId)
          );
        }
      })
    );

    logger.info(ctx, `[v271] Finished migration`);
  },
});
