import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { getEmailValidationRules } from '../validation';

chai.use(chaiAsPromised);

const MOCK_EXISTING_DOMAINS = [
  { name: 'foxhunt.com' },
  { name: 'soxhunt.com' },
  { name: 'roxhunt.com' },
];

const setup = () => {};

describe('User details edit validation', () => {
  describe('Email', () => {
    const validationRules = getEmailValidationRules(MOCK_EXISTING_DOMAINS);
    it('should pass valid email addresses', () => {});
  });
});
