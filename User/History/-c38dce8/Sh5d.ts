import { Decorators } from '@server/lib/typedSimpleSchema';

interface IIndustry {
  _id?: string;
  name?: string;
}

export class Industry implements IIndustry {
  @Decorators.simpleSchema({
    optional: true,
    type: String,
  })
  public _id?: string;

  @Decorators.simpleSchema({
    optional: true,
    type: String,
  })
  public name?: string;
}
