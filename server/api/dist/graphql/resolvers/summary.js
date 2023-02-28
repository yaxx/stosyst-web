"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const ObjectId = require('mongodb').ObjectID;
exports.pubsub = new graphql_subscriptions_1.PubSub();
exports.default = {
    Query: {
        summary: async (root, { groupBy }, { req, res }) => {
        },
    },
};
//# sourceMappingURL=summary.js.map