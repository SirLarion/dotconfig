import { TSendResult } from '@server/domains/integration/email/lib/send.models';
import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

import {
  TCreateUserListCSVFileContext,
  ICreateUserListCSVFilePayload,
} from './createUserListCSVFile.models';

export type TRunLargeUserListCSVCreationFlowContext = IMetaContext &
  Pick<IHandlerContext, 'handlers'>;

export type TRunLargeUserListCSVCreationFlowHandlerConfig = IHandlerConfig<
  TCreateUserListCSVFileContext,
  ICreateUserListCSVFilePayload,
  TSendResult
>;
