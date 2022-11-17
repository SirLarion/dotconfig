import {
  createCollection,
  createIndexSpec,
} from '@server/lib/collection-helpers';
import { simpleSchemaFactory } from '@server/lib/typedSimpleSchema/factory';

import { IIndustry, Industry } from '../../lib/typedSchemas/Industry/Industry';

export const IndustriesSchema = simpleSchemaFactory(Industry.prototype);

const Industries = createCollection<IIndustry>('Industries', IndustriesSchema, [
  createIndexSpec({
    organizationId: 1,
  }),
]);

Industries.publicFields = {
  _id: 1,
  name: 1,
};

Industries.fields.weakAuthentication.query = Industries.publicFields;

export default Industries;
