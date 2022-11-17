import { QuestState } from '@hox/frontend-utils/types/graphql.generated';

export type TTestStatus = {
  quest: QuestState;
  training?: boolean;
};

export type TTechnicalTestCase = {
  tester: {
    email: string;
    fullName: string;
  };
  sentAt: string;
  expectedStatus: TTestStatus;
  actualStatus: TTestStatus;
};

export type TGroupedTechnicalTestCase = {
  testName: string;
  testCases: TTechnicalTestCase[];
};
