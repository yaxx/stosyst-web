"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
    type DateRange {
        x: Int
        y: Int
        z: Int
    }
    type Summary {
        _id: DateRange
        sales: Float
        profit: Float
        expenses: Float
    }
    extend type Query {
        summary(groupBy: String): [Summary]!
    }

`;
//# sourceMappingURL=summary.js.map