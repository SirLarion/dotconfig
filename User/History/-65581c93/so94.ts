import { makeExecutableSchema } from '@graphql-tools/schema';
import { expect } from 'chai';
import { GraphQLObjectType } from 'graphql';
import * as sinon from 'sinon';

import {
  filterVisitor,
  resolverFilterParser,
  resolverFilterParserMongo,
} from '../filter';

describe('Filter argument parsers', () => {
  it('filterVisitor only mutates once', () => {
    /*
     * A visitor should assign each type once to the typemap.
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
          # @filterable
          people: [Person]
          # @filterable
          otherPeople: [Person]
        }
        type Person {
          name: String!
          age: Int!
        }
    `,
    ];
    const resolvers = {};
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const visit = filterVisitor(schema);
    const typeMap = schema.getTypeMap();
    const queryFields = (typeMap.Query as GraphQLObjectType).getFields();

    expect(typeMap.Person_filter).equal(undefined);

    visit(queryFields.people);

    const afterFirstVisit = typeMap.Person_filter;
    const [peopleArg] = queryFields.people.args;

    visit(queryFields.otherPeople);

    const afterSecondVisit = typeMap.Person_filter;
    const [otherPeopleArg] = queryFields.otherPeople.args;

    expect(typeMap.Person_filter).not.equal(
      undefined,
      'Filter should have been created'
    );
    expect(afterFirstVisit).to.equal(
      afterSecondVisit,
      'Filter should not be mutated after first call'
    );
    expect(peopleArg.type).to.equal(
      otherPeopleArg.type,
      'Arg type referential equality required'
    );
  });

  it('should be able to parse deeply non nullable lists', () => {
    const typeDefs = [
      `
        type Query {
          # @filterable
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
    const visit = filterVisitor(schema);
    const typeMap = schema.getTypeMap();
    const queryFields = (typeMap.Query as GraphQLObjectType).getFields();

    expect(() => visit(queryFields.deeplyNonNullablePeople)).to.not.throw();
  });

  it('should throw if given to non list type', () => {
    const typeDefs = [
      `
        type Query {
          # @filterable
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
    const visit = filterVisitor(schema);
    const typeMap = schema.getTypeMap();
    const queryFields = (typeMap.Query as GraphQLObjectType).getFields();

    expect(() => visit(queryFields.people)).to.throw(
      '@filterable cannot be used for non list or connection types. Got Person'
    );
  });

  it('should not throw if given to non list type but typesetting is used for annotation', () => {
    const typeDefs = [
      `
        type Query {
          # @filterable(Person)
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
    const visit = filterVisitor(schema);
    const typeMap = schema.getTypeMap();
    const queryFields = (typeMap.Query as GraphQLObjectType).getFields();

    expect(typeMap.Person_filter).not.equal(
      undefined,
      'Filter should have been created'
    );
    expect(() => visit(queryFields.people)).to.not.throw();
  });

  it('should throw if annotation typesetting is used with a type that does not implement Node', () => {
    const typeDefs = [
      `
        type Query {
          # @filterable(Person)
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
    const visit = filterVisitor(schema);
    const typeMap = schema.getTypeMap();
    const queryFields = (typeMap.Query as GraphQLObjectType).getFields();

    expect(() => visit(queryFields.people)).to.throw();
  });

  it('should throw if annotation typesetting is used with a type that does not exist', () => {
    const typeDefs = [
      `
        type Query {
          # @filterable(Personne)
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
    const visit = filterVisitor(schema);
    const typeMap = schema.getTypeMap();
    const queryFields = (typeMap.Query as GraphQLObjectType).getFields();

    expect(() => visit(queryFields.people)).to.throw(
      'Typesetting annotation failed. Type: Personne does not exist.'
    );
  });

  describe('resolverFilterParser', () => {
    it('should call adapter with filter args', () => {
      const adapter = sinon.stub();
      resolverFilterParser(adapter)({ filter: 'asd', inputValue: 'random' });

      expect(adapter.firstCall.args).eql(['asd']);
    });
  });
  describe('resolverFilterParserMongo', () => {
    it('Mongo parser should process nested object', () => {
      const filter = {
        AND: [
          {
            OR: [
              {
                foo_gt: 10,
              },
            ],
          },
        ],
        bar_gt: 10,
      };
      const selector = {
        $and: [
          {
            $or: [
              {
                foo: {
                  $gt: 10,
                },
              },
            ],
          },
        ],
        bar: {
          $gt: 10,
        },
      };

      expect(resolverFilterParserMongo({ filter })).eql({ selector });
    });
  });
});
