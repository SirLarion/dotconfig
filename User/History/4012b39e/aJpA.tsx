import React, { FC, ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import { FormattedDate } from 'react-intl';

import { QuestState } from '@hox/frontend-utils/types/graphql.generated';
import { Blocks } from '@hox/ui/Blocks';
import { palette, themeProp } from '@hox/ui/styles/theme';
import { ButtonText, SmallText } from '@hox/ui/Text';

import { Accordion } from '../../../../components/Accordion';
import { GridList, RowBase } from '../../../../components/GridList';
import { QUEST_STATE_INTL } from '../../intl';
import { TTechnicalTestCase, TTestStatus } from '../../types';

import { TechnicalTestTableHeader } from './components/Header';
import { PassIndicator } from './components/PassIndicator';

const TechnicalTestTableStyled = styled.div`
  border-radius: ${themeProp(t => t.borderRadius.default)};
  background-color: ${palette(p => p.background.primary)};
`;

const LayoutRowStyled = styled(Blocks.Row)`
  padding: 1.5rem;
  cursor: pointer;
`;

const listGridStyle = css`
  display: grid;
  grid-template-columns: 20rem repeat(3, 0.75fr) 0.5fr;
  grid-gap: 1rem;
  padding: 1rem;
  border: 1px solid ${palette(p => p.accent.boring.faded)};
`;

const TechnicalTestTableColumnsStyled = styled.div`
  ${listGridStyle};
  border: none;

  > div {
    user-select: none;
  }
`;

const TableBody = styled.div`
  padding: 1.5rem;
  padding-top: 0;
`;

const isPass = (expectedStatus: TTestStatus, actualStatus: TTestStatus) => {
  const { QUEST_STATE_NOT_STARTED, QUEST_STATE_STARTED } = QuestState;

  if (
    actualStatus.quest === QUEST_STATE_NOT_STARTED ||
    actualStatus.quest === QUEST_STATE_STARTED
  ) {
    return undefined;
  }

  return (
    expectedStatus.quest === actualStatus.quest &&
    !!expectedStatus.training === !!actualStatus.training
  );
};

export interface ITechnicalTestTableProps {
  testName: ReactNode;
  testCases: TTechnicalTestCase[];
}

export const TechnicalTestTable: FC<ITechnicalTestTableProps> = ({
  testName,
  testCases,
  ...restProps
}) => {
  const [open, setOpen] = useState(true);

  console.log(testCases);

  return (
    <TechnicalTestTableStyled {...restProps}>
      <Accordion
        open={open}
        header={
          <LayoutRowStyled
            justifyContent="space-between"
            onClick={() => setOpen(!open)}
          >
            <TechnicalTestTableHeader
              testCases={testCases}
              testName={testName}
            />
            <Accordion.Caret open={open} />
          </LayoutRowStyled>
        }
        body={
          <TableBody>
            <TechnicalTestTableColumnsStyled>
              <SmallText dimmed>Tester</SmallText>
              <SmallText dimmed>Sent at</SmallText>
              <SmallText dimmed>Expected status</SmallText>
              <SmallText dimmed>Actual status</SmallText>
              <SmallText dimmed>Pass</SmallText>
            </TechnicalTestTableColumnsStyled>

            <GridList>
              {testCases.map(
                ({ tester, sentAt, expectedStatus, actualStatus }, index) => (
                  <RowBase key={`${sentAt}-${index}`} $style={listGridStyle}>
                    <div>
                      <ButtonText>{tester.fullName}</ButtonText>
                      <ButtonText dimmed>{tester.email}</ButtonText>
                    </div>
                    <ButtonText>
                      <FormattedDate
                        value={sentAt}
                        day="numeric"
                        month="numeric"
                        year="numeric"
                        hour="numeric"
                        minute="numeric"
                      />
                    </ButtonText>
                    <ButtonText>
                      {QUEST_STATE_INTL[expectedStatus.quest]}
                    </ButtonText>
                    <ButtonText>
                      {actualStatus
                        ? QUEST_STATE_INTL[actualStatus.quest]
                        : '-'}
                    </ButtonText>
                    <PassIndicator
                      pass={isPass(expectedStatus, actualStatus)}
                    />
                  </RowBase>
                )
              )}
            </GridList>
          </TableBody>
        }
      />
    </TechnicalTestTableStyled>
  );
};
