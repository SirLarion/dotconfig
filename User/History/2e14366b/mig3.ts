import { QueryHookOptions, QueryResult } from '@apollo/client';

import { Exact } from '@hox/frontend-utils/types/graphql.generated';

export type TAnalyticsQuery<
  T,
  X extends { [key: string]: string | number | Date }
> = (baseOptions: QueryHookOptions<T, Exact<X>>) => QueryResult<T, Exact<X>>;
