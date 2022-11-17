import React from 'react';

import { CityFilter } from './CityFilter';
import { CountryFilter } from './CountryFilter';
import { DepartmentFilter } from './DepartmentFilter';
import { OnboardedFilter } from './OnboardedFilter';
import { PendingRemovalFilter } from './PendingRemovalFilter';
import { RoleFilter } from './RoleFilter';
import { SCIMProvisioningFilter } from './SCIMProvisioningFilter';
import { SiteFilter } from './SiteFilter';
import { TrainingModeFilter } from './TrainingModeFilter';
import { TrainingStatusFilter } from './TrainingStatusFilter';

export const getDefaultFilters = (scimEnabled?: boolean) => {
  const dropdownFilters = [
    <DepartmentFilter key="departmentFilter" />,
    <CountryFilter key="countryFilter" />,
    <SiteFilter key="siteFilter" />,
    <CityFilter key="cityFilter" />,
    <RoleFilter key="roleFilter" />,
    <TrainingStatusFilter key="trainingStatusFilter" />,
    <TrainingModeFilter key="trainingModeFilter" />,
    <OnboardedFilter key="onboardedFilter" />,
  ];

  // Separate array for boolean filters because they look different in UI and we want always display them after dropdown filters
  const booleanFilters = [<PendingRemovalFilter key="pendingRemovalFilter" />];

  if (!scimEnabled) {
    return dropdownFilters
      .concat(<SCIMProvisioningFilter key="scimFilter" />)
      .concat(booleanFilters);
  }

  return dropdownFilters.concat(booleanFilters);
};
