import { formatRelative } from 'date-fns';
import * as R from 'ramda';

import { getUserSearchPayload } from '@server/api/graphql/resolvers/mutations/utils';
import { ICursor } from '@server/domains/collection/lib/mongo/lib/models';
import { expandUsersSearchString } from '@server/domains/user/search/lib/findUsersBySearchString.lib';
import { IUser } from '@server/lib/typedSchemas';

import {
  ICreateUserListCSVFilePayload,
  TCreateUserListCSVFileContext,
  TSelectedUserDataColumn,
} from './createUserListCSVFile.models';

const getRate = (dividend: 'failed' | 'missed' | 'success', user: IUser) => {
  const total = user.player.stats.total;
  return total > 0
    ? `${Math.round((user.player.stats[dividend] / total) * 100)}`
    : '0';
};

const USER_DATA_TRANSFORMS: Record<
  TSelectedkUserDataColumn,
  (user: IUser) => string | number
> = {
  firstName: u => u.profile.firstName || '',
  lastName: u => u.profile.lastName || '',
  emailAddress: u => u.emails[0].address,
  city: u => u.profile.city || '',
  country: u => u.profile.country || '',
  site: u => u.profile.site || '',
  department: u => u.profile.department || '',
  stars: u => u.player.stars,
  failRate: u => getRate('failed', u),
  missRate: u => getRate('missed', u),
  successRate: u => getRate('success', u),
  anonymity: u => `${u.profile.isAnonymous}`,
  spicyMode: u => `${u.profile.spicyModeEnabled}`,
  trainingLang: u => u.profile.locale.quests.join(' '),
  uiLang: u => u.profile.locale.ui || '',
  scimProvisioned: u =>
    u.scim?.lastProvisionedAt
      ? formatRelative(new Date(u.scim?.lastProvisionedAt), new Date())
      : '',
  trainingStatus: u => (u.game.active ? 'On' : 'Off'),
};

// If there are commas in the data itself, they will destroy the
// structure of the CSV => purge them
const removeCommas = (str: string) => str.replace(/,/g, '');

const mapColumnIdsToUserData = (
  user: IUser,
  selectedColumns: TSelectedUserDataColumn[]
) =>
  selectedColumns.map(id => removeCommas(`${USER_DATA_TRANSFORMS[id](user)}`));

const getFileContents = async (
  cursor: ICursor<IUser>,
  selectedColumns: TSelectedUserDataColumn[]
) => {
  const csvRows = [selectedColumns.join(',')];
  await cursor.forEach(user => {
    const userRow = mapColumnIdsToUserData(user, selectedColumns).join(',');
    csvRows.push(userRow);
  });
  return csvRows.join('\n');
};

interface IFetchUserData extends ICreateUserListCSVFilePayload {
  ctx: TCreateUserListCSVFileContext;
}

export const getFileWithFilePath = async ({
  ctx,
  selectedColumns,
  ...args
}: IFetchUserData) => {
  const { params, searchString } = getUserSearchPayload(args);
  const { userSelector } = expandUsersSearchString(
    ctx,
    { organizationId: args.organizationId },
    searchString
  );
  const finalUserSelector = R.mergeDeepLeft(userSelector, params.selector);
  const userCursor = await ctx.handlers.collection.user.find(ctx, {
    params: {
      selector: finalUserSelector,
      options: params.options,
    },
  });

  const fileContents = await getFileContents(userCursor, selectedColumns);
  const fileName = `${ctx.identity.getId()}_${ctx
    .getGlobal('newDate')()
    .toISOString()}.csv`;
  const remoteFilePath = `${args.organizationId}/${fileName}`;

  return {
    fileContents,
    remoteFilePath,
  };
};
