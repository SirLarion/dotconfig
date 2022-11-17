import pipe from 'lodash/flow';
import { FORM_ERROR } from 'final-form';

import { omitTypeNames, getErrorMessages } from '../utils/graphqlHelpers';
import {
  OperationVariables,
  MutationFunction,
  MutationResult,
} from '@apollo/client';

const map =
  <TItem, TMappedItem>(
    predicate: (val: TItem, index: number, arr: TItem[]) => TMappedItem
  ) =>
  (arr: TItem[]) =>
    arr.map(predicate);

export const mapGqlErrorsToFormErrors = pipe(
  getErrorMessages,
  map(({ message }) => message),
  errors => ({
    [FORM_ERROR]: errors,
  })
);

export const resolveFormErrors = result =>
  result && result[FORM_ERROR] ? result : null;

export const submitFormMutation =
  <TData = any, TVariables = OperationVariables>(
    mutate: MutationFunction<TData, TVariables>
  ) =>
  <TFormData>(mapFormDataToMutationVars: (formData: TFormData) => TVariables) =>
  (formData: TFormData): Promise<MutationResult<TData>> =>
    mutate({ variables: omitTypeNames(mapFormDataToMutationVars(formData)) })
      .catch(mapGqlErrorsToFormErrors)
      .then(resolveFormErrors);
