import { GraphQLSchema } from "graphql/type/index";
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from "subscriptions-transport-ws";

export const createSubscriptionServer = (schema: GraphQLSchema, server: any)=>{
  
    const subscriptionServer = SubscriptionServer.create({
      schema,
      execute,
      subscribe,
      onConnect() {
        console.log('Connected!')
      },
      onDisconnect() {
        console.log('Disconnected!')
      }
    },
    {
        server,
        path: server.graphqlPath,
    });

    return subscriptionServer
}