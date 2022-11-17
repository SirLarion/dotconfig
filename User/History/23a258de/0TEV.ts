import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';
import { IIndustry } from '@server/lib/typedSchemas/Industry/Industry';

export type TGetContext = IMetaContext & Pick<IHandlerContext, 'handlers'>;
export interface IGetPayload {
  industryId: string;
}

export type TGetHandlerConfig = IHandlerConfig<
  TGetContext,
  IGetPayload,
  IIndustry
>;
