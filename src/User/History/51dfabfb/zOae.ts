import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';
import { IIndustry } from '@server/lib/typedSchemas/Industry/Industry';

import { ICursor } from '../../lib/mongo/lib/models';

export type TFindContext = IMetaContext & Pick<IHandlerContext, 'handlers'>;
export interface IFindPayload {
  params?: IMongoParams;
}

export type TFindICursor = ICursor<IIndustry>;

export type TFindHandlerConfig = IHandlerConfig<
  TFindContext,
  IFindPayload,
  TFindICursor
>;
