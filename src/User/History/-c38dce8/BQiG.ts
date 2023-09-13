import { Decorators } from '@server/lib/typedSimpleSchema';

import BaseSchema from '../Base';

export interface IIndustry {
  _id: string;
  name: string;
}

export class Industry extends BaseSchema implements IIndustry {
  @Decorators.simpleSchema({
    type: String,
  })
  public _id: string;

  @Decorators.simpleSchema({
    type: String,
  })
  public name: string;
}
