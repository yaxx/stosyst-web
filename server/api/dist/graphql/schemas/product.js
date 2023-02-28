"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
    type Person {
        firstName: String
        lastName: String
        phone: String
        email: String
        address: String
    }
    input PersonInput {
        firstName: String
        lastName: String
        phone: String
        email: String
        address: String
    }
    type Product {
        _id: ID
        name: String!
        description: String
        stockImage: String!
        category: String
        costPrice: Float!
        sellingPrice: Float!
        instock: Float!
        added: Person,
        modified:Person
        owner: String
        createdAt: String
        updatedAt: String
        warningCount: Int,
        expiry: String,
        expiryWarning: Int,
    }
    input ProductInput {
        _id: ID
        name: String!
        description: String
        category: String
        costPrice: Float!
        sellingPrice: Float!
        instock: Int!
        modified: PersonInput
        added: PersonInput
        stockImage: String
        createdAt: String
        updatedAt: String
        owner: String
        warningCount: Int
        expiry: String
        expiryWarning: Int
     }
     input QueryInput {
        fieldName: String
     }

     type StocksGroup {
        _id: String!
        records: [Product]!
    }
    extend type Query {
        products(query: String, filter: String, group: String, offset: Int): [StocksGroup]!
    }
    extend type Mutation {
        saveProduct(product: ProductInput!): Product!
        deleteProduct(id: String!): Product
    }
    extend type Subscription {
        stock: Product
    }
    `;
//# sourceMappingURL=product.js.map