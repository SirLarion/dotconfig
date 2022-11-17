import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { getEmailValidationRules } from '../validation';

chai.use(chaiAsPromised);

const setup = () => {};

describe('User details edit validation', async () => {
  it('should validate  input email addresses', () => {
    getEmailValidationRules;
  });
});
