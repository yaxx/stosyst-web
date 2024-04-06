
import { GraphQLSchema } from 'graphql/type/index'
import { ApolloServer } from "apollo-server-express"
import { SubscriptionServer } from 'subscriptions-transport-ws'

export const createApolloServer = (schema: GraphQLSchema, server: SubscriptionServer) => {

    const apollServer = new ApolloServer({
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
      context: ({req, res}) => ({req, res})
    });

    return apollServer
}
