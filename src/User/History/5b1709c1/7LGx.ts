import { createHash } from 'crypto';
import { formatRelative } from 'date-fns';
import * as R from 'ramda';

import { getExtensionsMongoSelector } from '@server/api/graphql/extensions/applyExtensions';
import { overrideQueryParams } from '@server/api/graphql/utils';
import { expandUsersSearchString } from '@server/domains/user/search/lib/findUsersBySearchString.lib';
import { IFindUsersBySearchStringPayload } from '@server/domains/user/search/lib/findUsersBySearchString.models';
import { IUser } from '@server/lib/typedSchemas';

import {
  ICreateUserListCSVFilePayload,
  TCreateUserListCSVFileContext,
  TSelectedUserDataId,
} from './createUserListCSVFile.models';
import { ICursor } from '@server/domains/collection/lib/mongo/lib/models';

export const GCS_CSV_FOLDER = 'user-csv-exports';

const getRate = (dividend: 'failed' | 'missed' | 'succeeded', user: IUser) => {
  const total = user.player.stats.total;
  return total > 0
    ? `${Math.round((user.player.stats[dividend] / total) * 100)}`
    : '';
};

const USER_DATA_TRANSFORMS: Record<
  TSelectedUserDataId,
  (user: IUser) => string | number
> = {
  firstName: u => u.profile.firstName,
  lastName: u => u.profile.lastName,
  emailAddress: u => u.emails[0].address,
  city: u => u.profile.city,
  country: u => u.profile.country,
  site: u => u.profile.site,
  department: u => u.profile.department,
  stars: u => u.player.stars,
  failRate: u => getRate('failed', u),
  missRate: u => getRate('missed', u),
  successRate: u => getRate('succeeded', u),
  anonimity: u => `${u.profile.isAnonymous}`,
  spicyMode: u => `${u.profile.spicyModeEnabled}`,
  trainingLang: u => u.profile.locale.quests.join(', '),
  uiLang: u => u.profile.locale.ui,
  scimProvisioned: u =>
    u.scim?.lastProvisionedAt
      ? formatRelative(new Date(u.scim?.lastProvisionedAt), new Date())
      : '',
};

const mapDataIdsToUserData = (
  user: IUser,
  selectedDataIds: TSelectedUserDataId[]
) => selectedDataIds.map(id => `${USER_DATA_TRANSFORMS[id](user)}`);

const getFileContents = async (
  cursor: ICursor<IUser>,
  selectedDataIds: TSelectedUserDataId[]
) => {
  let csvRows = [selectedDataIds.join(',')];
  await cursor.forEach(user => {
    const userRow = mapDataIdsToUserData(user, selectedDataIds).join(',');
    csvRows = [...csvRows, userRow];
  });
  return csvRows.join('\n');
};

interface IFetchUserData extends IFindUsersBySearchStringPayload {
  ctx: TCreateUserListCSVFileContext;
  organizationId: string;
  selectedDataIds: TSelectedUserDataId[];
}

export const getFileWithFilePath = async ({
  ctx,
  organizationId,
  selectedDataIds,
  params,
  searchString,
}: IFetchUserData) => {
  const { userSelector } = expandUsersSearchString(
    ctx,
    { organizationId },
    searchString
  );
  const finalUserSelector = R.mergeDeepLeft(userSelector, params.selector);
  const userCursor = await ctx.handlers.collection.user.find(ctx, {
    params: {
      selector: finalUserSelector,
      options: params.options,
    },
  });

  const fileContents = await getFileContents(userCursor, selectedDataIds);
  const fileName = `${ctx.identity.getId()}_${new Date().toISOString()}.csv`;
  const remoteFilePath = `${organizationId}/${GCS_CSV_FOLDER}/${fileName}`;

  return {
    fileContents,
    remoteFilePath,
  };
};
