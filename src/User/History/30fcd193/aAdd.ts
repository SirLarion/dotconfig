import { withOrganizationId } from '@hox/telemetry-shared/context';

import { IOrganization } from '@server/collections/organizations';
import { patch } from '@server/domains/collection/lib/mongo';
import { sanitizeData } from '@server/domains/collection/organization/lib/lib';
import {
  IPatchPayload,
  TPatchContext,
} from '@server/domains/collection/organization/lib/patch.models';
import {
  blacklistInput,
  matchOrganizationId,
  policyAuthorizer,
  whitelistInput,
} from '@server/domains/lib/auth/policy';
import { ACL } from '@server/domains/lib/auth/roles';
import { IHandlerConfig } from '@server/domains/lib/models';
import { organizationAttributes } from '@server/domains/lib/telemetry';

const handler: IHandlerConfig<TPatchContext, IPatchPayload, IOrganization> = {
  roles: [ACL.Roles.ADMIN, ACL.Roles.SUPER_ADMIN, ACL.Roles.TASK_RUNNER],
  telemetry: {
    inputToLogMessageAttributes: payload => [withOrganizationId(payload.id)],
    outputToLogMessageAttributes: organizationAttributes,
  },
  inputAuthorizer: policyAuthorizer<TPatchContext, IPatchPayload>(
    matchOrganizationId({
      inputField: 'id',
      exempt: [ACL.Roles.SUPER_ADMIN, ACL.Roles.TASK_RUNNER],
    }),
    blacklistInput({
      fields: ['data.game.isDemoMode', 'data.apiSettings.googleClientIds'],
      exempt: [ACL.Roles.SUPER_ADMIN],
    }),
    whitelistInput({
      fields: [
        'id',
        'params',
        'data.domains.name',
        'data.domains.defaultUiLanguage',
        'data.domains.defaultSimulationLanguages',
        'data.domains.allowedSimulationLanguages',
        'data.domains.context',
        'data.scim',
        'data.images',
        'data.quizSettings',
        'data.sso',
        'data.delivery.email.useDkim',
        'data.delivery.email.useGmailDeliveryApi',
        'data.delivery.email.customHiddenEmailBodyIdentifier',
        'data.game.spicyModeEnabled',
        'data.game.anonymousLeaderboards',
        'data.game.leaderboardVisibility.individual',
        'data.game.leaderboardVisibility.country',
        'data.game.leaderboardGrouping',
        'data.game.usersAreAnonymousByDefault',
        'data.incidentSettings.vtApiKey',
        'data.threatSettings.reportToPlatform',
        'data.plugin.removeThreatAfterReporting',
        'data.plugin.removeSimulationAfterReporting',
        'data.plugin.userActedOnQuestionsEnabled',
        'data.pluginRedirect',
      ],
      exempt: [ACL.Roles.SUPER_ADMIN, ACL.Roles.TASK_RUNNER],
    })
  ),
  handler: async (
    ctx: TPatchContext,
    { data, ...rest }: IPatchPayload
  ): Promise<IOrganization> => {
    return patch(ctx, { data: await sanitizeData(ctx, data), ...rest });
  },
};
export default handler;
