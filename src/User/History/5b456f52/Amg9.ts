import { groupBy } from 'ramda';

import { TestQuestFieldsFragmentFragment } from '../../../graphql/__generated__/fragments.generated';
import {
  expectedTestQuestStateMap,
  getMicrotrainingStatus,
} from '../../../lib';
import { TGroupedTechnicalTestCase, TTechnicalTestCase } from '../../../types';

export const useGroupTestCases = (tests: TestQuestFieldsFragmentFragment[]) => {
  const groupByTag = groupBy(
    (testCase: TestQuestFieldsFragmentFragment) => testCase.tag
  );

  const formatTestCase = (
    testCase: TestQuestFieldsFragmentFragment
  ): TTechnicalTestCase => ({
    tester: {
      email: testCase.user?.emails[0].address ?? '-',
      fullName: `${testCase.user?.profile.firstName} ${testCase.user?.profile.lastName}`,
    },
    sentAt: testCase.startsAt,
    expectedStatus: expectedTestQuestStateMap[testCase.tag],
    actualStatus: {
      quest: testCase.state,
      training: getMicrotrainingStatus(testCase),
    },
  });

  const groupedTests: TGroupedTechnicalTestCase[] = Object.entries(
    groupByTag(tests)
  ).map(([tag, cases]) => ({
    testName: cases[0].email?.subject || tag,
    testCases: cases.map(formatTestCase),
  }));

  return { groupedTests };
};
