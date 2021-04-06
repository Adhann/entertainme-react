const { gql, UserInputError, ApolloServer } = require('apollo-server')
const axios = require('axios')
const urlMovie = 'http://localhost:4001/movies'
const Redis = require('ioredis')
const redis = new Redis()

module.exports = {
  typeDefMovie: gql`
    type Movie {
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }

    type MessageMovie {
      message: String
    }

    extend type Query {
      movies: [Movie]
      movie(_id: ID!): Movie
    }

    input MovieInput {
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String] 
    }
    
    extend type Mutation {
      addMovie(input: MovieInput): Movie
      updateMovie(input: MovieInput): Movie
      deleteMovie(input: MovieInput): MessageMovie
    }
  `,
  resolverMovie: {
    Query: {
      async movies() {
        try {
          const cache = await redis.get('movies')
          if (cache) {
            return JSON.parse(cache)
          } else {
            const { data } = await axios.get(urlMovie)
            await redis.set('movies', JSON.stringify(data))
            return data
          }
        } catch (err) {
          throw err
        }
      },
      async movie(_, args) {
        try {
          const { data } = await axios.get(`${urlMovie}/${args._id}`)
          return data
        } catch (err) {
          throw err
        }
      }
    },
    Mutation: {
      async addMovie(parent, args, context, info) {
        try {
          const { data } = await axios.post(urlMovie, args.input)
          await redis.del('movies')
          return data
        } catch (error) {
          throw error
        }
      },
      async updateMovie(_, args) {
        try {
          const { _id, title, overview, poster_path, popularity, tags } = args.input
          const { data } = await axios.put(`${urlMovie}/${_id}`, {
            title, overview, poster_path, popularity, tags
        })
          await redis.del('movies')
          return data
        } catch (error) {
          throw error
        }
      },
      async deleteMovie(_, args) {
        try {
          const { _id } = args.input
          // if (args.input._id) { // Class constructor ApolloServer cannot be invoked without 'new'"
          //   console.log('yey');
          //   throw UserInputError, ApolloServer('Invalid argument value', {
          //     argumentName: '_id'
          //   })  
          // }
          const { data } = await axios.delete(`${urlMovie}/${_id}`)
          await redis.del('movies')
          return data
        } catch (error) {
          throw error
        }
      }
    }
  }
}