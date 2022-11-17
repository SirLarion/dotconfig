import React, { Children, FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage, MessageDescriptor, useIntl } from 'react-intl';
import { Resetter } from 'recoil';

import { Blocks } from '@hox/ui/Blocks';
import { Button } from '@hox/ui/Button/v2';
import { HoxIcon } from '@hox/ui/HoxIcon';
import { palette } from '@hox/ui/styles/theme';
import { Tag, Tags } from '@hox/ui/Tags';
import { SmallText } from '@hox/ui/Text';

import { Layout } from '../../components/Layout';
import { QUEST_TEMPLATE_PREVIEW_INTL } from '../../views/TrainingManagement/questTemplate/intl';
import { TFilterKey as TTrainingManagementFilterKey } from '../../views/TrainingManagement/recoil/filters';
import { USER_MANAGEMENT_INTL } from '../../views/UserManagement/intl';
import { TFilterKey as TUserManagementFilterKey } from '../../views/UserManagement/recoil/filters';

const FILTER_KEY_TAG_MAPPING: Record<
  TUserManagementFilterKey | TTrainingManagementFilterKey,
  MessageDescriptor
> = {
  department: USER_MANAGEMENT_INTL.filter.dropdownFilters.department,
  site: USER_MANAGEMENT_INTL.filter.dropdownFilters.site,
  country: USER_MANAGEMENT_INTL.filter.dropdownFilters.country,
  role: USER_MANAGEMENT_INTL.filter.dropdownFilters.role,
  trainingStatus: USER_MANAGEMENT_INTL.filter.dropdownFilters.trainingStatus,
  scim: USER_MANAGEMENT_INTL.filter.dropdownFilters.scimProvision,
  language: QUEST_TEMPLATE_PREVIEW_INTL.filter.dropdownFilters.language,
  difficulty: QUEST_TEMPLATE_PREVIEW_INTL.filter.dropdownFilters.difficulty,
  jobFunction: QUEST_TEMPLATE_PREVIEW_INTL.filter.dropdownFilters.jobFunction,
  category: QUEST_TEMPLATE_PREVIEW_INTL.filter.dropdownFilters.category,
};

const StyledFiltersContainer = styled.div`
  padding: 1rem 0;
  background-color: ${palette(p => p.background.primary)};
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 1rem;
`;

const AppliedFilters = styled(Tags)`
  display: flex;
  margin-bottom: -0.5rem;

  > * {
    margin: 0;
  }

  > :not(:last-child) {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const ClearFiltersTagButton = styled(Tag)`
  background-color: transparent;
  padding-left: 0.25rem;
  padding-right: 0.625rem;
  transition: background-color 160ms ease-in-out;
  cursor: pointer;

  :hover {
    background-color: ${palette(p => p.background.base)};
  }
`;

const FilterTag = styled(Tag)`
  > span {
    :before,
    :after {
      background-color: ${palette(p => p.accent.boring)};
    }
  }
`;

const ToggleFiltersButton = styled(Button)`
  flex-shrink: 0;
`;

export type TAppliedFilter = {
  id: string;
  value: ReactNode;
};

export type TFilterTag = {
  key: TUserManagementFilterKey | TTrainingManagementFilterKey;
  value: string;
  onRemove: () => void;
  displayValue?: string | React.ReactNode;
};

interface IFilterContainerProps {
  currentFilters: TFilterTag[];
  clearAllFilters: Resetter;
  filters?: ReactNode[];
  defaultVisibleFilterCount?: number;
}

export const FiltersContainer: FC<IFilterContainerProps> = ({
  currentFilters,
  clearAllFilters,
  filters,
  defaultVisibleFilterCount,
  ...restProps
}) => {
  const intl = useIntl();
  const [showAll, setShowAll] = useState(false);

  const filtersApplied = currentFilters && currentFilters?.length > 0;

  const filtersArray = Children.toArray(filters);
  const firstThreeFilters = filtersArray.slice(
    0,
    defaultVisibleFilterCount || 3
  );
  const restFilters = filtersArray.slice(
    defaultVisibleFilterCount || 3,
    filtersArray.length
  );

  return (
    <StyledFiltersContainer {...restProps}>
      <Layout.Content>
        <Blocks.Row justifyContent="space-between">
          <Filters>
            {firstThreeFilters}
            {showAll && restFilters}
          </Filters>

          <ToggleFiltersButton
            outlined
            iconStart={<HoxIcon.Configure />}
            onClick={() => setShowAll(!showAll)}
          />
        </Blocks.Row>
        {filtersApplied && (
          <AppliedFilters>
            {currentFilters.map(filter => (
              <FilterTag
                rectangle
                key={filter.key}
                foregroundColor={palette(p => p.foreground.primary)}
                background={palette(p => p.background.base)}
                onRemove={filter.onRemove}
              >
                {intl.formatMessage(FILTER_KEY_TAG_MAPPING[filter.key])}:{' '}
                {filter.displayValue || filter.value}
              </FilterTag>
            ))}
            <div onClick={clearAllFilters}>
              <ClearFiltersTagButton rectangle>
                <HoxIcon.Close
                  size={1}
                  color={palette(p => p.foreground.primary)}
                />
                <SmallText color={palette(p => p.foreground.primary)}>
                  <FormattedMessage
                    id="app.admin.userList.filters.removeAllFilters.buttonText"
                    defaultMessage="Clear filters"
                    description="Removes all applied filters"
                  />
                </SmallText>
              </ClearFiltersTagButton>
            </div>
          </AppliedFilters>
        )}
      </Layout.Content>
    </StyledFiltersContainer>
  );
};
