"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriptionServer = void 0;
const graphql_1 = require("graphql");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const createSubscriptionServer = (schema, server) => {
    const subscriptionServer = subscriptions_transport_ws_1.SubscriptionServer.create({
        schema,
        execute: graphql_1.execute,
        subscribe: graphql_1.subscribe,
        onConnect() {
            console.log('Connected!');
        },
        onDisconnect() {
            console.log('Disconnected!');
        }
    }, {
        server,
        path: server.graphqlPath,
    });
    return subscriptionServer;
};
exports.createSubscriptionServer = createSubscriptionServer;
//# sourceMappingURL=subs-server.js.map