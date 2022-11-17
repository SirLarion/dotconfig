export const Industry = `
  type Industry implements Node {
    # Industry ID
    _id: ID!

    # Industry name
    name: String!
  }

  input IndustryInput {
    name: String
  }

  # Paginated list interface for Industries
  type IndustryConnection implements Connection {
    # List of industries on current page
    nodes: [Industry!]!
    # Pagination information for current selection
    pageInfo: HoxPageInfo!
    # Total industry count for current selection
    totalCount: Int!
  }
`;

export default () => [Industry];
