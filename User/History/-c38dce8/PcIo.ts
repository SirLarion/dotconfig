import { Decorators } from '@server/lib/typedSimpleSchema';

import BaseSchema, { IBaseSchema } from '../Base';

export interface IIndustry extends IBaseSchema {
  name: string;
}

export class Industry extends BaseSchema implements IIndustry {
  @Decorators.simpleSchema({
    type: String,
  })
  public _id: string;

  @Decorators.simpleSchema({
    type: String,
    optional: false,
    min: 2,
    max: 128,
  })
  public name: string;
}
