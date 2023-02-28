import { gql } from 'apollo-server-express';

export default gql`

type Stock {
        _id: ID,
        name: String!
        description: String
        category: String
        costPrice: Float!
        sellingPrice: Float!
        instock: Int!
        stockImage: String
        modifier: String
        createdAt: String
        updatedAt: String
    }
    type StockItem {
        _id: String
        item: Stock!
        quantity: Int!
        amountPaid: Float!
    }
    
    type Customer {
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
        address: String
    }
    type Invoice {
        _id: ID
        tid: String!
        stocks: [StockItem!]!
        customer: Customer
        modifier: String
        seenBy:[String]
        createdAt: String
        updatedAt: String
    }
    type DateIntervals {
        day: Int,
        month: Int,
        year: Int
    }
    type InvoiceGroup {
        _id: String
        records: [Invoice!]!
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
    type ExpenseGroup {
        _id: Intervals!,
        records: [Expense]!
    }

    type Notifications {
        invoices:[InvoiceGroup!]
        expenses: [ExpenseGroup]
        unreadInvoices: Int
        unreadExpenses: Int
    }
    type Cleared {
        cleared: Boolean
    }

    extend type Query {
        notifications(page: String, offset: Int): Notifications
    }
    extend type Mutation {
        clearNotifications(page: String): Cleared
    }
`