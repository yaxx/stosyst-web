"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const graphql_1 = require("./graphql");
const app_1 = require("./app");
const subs_server_1 = require("./subs-server");
const apollo_server_1 = require("./apollo-server");
const schema_1 = require("@graphql-tools/schema");
const config_1 = require("./config");
const startServer = async () => {
    try {
        await mongoose_1.default.connect(config_1.MONGO_URI);
        const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: graphql_1.typeDefs, resolvers: graphql_1.resolvers });
        const app = (0, app_1.createExpressApp)();
        const httpServer = (0, http_1.createServer)(app);
        const subscriptionServer = (0, subs_server_1.createSubscriptionServer)(schema, httpServer);
        const server = (0, apollo_server_1.createApolloServer)(schema, subscriptionServer);
        await server.start();
        server.applyMiddleware({ app });
        httpServer.listen({ port: config_1.SERVER_PORT }, () => {
            console.log(`Server running at localhost:${config_1.SERVER_PORT}${server.graphqlPath}`);
        });
        return { server, app };
    }
    catch (e) {
        console.log(e);
    }
};
startServer();
//# sourceMappingURL=index.js.map