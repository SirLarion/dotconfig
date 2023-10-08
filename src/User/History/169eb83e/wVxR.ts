import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';
import { IIndustry } from '@server/lib/typedSchemas/Industry/Industry';

export type TCreateContext = IMetaContext & Pick<IHandlerContext, 'handlers'>;

export interface ICreatePayload {
  name: string;
}

export type TCreateHandlerConfig = IHandlerConfig<
  TCreateContext,
  ICreatePayload,
  IIndustry
>;