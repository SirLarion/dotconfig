import React, { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { identity } from 'ramda';
import { useFlexLayout, useTable } from 'react-table';
import { FixedSizeList } from 'react-window';
import { useRecoilValue } from 'recoil';

import { FormattedMessage } from '@hox/frontend-utils/MockFormattedMessage';
import { HoxIcon } from '@hox/ui/HoxIcon';
import { palette } from '@hox/ui/styles/theme';
import { SmallText } from '@hox/ui/Text';
import { Tooltip } from '@hox/ui/Tooltip';

import { userImportMeasurementsPx } from '../../lib';
import { selectDisplayedUserIds } from '../../recoil/selectors';

import { UserImportTableHeader } from './components/UserImportTableHeader';
import { UserImportTableRow } from './components/UserImportTableRow';
import { ITableColumnHeader } from './models';

const StyledUserImportTable = styled.div`
  color: ${palette(p => p.foreground.primary)};

  > :first-child {
    margin-bottom: 0.5rem;
  }

  // overriding inline styles
  > :last-child {
    overflow-x: hidden !important;
  }
`;

const columns: ITableColumnHeader[] = [
  {
    Header: 'Select all',
    accessor: identity,
    maxWidth: 25,
  },
  {
    Header: 'Email',
    accessor: identity,
  },
  {
    Header: 'Name',
    accessor: identity,
    maxWidth: 120,
  },
  {
    Header: 'Location',
    accessor: identity,
    maxWidth: 120,
  },
  {
    Header: 'Site / department',
    accessor: identity,
    maxWidth: 120,
  },
  {
    Header: 'Language',
    accessor: identity,
    minWidth: 160,
    tooltip: (
      <Tooltip
        width={15}
        position="left"
        tooltipBoxChildren={
          <SmallText>
            <FormattedMessage
              id="admin.userImport.table.cell.language.description"
              defaultMessage={`Interface: the language the Hoxhunt product is displayed in

Simulation: the language(s) the user receives Hoxhunt emails in`}
              description="Text for describing meanings for the possible anonymity values"
            />
          </SmallText>
        }
      >
        <HoxIcon.QuestionCircle faded size={1.25} />
      </Tooltip>
    ),
  },
  {
    Header: 'Training mode',
    accessor: identity,
    tooltip: (
      <Tooltip
        width={15}
        position="left"
        tooltipBoxChildren={
          <SmallText>
            <FormattedMessage
              id="admin.userImport.table.cell.gameMode.description"
              defaultMessage={`INTENSIVE: user participates in the training

REPORT_ONLY: user can only report phishing or spam`}
              description="Text for describing meanings for the possible game mode values"
            />
          </SmallText>
        }
      >
        <HoxIcon.QuestionCircle faded size={1.25} />
      </Tooltip>
    ),
    maxWidth: 120,
  },
  {
    Header: 'Anonymity',
    accessor: identity,
    maxWidth: 80,
    tooltip: (
      <Tooltip
        width={15}
        position="left"
        tooltipBoxChildren={
          <SmallText>
            <FormattedMessage
              id="admin.userImport.table.cell.anonymity.description"
              defaultMessage={`FALSE: user's name will be visible in leaderboards and used in training

TRUE:  user's name will not be included in the above`}
              description="Text for describing meanings for the possible game mode values"
            />
          </SmallText>
        }
      >
        <HoxIcon.QuestionCircle faded size={1.25} />
      </Tooltip>
    ),
  },
];

// Such a mess, please do not touch if not absolutely necessary
// In short, we need to substract other elements heights & spacing to get the correct table wrapper height
const calculateDynamicHeight = () => {
  return (
    window.innerHeight -
    userImportMeasurementsPx.FOOTER_BUTTON_HEIGHT -
    userImportMeasurementsPx.HEADER_HEIGHT -
    userImportMeasurementsPx.TABLE_HEADER_TOTAL_HEIGHT -
    userImportMeasurementsPx.TABLE_TOOLBAR_TOTAL_HEIGHT -
    userImportMeasurementsPx.TABLE_ROW_PADDING_BOTTOM * 2 -
    userImportMeasurementsPx.CONTENT_VERTICAL_PADDING
  );
};

export const UserImportTable: FC = () => {
  const displayedIds = useRecoilValue(selectDisplayedUserIds);

  const tableInstance = useTable(
    {
      columns: columns,
      data: displayedIds,
      loading: false,
    },
    useFlexLayout
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const [height, setHeight] = useState(calculateDynamicHeight());

  useEffect(() => {
    const handleResize = () => {
      setHeight(calculateDynamicHeight());
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setHeight]);

  const component = useMemo(
    () => (
      <StyledUserImportTable {...getTableProps()}>
        <UserImportTableHeader headerGroups={headerGroups} />

        <FixedSizeList
          height={height}
          width="100%"
          itemCount={rows.length}
          itemSize={90}
          layout="vertical"
          overscanCount={15}
          {...getTableBodyProps}
        >
          {({ index, style }) => {
            const row = rows[index];
            prepareRow(row);
            return (
              <UserImportTableRow
                key={row.getRowProps().key}
                row={row}
                style={style}
              />
            );
          }}
        </FixedSizeList>
      </StyledUserImportTable>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [headerGroups, height, prepareRow, rows]
  );

  return component;
};
