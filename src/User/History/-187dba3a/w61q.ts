import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';
import { IIndustry } from '@server/lib/typedSchemas/Industry/Industry';

import { IMongoParams, MONGOID } from '../../lib/mongo/lib/models';

export type TRemoveContext = IMetaContext & Pick<IHandlerContext, 'handlers'>;
export interface IRemovePayload {
  id: MONGOID;
  params?: IMongoParams;
}

export type TRemoveHandlerConfig = IHandlerConfig<
  TRemoveContext,
  IRemovePayload,
  IIndustry
>;
