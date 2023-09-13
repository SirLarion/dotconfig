import { TSendResult } from '@server/domains/integration/email/lib/send.models';
import { IHandlerConfig } from '@server/domains/lib/models';

import {
  ICreateUserListCSVFilePayload,
  TCreateUserListCSVFileContext,
} from './createUserListCSVFile.models';

export type TRunLargeUserListCSVCreationFlowHandlerConfig = IHandlerConfig<
  TCreateUserListCSVFileContext,
  ICreateUserListCSVFilePayload,
  TSendResult
>;
