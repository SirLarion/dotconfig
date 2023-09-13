import React from 'react';

import { CountryFilter } from './CountryFilter';
import { DepartmentFilter } from './DepartmentFilter';
import { CityFilter } from './CityFilter';
import { RoleFilter } from './RoleFilter';
import { SCIMProvisioningFilter } from './SCIMProvisioningFilter';
import { SiteFilter } from './SiteFilter';
import { TrainingStatusFilter } from './TrainingStatusFilter';

export const getDefaultFilters = (scimEnabled?: boolean) => {
  const base = [
    <DepartmentFilter key="departmentFilter" />,
    <CountryFilter key="countryFilter" />,
    <SiteFilter key="siteFilter" />,
    <CityFilter key="cityFilter" />,
    <RoleFilter key="roleFilter" />,
    <TrainingStatusFilter key="trainingStatusFilter" />,
  ];

  if (scimEnabled) {
    return base.concat(<SCIMProvisioningFilter key="scimFilter" />);
  }

  return base;
};
