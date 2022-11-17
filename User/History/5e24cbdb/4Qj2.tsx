import { graphql, OptionProps } from '@apollo/client/react/hoc';
import { withHandlers, mapProps } from 'recompose';
import compose from 'lodash/flowRight';
import omit from 'lodash/omit';

import { shouldShowTip, shouldShowTipMark, shouldShowElement } from './lib';
import { visibilityLogic } from './visibilityLogic';
import {
  IVisibilityLogic,
  IVisibilityLogicProps,
  IQueryResult,
  IVisibilityManagerProps,
} from './models';
import React from 'react';
import { VisibilityManagerDocument } from './__generated__/VisibilityManager.generated';

const withVisibilityLogic = (logic: IVisibilityLogic) =>
  withHandlers<OptionProps<{}, IQueryResult>, IVisibilityLogicProps>({
    isTipVisible:
      ({ data }) =>
      (tipId: string) =>
        shouldShowTip(tipId, data, logic),
    isTipMarkVisible:
      ({ data }) =>
      (tipId: string) =>
        shouldShowTipMark(tipId, data, logic),
    isElementVisible:
      ({ data }) =>
      (elementId: string) =>
        shouldShowElement(elementId, data, logic),
  });

const omitGraphQlProps = mapProps<
  IVisibilityLogicProps,
  IVisibilityLogicProps & OptionProps<{}, IQueryResult>
>(props => {
  const omittedProps = omit(
    props,
    'data',
    'loading',
    'errors',
    'networkStatus',
    'stale'
  );
  return omittedProps as IVisibilityLogicProps;
});

export const withVisibilityManagerLogic = <TProps extends object>(
  Component: React.ComponentType<TProps & IVisibilityLogicProps>
) =>
  compose(
    graphql<TProps, IQueryResult, void, OptionProps<TProps, IQueryResult>>(
      VisibilityManagerDocument
    ),
    withVisibilityLogic(visibilityLogic) as any,
    omitGraphQlProps
  )(Component);

const VisibilityManagerView: React.SFC<
  IVisibilityManagerProps & IVisibilityLogicProps
> = ({ children, ...rest }) => {
  return <React.Fragment>{children(rest)}</React.Fragment>;
};

export const VisibilityManager = withVisibilityManagerLogic(
  VisibilityManagerView
);
