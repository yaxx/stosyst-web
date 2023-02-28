"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApolloServer = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const createApolloServer = (schema, server) => {
    const apollServer = new apollo_server_express_1.ApolloServer({
        schema,
        plugins: [{
                async serverWillStart() {
                    return {
                        async drainServer() {
                            server.close();
                        }
                    };
                }
            }],
        context: ({ req, res }) => ({ req, res })
    });
    return apollServer;
};
exports.createApolloServer = createApolloServer;
//# sourceMappingURL=apollo-server.js.map