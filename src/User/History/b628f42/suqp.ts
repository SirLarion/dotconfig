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

const INVALID_EMAILS = [
  { address: '', error: 'Cannot be empty' },
  { address: '@foxhunt.com', error: 'Local part cannot be empty' },
  { address: 'jamppa.korhonen@hox.hunt', error: 'Domain has to exist' },
];

describe('User details edit validation', () => {
  describe('Email', () => {
    const validationRules = getEmailValidationRules(MOCK_EXISTING_DOMAINS);

    it('should pass valid email addresses', () => {
      validationRules.forEach(rule =>
        VALID_EMAILS.forEach(email => expect(rule.predicate(email)).eql(true))
      );
    });

    it('should block invalid email addresses with the correct error message', () => {
      INVALID_EMAILS.forEach(({ address, error }) => {
        validationRules.forEach(rule => {
          console.log('rule.message', rule.message);
          if (!rule.predicate(address)) {
            expect(rule.message).eql(error);

            // Break on first falsy predicate
            return;
          }
        });
      });
    });
  });
});
