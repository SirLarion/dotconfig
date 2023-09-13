import { makeExecutableSchema } from '@graphql-tools/schema';
import { expect } from 'chai';
import { GraphQLEnumType, GraphQLList, GraphQLObjectType } from 'graphql';
import * as sinon from 'sinon';

import { resolverSortParser, sortVisitor } from '../sort';

describe('Sort argument parsers', () => {
  it('sortVisitor assignes the same enum to all same sorts', () => {
    /*
     * A visitor should assign same exact sort enum object to the field
     * if there has been a sort enum with the same name before
     */

    type TGqlListEnum = GraphQLList<GraphQLEnumType>;
    const typeDefs = [
      `
        type Query {
          # @sortable
          peopleOne: [Person]
          # @sortable
          peopleTwo: [Person]
        }
        type Person {
          name: String!
          age: Int!
        }
    `,
    ];

    const resolvers = {};
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const visit = sortVisitor(schema);
    const typeMap = schema.getTypeMap();
    const queryFields = (typeMap.Query as GraphQLObjectType).getFields();
    const { peopleOne, peopleTwo } = queryFields;
    visit(queryFields.peopleOne);
    visit(queryFields.peopleTwo);

    const sortEnumTypeOne = (peopleOne.args[0].type as TGqlListEnum).ofType;
    const sortEnumTypeTwo = (peopleTwo.args[0].type as TGqlListEnum).ofType;

    expect(sortEnumTypeOne).to.equal(
      sortEnumTypeTwo,
      'Referential equality required'
    );
  });
  it('sortVisitor only mutates once', () => {
    /*
     * A visitor should assign each sort enum once to the typemap.
     * GraphQL-js type comparators break down on referential grounds otherwise
     *
     * Possible scenarios:
     *
     * A Person type gets visited twice, once on root level as Query.people,
     * and a second time as a part of a team.
     *
     */
    const typeDefs = [
      `
        type Query {
          # @sortable
          people: [Person]
          teams: [Team]
        }
        type Person {
          name: String!
          age: Int!
        }
        type Team {
          # @sortable
          people: [Person]
        }
    `,
    ];
    const resolvers = {};
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const visit = sortVisitor(schema);
    const typeMap = schema.getTypeMap();
    const queryFields = (typeMap.Query as GraphQLObjectType).getFields();

    expect(typeMap.Person_sort).equal(undefined);
    visit(queryFields.people);
    expect(typeMap.Person_sort).not.equal(undefined);
    const firstVisit = typeMap.Person_sort;

    visit(queryFields.people);
    const secondVisit = typeMap.Person_sort;
    expect(firstVisit).to.equal(secondVisit, 'Referential equality required');
  });

  it('should be able to parse deeply non nullable lists', () => {
    const typeDefs = [
      `
        type Query {
          # @sortable
          deeplyNonNullablePeople: [Person!]!
        }
        type Person {
          name: String!
          age: Int!
        }
    `,
    ];
    const resolvers = {};
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const visit = sortVisitor(schema);
    const typeMap = schema.getTypeMap();
    const queryFields = (typeMap.Query as GraphQLObjectType).getFields();

    expect(() => visit(queryFields.deeplyNonNullablePeople)).to.not.throw();
  });

  it('should throw if given to non list types', () => {
    const typeDefs = [
      `
        type Query {
          # @sortable
          people: Person
        }
        type Person {
          name: String!
          age: Int!
        }
    `,
    ];
    const resolvers = {};
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const visit = sortVisitor(schema);
    const typeMap = schema.getTypeMap();
    const queryFields = (typeMap.Query as GraphQLObjectType).getFields();

    expect(() => visit(queryFields.people)).to.throw(
      '@sortable cannot be used for non list or connection types. Got Person'
    );
  });

  it('should not throw if given to non list type but typesetting is used for annotation', () => {
    const typeDefs = [
      `
        type Query {
          # @sortable(Person)
          people: Person
        }
        type Node {
          _id: String!
        }
        type Person implements Node {
          name: String!
          age: Int!
        }
    `,
    ];
    const resolvers = {};
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const visit = sortVisitor(schema);
    const typeMap = schema.getTypeMap();
    const queryFields = (typeMap.Query as GraphQLObjectType).getFields();

    expect(() => visit(queryFields.people)).to.not.throw();
    expect(typeMap.Person_sort).not.equal(
      undefined,
      'Sort parameter should have been created'
    );
  });

  it('should throw if annotation typesetting is used with a type that does not implement Node', () => {
    const typeDefs = [
      `
        type Query {
          # @sortable(Person)
          people: Person
        }
        type Person {
          name: String!
          age: Int!
        }
    `,
    ];
    const resolvers = {};
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const visit = sortVisitor(schema);
    const typeMap = schema.getTypeMap();
    const queryFields = (typeMap.Query as GraphQLObjectType).getFields();

    expect(() => visit(queryFields.people)).to.throw(
      'Typesetting @sortable failed. Type: Person must implement Node.'
    );
  });

  it('should throw if annotation typesetting is used with a type that does not exist', () => {
    const typeDefs = [
      `
        type Query {
          # @sortable(Personne)
          people: Person
        }
        type Person {
          name: String!
          age: Int!
        }
    `,
    ];
    const resolvers = {};
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const visit = sortVisitor(schema);
    const typeMap = schema.getTypeMap();
    const queryFields = (typeMap.Query as GraphQLObjectType).getFields();

    expect(() => visit(queryFields.people)).to.throw(
      'Typesetting @sortable failed. Type: Personne does not exist.'
    );
  });

  describe('resolverSortParser', () => {
    it('should call adapter with sort args', () => {
      const adapter = sinon.stub();
      resolverSortParser(adapter)({ sort: 'asd', otherArg: 'das' });

      expect(adapter.firstCall.args).eql(['asd']);
    });
  });
});
