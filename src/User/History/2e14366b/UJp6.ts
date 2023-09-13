import { QueryHookOptions, QueryResult } from '@apollo/client';

import { Exact } from '@hox/frontend-utils/types/graphql.generated';

export type TAnalyticsQuery<T, X> = (
  baseOptions: QueryHookOptions<T, Exact<X>>
) => QueryResult<T, Exact<X>>;
