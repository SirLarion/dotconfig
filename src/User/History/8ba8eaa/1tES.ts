import { IGetSignedUrlResult } from '@server/domains/integration/googleCloudStorage/lib/getSignedUrl.models';
import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';
import { IFindUsersBySearchStringPayload } from '@server/domains/user/search/lib/findUsersBySearchString.models';

export type TCreateUserListCSVFileContext = IMetaContext &
  Pick<IHandlerContext, 'handlers' | 'getConfig' | 'getGlobal'>;

export const USER_DATA_COLUMNS = [
  'firstName',
  'lastName',
  'emailAddress',
  'city',
  'country',
  'site',
  'department',
  'stars',
  'failRate',
  'missRate',
  'successRate',
  'anonymity',
  'spicyMode',
  'trainingLang',
  'uiLang',
  'scimProvisioned',
] as const;

export type TSelectedUserDataColumn = typeof USER_DATA_COLUMNS[number];

export type TUserData = Partial<
  Record<TSelectedUserDataColumn, string | number | null>
>;

export interface ICreateUserListCSVFilePayload {
  organizationId: string;
  selectedColumns: TSelectedUserDataColumn[];
  search?: string;
  filter?: Record<string, unknown>;
}

export type TCreateUserListCSVFileHandlerConfig = IHandlerConfig<
  TCreateUserListCSVFileContext,
  ICreateUserListCSVFilePayload,
  IGetSignedUrlResult
>;