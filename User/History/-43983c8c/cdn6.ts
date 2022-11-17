import { FC, ReactNode } from 'react';

import { AVAILABLE_COLUMN_IDS } from './columnCustomization/constants/columns';
import { OrganizationUsersQuery_currentUser_organization_usersConnection_nodes } from './hooks/graphql/__generated__/GetOrganizationUsers.generated';

export interface IQueryUser
  extends OrganizationUsersQuery_currentUser_organization_usersConnection_nodes {}

export type TPagination = {
  currentPageIndex: number;
  totalItemCount: number;
  pageSize: number;
  nextPage: () => void;
  previousPage: () => void;
  reset: () => void;
};

export type TColumnLayoutId = 'default' | 'performance' | string;

export type TColumnId = typeof AVAILABLE_COLUMN_IDS[number];

type TColumnWidth =
  | `${number}rem`
  | `${number}fr`
  | `${number}%`
  | 'auto'
  | 'min-content'
  | 'max-content';

export type TColumnConfig = {
  id: TColumnId;
  label: ReactNode;
  minWidth: TColumnWidth;
  maxWidth: TColumnWidth;
  node: FC<{ user: IQueryUser }>;
  tooltip?: ReactNode;
  sortable?: boolean;
};
