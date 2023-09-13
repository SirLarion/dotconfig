import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';
import { IUser } from '@server/lib/typedSchemas';

export type TCreateUserListCSVFileContext = IMetaContext &
  Pick<IHandlerContext, 'handlers', 'getConfig'>;

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
  users: IUser[];
  selectedDataIds: TSelectedUserDataId[];
}
export interface ICreateUserListCSVFileResult {}

export type TCreateUserListCSVFileHandlerConfig = IHandlerConfig<
  TCreateUserListCSVFileContext,
  ICreateUserListCSVFilePayload,
  ICreateUserListCSVFileResult
>;
