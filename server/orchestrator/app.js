const { ApolloServer, gql } = require('apollo-server')
const MovieSchema = require('./schema/movie')
const TvSeries = require('./schema/tvSeries')

const typeDefsRoot = gql`
  type Query

  type Mutation
`

const server = new ApolloServer({
  typeDefs: [typeDefsRoot, MovieSchema.typeDefMovie, TvSeries.typeDefTvSeries],
  resolvers: [MovieSchema.resolverMovie, TvSeries.resolverTvSeries]
})
server.listen().then(( {url} ) => console.log('Apollo running on url', url))