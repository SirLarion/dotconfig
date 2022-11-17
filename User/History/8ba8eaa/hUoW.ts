import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TCreateUserListCSVFileContext = IMetaContext &
  Pick<IHandlerContext, 'handlers'>;

export type TSelectedUserDataId = {};

export interface ICreateUserListCSVFilePayload {}
export interface ICreateUserListCSVFileResult {}

export type TCreateUserListCSVFileHandlerConfig = IHandlerConfig<
  TCreateUserListCSVFileContext,
  ICreateUserListCSVFilePayload,
  ICreateUserListCSVFileResult
>;
