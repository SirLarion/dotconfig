import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';
import { IIndustry } from '@server/lib/typedSchemas/Industry/Industry';

import { MONGOID } from '../../lib/mongo/lib/models';

export type TRemoveContext = IMetaContext & Pick<IHandlerContext, 'handlers'>;
export interface IRemovePayload {
  id: MONGOID;
}

export type TRemoveHandlerConfig = IHandlerConfig<
  TRemoveContext,
  IRemovePayload,
  IIndustry
>;
