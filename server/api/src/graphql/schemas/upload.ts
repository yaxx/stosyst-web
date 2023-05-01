import { gql } from 'apollo-server-express';

export default gql`
  scalar Upload
  type File {
      uri: String!
      filename: String
      mimetype: String
      encoding: String
  }

  type Url {
    url: String!
  }

  extend type Query {
    imgUrl: Url!
  }

  extend type Mutation {
       uploadFile(file: Upload!): File!
  }
`