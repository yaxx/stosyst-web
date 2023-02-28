"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
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
`;
//# sourceMappingURL=upload.js.map