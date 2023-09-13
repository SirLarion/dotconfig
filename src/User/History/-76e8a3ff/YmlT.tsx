import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Meta, Story } from '@storybook/react';

import { themeLight } from '@hox/ui/styles/theme';

import { DeactivationReason } from '../../../../../types/graphql.generated';
import { TTrainingRuleHistoryEntry } from '../../../hooks/useTrainingRules';

import { IQuestTemplateActivityLogProps, QuestTemplateActivityLog } from '.';

export default {
  title: 'Admin/Components/QuestTemplateActivityLog',
  component: QuestTemplateActivityLog,
  argTypes: {},
} as Meta;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 6rem;
  background-color: white;

  > :first-child {
    max-width: 32rem;
  }
`;

const dummyHistoryEntries: TTrainingRuleHistoryEntry[] = [
  // @ts-ignore this is just dummy data we don't care about the missing __typename
  {
    enabled: false,
    timestamp: '2021-10-12T09:45:57.621Z',
    deactivationReason: DeactivationReason.SENSITIVE_INFORMATION,
    user: null,
  },
  {
    enabled: true,
    timestamp: '2021-10-15T09:46:14.328Z',
    deactivationReason: null,
    comment:
      "My employee cried for hours after receiving this quest and that's a good thing. My employee cried for hours after receiving this quest and that's a good thing.",
    // @ts-ignore
    user: {
      profile: {
        firstName: 'Sara',
        lastName: 'Suviranta',
      },
    },
  },
  {
    enabled: true,
    timestamp: '2021-10-15T09:46:14.328Z',
    deactivationReason: null,
    comment:
      "My employee cried for hours after receiving this quest and that's a good thing.",
    // @ts-ignore
    user: {
      profile: {
        firstName: 'Sara',
        lastName: 'Suviranta',
      },
    },
  },
];

const Template: Story<IQuestTemplateActivityLogProps> = ({
  historyEntries = dummyHistoryEntries,
  ...args
}) => (
  <ThemeProvider theme={themeLight}>
    <Wrapper>
      <QuestTemplateActivityLog historyEntries={historyEntries} {...args} />
    </Wrapper>
  </ThemeProvider>
);
export const Default = Template.bind({});
