import React, { FC } from 'react';
import styled from 'styled-components';
import { ResizeObserver } from '@juggle/resize-observer';
import useMeasure from 'react-use-measure';

import { QueryPreservingLink } from '../../../../components/QueryPreservingLink';
import { RiskList } from '../../../../components/RiskList';
import { useSortedGroupMembers } from '../../../../hooks/useSortedGroupMembers';
import * as INTL from '../../../../intl/overviewIntl';
import { COUNTRIES_PATH, DEPARTMENTS_PATH } from '../../../../layouts/paths';

const ListContainer = styled.div<{ $columnLayout: boolean }>`
  display: grid;
  grid-template-columns: ${props => (props.$columnLayout ? '1fr' : '1fr 1fr')};

  grid-gap: 1rem;
  overflow: hidden;
`;

export interface ITopRiskProps {}

export const TopRiskLists: FC<ITopRiskProps> = ({ ...restProps }) => {
  const [ref, { width }] = useMeasure({ polyfill: ResizeObserver });
  const { groupMembers: firstList, loading: firstLoading } = {
    groupMembers: [],
    loading: false,
  };
  //   useSortedGroupMembers('department', 5);
  const { groupMembers: secondList, loading: secondLoading } = {
    groupMembers: [],
    loading: false,
  };
  //   useSortedGroupMembers('country', 5);

  return (
    <ListContainer ref={ref} $columnLayout={width < 800} {...restProps}>
      <RiskList
        header={<INTL.AtRiskDepartments />}
        footer={
          <QueryPreservingLink to={DEPARTMENTS_PATH}>
            <INTL.SeeAllDepartments />
          </QueryPreservingLink>
        }
        items={firstList}
        loading={firstLoading}
        group={'department'}
      />
      <RiskList
        header={<INTL.AtRiskCountries />}
        footer={
          <QueryPreservingLink to={COUNTRIES_PATH}>
            <INTL.SeeAllCountries />
          </QueryPreservingLink>
        }
        items={secondList}
        loading={secondLoading}
        group={'country'}
      />
    </ListContainer>
  );
};
