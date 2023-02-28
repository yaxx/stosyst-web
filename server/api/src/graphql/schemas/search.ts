import { gql } from 'apollo-server-express';

export default gql`
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
`