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
    input ExpenseInput {
        _id: ID,
        name: String,
        desc: String!,
        spender: String!,
        amount: Float!,
        modifier: String,
        added: PersonInput,
        modified: PersonInput,
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
        added: Person,
        modified: Person,
        seenBy: [String],
        createdAt: String,
        updatedAt: String
    }
    
    type ExpneseGroup {
        _id: String!
        records: [Expense]!
    }

    extend type Query {
        expenses(query: String, group: String, offset: Int): [ExpneseGroup]!
    }

    extend type Mutation {
        saveExpense(expense: ExpenseInput!): Expense!
        deleteExpense(id: String!): Expense!
    }

    extend type Subscription {
        expense(org: String, usr: String): Expense
    }
`;
//# sourceMappingURL=expense.js.map