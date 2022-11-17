import get from 'lodash/get';
import set from 'lodash/set';
import isNil from 'lodash/isNil';

import {
  TSubmitFn,
  createDirtyNullTransformSubmitter,
} from '../../components/ui/Form/lib/utils';

export const getScopedFormProps =
  <
    T extends {
      organization: unknown;
      onSubmit: TSubmitFn<unknown>;
    }
  >(
    props: T
  ) =>
  (
    paths: (string | string[])[]
  ): { initialValues: DeepPartial<T>; onSubmit: TSubmitFn<T> } => {
    return {
      initialValues: paths.reduce((result, path) => {
        const val = get(props.organization, path);
        return !isNil(val) ? set(result, path, val) : result;
      }, {}),
      onSubmit: createDirtyNullTransformSubmitter(props.onSubmit),
    };
  };
