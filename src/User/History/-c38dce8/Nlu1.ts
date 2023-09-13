import { Decorators } from '@server/lib/typedSimpleSchema';

interface IIndustry {
  _id: string;
  name: string;
}

export class Industry implements IIndustry {
  @Decorators.simpleSchema({
    type: String,
  })
  public _id: string;

  @Decorators.simpleSchema({
    type: String,
  })
  public name: string;
}
