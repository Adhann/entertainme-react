import { ApolloClient, InMemoryCache } from '@apollo/client'

export const cache = new InMemoryCache()

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/',
})

export default client