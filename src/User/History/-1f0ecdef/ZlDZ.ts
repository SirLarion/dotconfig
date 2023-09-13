import { durationToDisplayValue } from '../lib';

const EXAMPLE_DURATIONS = [
  {
    seconds: 129600,
    expected: '36h 0m',
  },
  {
    expected: '---',
  },
  {
    seconds: 129720,
    expected: '36h 2m',
  },
  {
    seconds: 129726,
    expected: '36h 2m',
  },
  {
    seconds: 0,
    expected: '0h 0m',
  },
];

describe('<AnalyticsSection> utility functions', () => {
  describe('durationToDisplayValue', () => {
    it('should format durations of seconds correctly', () => {
      EXAMPLE_DURATIONS.forEach(({ seconds, expected }) => {
        expect(durationToDisplayValue(seconds)).toEqual(expected);
      });
    });
  });
});
