import { QueryHookOptions, QueryResult } from '@apollo/client';

import { Exact } from '@hox/frontend-utils/types/graphql.generated';

export interface IAnalyticsQueryBaseVariables {
  [key: string]: string | number | Date;
}

export type TAnalyticsQuery<T, X extends IAnalyticsQueryBaseVariables> = (
  baseOptions: QueryHookOptions<T, Exact<X>>
) => QueryResult<T, Exact<X>>;
