"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `

    type Query {
        _: String!
    },
     type Mutation {
        _: String!
    },
     type Subscription {
        _: String!
    }
`;
//# sourceMappingURL=root.js.map