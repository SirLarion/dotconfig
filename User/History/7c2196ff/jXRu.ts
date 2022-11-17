export const Industry = `
  type Industry {
    # Industry ID
    _id: ID!

    # Industry name
    name: String!
  }

  input IndustryInput {
    name: String!
  }
`;

export default () => [Industry];
