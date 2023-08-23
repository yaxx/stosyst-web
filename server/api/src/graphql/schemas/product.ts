import { gql } from 'apollo-server-express';

export default gql`
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
        subCategory: String
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
        subCategory: String
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
        count: Int
        total: Float
        records: [Product]!
    }

    extend type Query {
        products(query: String, filter: String, group: String, offset: Int): [StocksGroup]!
        matchedProducts(query: String, storeId: String): [Product]!
        stockSet(query: String, filter: String, offset: Int, group: String, groupLabel: String): [Product]
    }
    extend type Mutation {
        saveProduct(product: ProductInput!): Product!
        shareProduct(q: Int, addId: String, subId:String): [Product]!
        deleteProduct(id: String!): Product
    }
    extend type Subscription {
        stock: Product
    }
    `