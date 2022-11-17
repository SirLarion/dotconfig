import { TSendResult } from '@server/domains/integration/email/lib/send.models';
import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

import { ICreateUserListCSVFilePayload } from './createUserListCSVFile.models';

export type TRunLargeUserListCSVCreationFlowContext = IMetaContext &
  Pick<IHandlerContext, 'handlers'>;

export interface IRunLargeUserListCSVCreationFlowPayload
  extends ICreateUserListCSVFilePayload {
  impersonatorId?: string;
}

export type TRunLargeUserListCSVCreationFlowHandlerConfig = IHandlerConfig<
  TRunLargeUserListCSVCreationFlowContext,
  IRunLargeUserListCSVCreationFlowPayload,
  TSendResult
>;
