import { durationToDisplayValue, getDeltas, nodeToDatapoint } from '../lib';
import { TQueryNode } from '../types';

describe('<AnalyticsSection> utility functions', () => {
  describe('durationToDisplayValue', () => {
    const TEST_CASES = [
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
      {
        seconds: -500,
        expected: '---',
      },
      {
        seconds: 600,
        expected: '0h 10m',
      },
    ];

    it('should format durations of seconds correctly', () => {
      TEST_CASES.forEach(({ seconds, expected }) => {
        expect(durationToDisplayValue(seconds)).toEqual(expected);
      });
    });
  });

  describe('nodeToDatapoint', () => {
    const METRIC = 'onboardingRate' as const;

    const TEST_CASES: Array<{
      node: TQueryNode;
      expected: { x: string | null | undefined; y: number };
    }> = [
      {
        node: {
          x: '2022-08-18T00:00:00.000Z',
          successRate: 0.5485257985257985,
          failRate: 0.14864864864864866,
          missRate: 0.30282555282555285,
          onboardingRate: 0.7415730337078652,
          activityRate: 0.7078651685393258,
          reportingTime: 24955,
        },
      },
    ];
  });

  describe('getDeltas', () => {
    const METRIC = 'activityRate' as const;

    const TEST_CASES: Array<{
      data: { a: number | undefined; b: number | undefined };
      expected: number | undefined;
    }> = [
      {
        data: { a: 100, b: 100 },
        expected: 0,
      },
      {
        data: { a: 100, b: 200 },
        expected: 100,
      },
      {
        data: { a: 200, b: 100 },
        expected: -50,
      },
      {
        data: { a: undefined, b: 100 },
        expected: 1,
      },
      {
        data: { a: 200, b: undefined },
        expected: undefined,
      },
      {
        data: { a: 0, b: 200 },
        expected: 1,
      },
      {
        data: { a: 100, b: 0 },
        expected: -100,
      },
    ];

    it('should calculate deltas correctly', () => {
      TEST_CASES.forEach(({ data, expected }) => {
        expect(
          getDeltas({ [METRIC]: data.a }, { [METRIC]: data.b })(METRIC)
        ).toEqual(expected);
      });
    });
  });
});