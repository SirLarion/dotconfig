import { IGetSignedUrlResult } from '@server/domains/integration/googleCloudStorage/lib/getSignedUrl.models';
import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';
import { IFindUsersBySearchStringPayload } from '@server/domains/user/search/lib/findUsersBySearchString.models';

export type TCreateUserListCSVFileContext = IMetaContext &
  Pick<IHandlerContext, 'handlers' | 'getConfig'>;

export type TSelectedUserDataId =
  | 'firstName'
  | 'lastName'
  | 'emailAddress'
  | 'city'
  | 'country'
  | 'site'
  | 'department'
  | 'stars'
  | 'failureRate'
  | 'missRate'
  | 'successRate'
  | 'anonimity'
  | 'spicyMode'
  | 'trainingLang'
  | 'uiLang'
  | 'scimProvisioned';

export type TUserData = Partial<
  Record<TSelectedUserDataId, string | number | null>
>;

export interface ICreateUserListCSVFilePayload {
  organizationId: string;
  selectedColumns: TSelectedUserDataId[];
  searchParams: IFindUsersBySearchStringPayload;
}

export type TCreateUserListCSVFileHandlerConfig = IHandlerConfig<
  TCreateUserListCSVFileContext,
  ICreateUserListCSVFilePayload,
  IGetSignedUrlResult
>;
