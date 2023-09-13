import { ACL, EUserRole } from '@server/domains/lib/auth/roles';

import { TFindAdminsByOrganizationIdHandlerConfig } from './lib/findAdminsByOrganizationId.models';

const findAdminsByOrganizationId: TFindAdminsByOrganizationIdHandlerConfig = {
  roles: [ACL.Roles.SUPER_ADMIN, ACL.Roles.TASK_RUNNER],
  async handler(ctx, { organizationId }) {
    return ctx.handlers.collection.user
      .find(ctx, {
        params: {
          selector: {
            organizationId,
            [`roles.${organizationId}`]: EUserRole.ADMIN,
          },
        },
      })
      .then(c => c.fetch());
  },
};

export default findAdminsByOrganizationId;
