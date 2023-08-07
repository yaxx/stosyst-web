import { inDevelopment } from './utils';
import { locals } from './store/data';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient, InMemoryCache, split } from '@apollo/client'


export const API_HOST = inDevelopment ? 'localhost:4200':'api.stosyst.com'

export const API_URI = inDevelopment ? `http://${API_HOST}/graphql`:`https://${API_HOST}`
export const getImageUrl = (name: string) => inDevelopment ? `http://${API_HOST}/images/${name}` : `https://nextoma-bucket.s3.us-east-2.amazonaws.com/${name}`;

const SOCKET_URI = inDevelopment ? `ws://${API_HOST}` : `wss://${API_HOST}`

const wsLink = new WebSocketLink({
  uri: SOCKET_URI,
  options: {
    reconnect: true,
    timeout: 10000
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
   return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

const httpLink  = createUploadLink({
    uri: API_URI,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const cache  = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            keyArgs: false,
            merge(existing, incoming, { args }) {
              let merged = existing ? existing.slice(0) : [];
              merged = (args?.offset > 0) ? [ ...merged, ...incoming ] : incoming
              return merged
            }
          },
          localState: {
            read() {
              return locals()
            }
          }
        }
      },
      // ExpenseGroup: {
      //     keyFields: ["ExpenseGroup",["day","month","year"]],
      // },
      invoices: {
            keyFields: [],
            merge(existing, incoming, { args }) {
              let merged = existing ? existing.slice(0) : [];
              merged = (args?.offset > 0) ? [ ...merged, ...incoming ] : incoming
              return merged
            }
      },
      // StocksGroup: {
      //   fields: {
      //     records: {
      //         merge(existing:any[], incoming:any) {
      //         return [ ...existing, ...incoming ]
      //       }
      //     }
      //   } 
      // },
    }
  })
})
export default cache
