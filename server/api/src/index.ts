
import mongoose from 'mongoose'
// import connectRedis from 'connect-redis'
import { createServer } from 'http'
import { typeDefs, resolvers } from './graphql/index'
import { createExpressApp } from './app'
import { createSubscriptionServer } from './subs-server'
import { createApolloServer } from './apollo-server'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { MONGO_URI, SERVER_PORT } from './config/index'

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI)

    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const app = createExpressApp()
    const httpServer = createServer(app)
    const subscriptionServer = createSubscriptionServer(schema, httpServer)
    const server = createApolloServer(schema, subscriptionServer)
      
    await server.start()

    server.applyMiddleware({ app })
    httpServer.listen({port:SERVER_PORT}, () => {
      console.log(`Server running at localhost:${SERVER_PORT}${server.graphqlPath}`)
    })
    return { server, app }
  } catch (e) {
    console.log(e)
  }
}
startServer()




