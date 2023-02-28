"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
    input ExpenseInput {
        _id: ID,
        name: String,
        desc: String!,
        spender: String!,
        amount: Float!,
        modifier: String,
        createdAt: String,
        updatedAt: String
    }

    type Expense {
        _id: ID,
        name: String!,
        desc: String,
        spender: String,
        amount: Float!,
        modifier: String,
        createdAt: String,
        updatedAt: String
    }
    type Intervals {
        day: Int
        month: Int
        year: Int
    }
    type ExpneseGroup {
        _id: Intervals!,
        records: [Expense]!
    }

    extend type Mutation {
        saveExpense(expense: ExpenseInput!): Expense!
        deleteExpense(id: String!): Expense!
    } 
`;
//# sourceMappingURL=search.js.map