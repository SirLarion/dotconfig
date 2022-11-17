import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TCreateUserListCSVFileContext = IMetaContext &
  Pick<IHandlerContext, 'handlers'>;

export type TSelectedUserDataId =
  | 'firstName'
  | 'lastName'
  | 'emailAddress'
  | 'city'
  | 'country'
  | 'site'
  | 'department'
  | 'stars'
  | 'failed'
  | 'missed'
  | 'succeeded'
  | 'anonimity'
  | 'spicyMode'
  | 'trainingLang'
  | 'uiLang'
  | 'scimProvisioned';

export interface ICreateUserListCSVFilePayload {}
export interface ICreateUserListCSVFileResult {}

export type TCreateUserListCSVFileHandlerConfig = IHandlerConfig<
  TCreateUserListCSVFileContext,
  ICreateUserListCSVFilePayload,
  ICreateUserListCSVFileResult
>;
