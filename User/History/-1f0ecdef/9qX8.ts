import {
  durationToDisplayValue,
  extractIdAndNodes,
  getDeltas,
  mapTimeframeToGqlVariables,
  nodeToDatapoint as nodeToDatapointGetter,
} from '../lib';
import {
  TAnalyticsQueryResult,
  TAnalyticsTimeframe,
  TQueryNode,
} from '../types';

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
          successRate: 0.5,
          failRate: 0.14,
          missRate: 0.3,
          onboardingRate: 0.74,
          activityRate: 0.7,
          reportingTime: 25000,
        },
        expected: {
          x: '2022-08-18',
          y: 0.74,
        },
      },
      {
        node: {},
        expected: {
          x: undefined,
          y: 0,
        },
      },
      {
        node: {
          x: null,
          onboardingRate: 0,
        },
        expected: {
          x: null,
          y: 0,
        },
      },
      {
        node: {
          x: '2022-08-18',
          onboardingRate: 58,
        },
        expected: {
          x: '2022-08-18',
          y: 58,
        },
      },
      {
        node: {
          x: 'asd',
          onboardingRate: 15,
        },
        expected: {
          x: undefined,
          y: 15,
        },
      },
      {
        node: {
          x: null,
          onboardingRate: null,
        },
        expected: {
          x: null,
          y: 0,
        },
      },
    ];

    it('should convert GQL query nodes to Nivo datapoints correctly', () => {
      TEST_CASES.forEach(({ node, expected }) => {
        const nodeToDatapoint = nodeToDatapointGetter(METRIC);
        expect(nodeToDatapoint(node)).toEqual(expected);
      });
    });
  });

  describe('extractIdAndNodes', () => {
    const TEST_CASES: Array<{
      data: TAnalyticsQueryResult | undefined;
      expected: { id: string; nodes: TQueryNode[] };
    }> = [
      {
        data: {
          currentUser: {
            organization: {
              _id: 'blaablaa',
              analytics: {
                analyticsCubesBeta: {
                  dataSet: {
                    nodes: [
                      {
                        x: '2022-08-18T00:00:00.000Z',
                        successRate: 0.5,
                        failRate: 0.14,
                        missRate: 0.3,
                        onboardingRate: 0.74,
                        activityRate: 0.7,
                        reportingTime: 25000,
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        expected: {
          id: 'blaablaa',
          nodes: [
            {
              x: '2022-08-18T00:00:00.000Z',
              successRate: 0.5,
              failRate: 0.14,
              missRate: 0.3,
              onboardingRate: 0.74,
              activityRate: 0.7,
              reportingTime: 25000,
            },
          ],
        },
      },
      {
        data: undefined,
        expected: {
          id: '',
          nodes: [],
        },
      },
      {
        data: {
          currentUser: undefined,
        },
        expected: {
          id: '',
          nodes: [],
        },
      },
      {
        data: {
          currentUser: {
            organization: {
              _id: 'dingodongo',
              analytics: { analyticsCubesBeta: undefined },
            },
          },
        },
        expected: {
          id: 'dingodongo',
          nodes: [],
        },
      },
      {
        data: {
          currentUser: {
            organization: {
              _id: 'ei_valiaeae',
              analytics: {
                analyticsCubesBeta: {
                  dataSet: {
                    nodes: [{}],
                  },
                },
              },
            },
          },
        },
        expected: {
          id: 'ei_valiaeae',
          nodes: [{}],
        },
      },
    ];
    it('should output org id and nodes correctly regardless of input', () => {
      TEST_CASES.forEach(({ data, expected }) =>
        expect(extractIdAndNodes(data)).toEqual(expected)
      );
    });
  });

  describe('mapTimeframeToGqlVariables', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2022-08-18'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    const TEST_CASES: Array<{
      timeframe: TAnalyticsTimeframe;
      expected: { startDate: string };
    }> = [{ timeframe: 'month', expected: { startDate: '2022-07-18' } }];

    it('should calculate query start dates correctly', () => {
      TEST_CASES.forEach(({ timeframe, expected }) =>
        expect(mapTimeframeToGqlVariables(timeframe)).toEqual(expected)
      );
    });
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
