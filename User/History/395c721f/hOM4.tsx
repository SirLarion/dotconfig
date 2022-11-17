import React from 'react';
import { Enzyme } from '../../npm/Enzyme';
import { expect } from 'chai';
import { Query } from '@apollo/client/react/components';
import { gql } from '@apollo/client';

import { LoadingQuery } from '.';
import { RelativeLoading } from '../../components/Loading';

/* eslint-disable */

const query = gql`
  query test {
    stuff
    bluff
    ruff
  }
`;

/* eslint-enable */

const variables = { a: 1 };

describe('LoadingQuery', () => {
  it('Renders an apollo query', () => {
    const wrapper = Enzyme.shallow(
      <LoadingQuery query={query} variables={variables}>
        {queryProps => <span>asd</span>}
      </LoadingQuery>
    );

    const props = wrapper.find(Query).props() as any;
    expect(props.query).eql(query);
    expect(props.variables).eql(variables);
    expect(props.children({ loading: false })).eql(<span>asd</span>);
  });

  it('Renders loading by default if queryProps.loading is true', () => {
    const wrapper = Enzyme.shallow(
      <LoadingQuery query={query} variables={variables}>
        {queryProps => <span>asd</span>}
      </LoadingQuery>
    );

    const props = wrapper.find(Query).props() as any;
    expect(props.children({ loading: true })).eql(<RelativeLoading />);
  });

  it('Allows for loading predicate override', () => {
    const wrapper = Enzyme.shallow(
      <LoadingQuery
        query={query}
        variables={variables}
        loadingPredicate={queryProps =>
          (queryProps.data as any).customPredicate
        }
      >
        {queryProps => <span>asd</span>}
      </LoadingQuery>
    );

    const props = wrapper.find(Query).props() as any;
    expect(props.children({ data: { customPredicate: true } })).eql(
      <RelativeLoading />
    );
    expect(
      props.children({ loading: true, data: { customPredicate: false } })
    ).eql(<span>asd</span>);
  });

  it('Allows for loading renderer override', () => {
    const data = { name: 'Cori Andersson' };
    const customRenderer = queryProps => (
      <div>Face first, mr {queryProps.data.name}</div>
    );
    const wrapper = Enzyme.shallow(
      <LoadingQuery
        query={query}
        variables={variables}
        renderLoading={customRenderer}
      >
        {queryProps => <span>asd</span>}
      </LoadingQuery>
    );

    const props = wrapper.find(Query).props() as any;
    expect(props.children({ loading: true, data })).eql(
      customRenderer({ data })
    );
  });
});
