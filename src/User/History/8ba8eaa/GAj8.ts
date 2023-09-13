import { IGetSignedUrlResult } from '@server/domains/integration/googleCloudStorage/lib/getSignedUrl.models';
import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TCreateUserListCSVFileContext = IMetaContext &
  Pick<IHandlerContext, 'handlers' | 'getConfig' | 'getGlobal'>;

export const USER_DATA_COLUMNS = [
  'firstName',
  'lastName',
  'email',
  'city',
  'country',
  'site',
  'department',
  'stars',
  'failRate',
  'missRate',
  'successRate',
  'isAnonymous',
  'spicyMode',
  'questLanguages',
  'language',
  'scimProvisioned',
  'trainingStatus',
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
