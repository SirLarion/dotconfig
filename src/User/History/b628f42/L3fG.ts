import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { getEmailValidationRules } from '../validation';

chai.use(chaiAsPromised);

const MOCK_EXISTING_DOMAINS = [
  { name: 'foxhunt.com' },
  { name: 'soxhunt.com' },
  { name: 'roxhunt.com' },
];

const VALID_EMAILS = [
  'testi@foxhunt.com',
  'jamppa.korhonen@soxhunt.com',
  'hello@roxhunt.com',
  'hi@foxhunt.com',
];

const INVALID_EMAILS = ['', '@'];

const setup = () => {};

describe('User details edit validation', () => {
  describe('Email', () => {
    const validationRules = getEmailValidationRules(MOCK_EXISTING_DOMAINS);

    it('should pass valid email addresses', () => {
      validationRules.forEach(rule => rule.predicate());
    });
  });
});
