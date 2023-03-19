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
    type Customer {
        _id: String
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
    input StockInput {
        _id: String
        name: String!
        description: String
        category: String
        costPrice: Float!
        sellingPrice: Float!
        instock: Int
        stockImage: String
        added: PersonInput
        warningCount: Int
        expiry: String
        expiryWarning: Int
        modified: PersonInput
        owner: String
        createdAt: String
        updatedAt: String
    }
    input StockItemInput {
        _id: String,
        item: StockInput!
        quantity: Int!
        booked: Boolean!
        delivered: Int!
    }
    input InvoiceInput {
        _id: String
        tid: String!
        recieved: Float
        payable: Float
        paymentMethod: String
        completed: Boolean
        stocks: [StockItemInput!]!
        customer: PersonInput
        modified: PersonInput
        added: PersonInput
        modifier: String
        createdAt: String
        updatedAt: String
    }
    input RefundInput {
        invoiceId: String
        stock: StockItemInput
    }
    type Stock {
        _id: ID,
        owner: String
        name: String!
        description: String
        category: String
        costPrice: Float!
        sellingPrice: Float!
        instock: Int!
        stockImage: String
        added: Person
        modified: Person
        warningCount: Int
        expiry: String
        expiryWarning: Int
        createdAt: String
        updatedAt: String
    }
    type StockItem {
        _id: String
        item: Stock!
        booked: Boolean!
        delivered: Int!
        quantity: Int!
    }
    type UpdatedStock {
        stockId: String
        instock: Int
    }

     type Invoice {
        _id: ID
        tid: String!
        stocks: [StockItem!]!
        customer: Customer
        recieved: Float
        payable: Float
        paymentMethod: String
        completed: Boolean
        modifier: String
        added: Person
        modified: Person
        createdAt: String
        updatedAt: String
    }

    type InvoiceGroup {
        _id: String
        records: [Invoice!]!
    }
    extend type Query {
        invoices(query: String, filter: String, group: String, offset: Int): [InvoiceGroup]!
        searchInvoices(query: String, group: String): [InvoiceGroup]!
    }
    extend type Mutation {
        checkOut(invoice: InvoiceInput!): Invoice
        deleteInvoice(refund: RefundInput!): StockItem
    }
    extend type Subscription {
        onCheckOut(clientId: String, usr: String): Invoice
        onStockQtyChange(clientId: String, usrId: String): [Stock]
    }
    `;
//# sourceMappingURL=invoice.js.map