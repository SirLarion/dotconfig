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

    it('should not pass invalid email addresses', () => {
      INVALID_EMAILS.forEach(({ address, error }) => {
        validationRules.forEach(rule => {
          if (!rule.predicate(address)) {
            expect(rule.message);
            return;
          }
        });
      });
      // validationRules.forEach(rule =>
      //   INVALID_EMAILS.forEach(({ address, error }) => {
      //     expect(rule.predicate(address)).eql(false);
      //     expect()
      //   })
      // );
    });
  });
});
