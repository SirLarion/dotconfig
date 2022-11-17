import { escapeRegExp } from 'lodash';

import { parseArgName } from '@server/api/graphql/extensions/lib';
import { SUBFIELD_SEPARATOR } from '@server/api/graphql/extensions/models';
import {
  IMongoParams,
  TMongoSelector,
} from '@server/domains/collection/lib/mongo/lib/models';

import {
  ELogicalOperators,
  EStringOperations,
  IFieldConverter,
  TOperation,
} from '../models';
import { isOperator, isStringOperator } from '../schemaHelper';

const stringOperationsHandler = (
  mongoField: string,
  operator: EStringOperations,
  value: any
): TMongoSelector<any> => {
  const escaped = escapeRegExp(value);
  switch (operator) {
    case EStringOperations.STARTS_WITH:
      return {
        [mongoField]: new RegExp(`^${escaped}`),
      };
    case EStringOperations.ENDS_WITH:
      return {
        [mongoField]: new RegExp(`${escaped}$`),
      };
    case EStringOperations.NOT_ENDS_WITH:
      return {
        [mongoField]: { $not: new RegExp(`${escaped}$`) },
      };
    case EStringOperations.NOT_STARTS_WITH:
      return {
        [mongoField]: { $not: new RegExp(`^${escaped}`) },
      };
    case EStringOperations.CONTAINS:
      return {
        [mongoField]: new RegExp(`.*${escaped}.*`, 'i'),
      };
    case EStringOperations.NOT_CONTAINS:
      return {
        [mongoField]: { $not: new RegExp(`.*${escaped}.*`, 'i') },
      };
    default:
      throw new Error(`Unknown string operation: ${operator}`);
  }
};

export const mongoFieldConverter: IFieldConverter<TMongoSelector<any>> = (
  field: string,
  operator: TOperation,
  value: any
): TMongoSelector<any> => {
  const mongoField = field.replace(new RegExp(SUBFIELD_SEPARATOR, 'g'), '.');
  if (isStringOperator(operator)) {
    return stringOperationsHandler(mongoField, operator, value);
  } else {
    return {
      [mongoField]: { [`$${operator}`]: value },
    };
  }
};

export const getMongoFilterSelector =
  (converter: IFieldConverter<TMongoSelector<any>>) =>
  (filterArg: object): TMongoSelector<any> => {
    let result = {};
    console.log(filterArg);
    Object.keys(filterArg).map(argName => {
      const argValue = filterArg[argName];
      switch (argName) {
        case ELogicalOperators.AND:
          result = {
            ...result,
            $and: argValue.map(getMongoFilterSelector(converter)),
          };
          break;
        case ELogicalOperators.OR:
          result = {
            ...result,
            $or: argValue.map(getMongoFilterSelector(converter)),
          };
          break;
        default:
          // TODO: check if this disable can be removed
          // eslint-disable-next-line no-case-declarations
          const { field, operator } = parseArgName(argName);
          if (!isOperator(operator)) {
            throw new Error(
              `Unknown operator ${operator} when parsing field ${field}`
            );
          }
          result = {
            ...result,
            ...(converter(field, operator, argValue) as object),
          };
      }
    });
    return result;
  };

export const getMongoFilter =
  (converter: IFieldConverter<TMongoSelector<any>>) =>
  (filterArg: object): IMongoParams => {
    const selector = getMongoFilterSelector(converter)(filterArg);
    return { selector };
  };
