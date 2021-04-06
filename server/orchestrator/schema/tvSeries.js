const { gql } = require('apollo-server')
const axios = require('axios')
const urlTvSeries = 'http://localhost:4002/tvSeries'
const Redis = require('ioredis')
const redis = new Redis()

module.exports = {
  typeDefTvSeries: gql`
    type TvSeries {
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }

    type MessageTvSeries {
      message: String
    }

    extend type Query {
      series: [TvSeries]
      serial(_id: ID!): TvSeries
    }

    input TvSeriesInput {
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String] 
    }
    extend type Mutation {
      addTvSeries(input: TvSeriesInput): TvSeries
      updateTvSeries(input: TvSeriesInput): TvSeries
      deleteTvSeries(input: TvSeriesInput): MessageTvSeries
    }
  `,
  resolverTvSeries: {
    Query: {
      async series() {
        try {
          const cache = await redis.get('tvSeries')
          if (cache) {
            return JSON.parse(cache)
          } else {
            const { data } = await axios.get(urlTvSeries)
            await redis.set('tvSeries', JSON.stringify(data))
            return data
          }
        } catch (err) {
          throw err
        }
      },
      async serial(_, args) {
        try {
          const { data } = await axios.get(`${urlTvSeries}/${args._id}`)
          return data
        } catch (err) {
          throw err
        }
      }
    },
    Mutation: {
      async addTvSeries(_, args) {
        try {
          // const { title, overview, poster_path, popularity, tags } = args
          const { data } = await axios.post(urlTvSeries, args.input)
          return data
        } catch (error) {
          throw error
        }
      },
      async updateTvSeries(_, args) {
        try {
          const { _id, title, overview, poster_path, popularity, tags } = args.input
          const { data } = await axios.put(`${urlTvSeries}/${_id}`, {
            title, overview, poster_path, popularity, tags
        })
          await redis.del('tvSeries')
          return data
        } catch (error) {
          throw error
        }
      },
      async deleteTvSeries(_, args) {
        try {
          const { _id } = args.input
          // if (args.input._id) { // Class constructor ApolloServer cannot be invoked without 'new'"
          //   console.log('yey');
          //   throw UserInputError, ApolloServer('Invalid argument value', {
          //     argumentName: '_id'
          //   })  
          // }
          const { data } = await axios.delete(`${urlTvSeries}/${_id}`)
          await redis.del('tvSeries')
          return data
        } catch (error) {
          throw error
        }
      }
    }
  }
}