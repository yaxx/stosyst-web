"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
    type Header {
        stocksCount: Int
        uniqueStocks: Int
        categories: Int
        totalAmount: Int
    }
    type Footer {
        expiring: Int
        expired: Int
        outOfStocks: Int
        lowStocksCount: Int
    }
    type Sales {
        _id: Int
        totalSales: Int
    }
    type Expenses {
        _id: Int
        totalExpenses: Int
    }
    type SalesExpenses {
        sales: [Sales]
        expenses:[Expenses]
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
    type ScalarInvoice {
        _id: ID
        tid: String!
        stocks: StockItem
        customer: Customer
        recieved: Float
        payable: Float
        modifier: String
        added: Person
        modified: Person
        createdAt: String
        updatedAt: String
    }
    type TrendingStocks {
        _id: String
        items:[ScalarInvoice]
        totalSalesCount: Int
    }
    extend type Query {
        chartHeader: Header!
        chartFooter: Footer!
        topStaff(duration: String): [TrendingStocks]!
        salesExpenses(duration: String): SalesExpenses!
        trends(duration: String, item: String): [TrendingStocks]!
    }
    `;
//# sourceMappingURL=charts.js.map