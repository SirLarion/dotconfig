import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';
import { IIndustry } from '@server/lib/typedSchemas/Industry/Industry';

import { IMongoParams, MONGOID } from '../../lib/mongo/lib/models';

export type TPatchContext = IMetaContext & Pick<IHandlerContext, 'handlers'>;

export interface IPatchPayload {
  data: Partial<IIndustry>;
  id: MONGOID;
  params?: IMongoParams;
}

export type TPatchHandlerConfig = IHandlerConfig<
  TPatchContext,
  IPatchPayload,
  IIndustry
>;
