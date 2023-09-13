import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';
import { ICreateUserListCSVFilePayload } from './createUserListCSVFile.models';

export type TRunLargeUserListCSVCreationFlowContext = IMetaContext &
  Pick<IHandlerContext, 'handlers'>;
export interface IRunLargeUserListCSVCreationFlowResult {}

export type TRunLargeUserListCSVCreationFlowHandlerConfig = IHandlerConfig<
  TRunLargeUserListCSVCreationFlowContext,
  ICreateUserListCSVFilePayload,
  IRunLargeUserListCSVCreationFlowResult
>;
