const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis(); // uses defaults unless given configuration object
const urlMovie = 'http://localhost:4001/movies'
const urlTvSeries = 'http://localhost:4002/tvSeries'


class EntertainMeController {
  static async findAll (req, res, next) {
    try {
      const movieCache = await redis.get('movies')
      const seriesCache = await redis.get('series')

      if (movieCache && seriesCache) {

        res.status(200).json({
          movies: JSON.parse(movieCache),
          series: JSON.parse(seriesCache)
        })

      } else {
        if (movieCache) {
          // console.log('MASUK IF MOVIE CACHE');
          const dataMovies = await axios.get(urlMovie)
          await redis.set('series', JSON.stringify(dataMovies.data))

          res.status(200).json({
            movies: dataMovies.data
          })
  
        } else if (seriesCache) {
          // console.log('MASUK IF SERIES CACHE');

          const dataSeries = await axios.get(urlTvSeries)
          await redis.set('series', JSON.stringify(dataSeries.data))

          res.status(200).json({
            series: dataSeries.data
          })

        } else {
          const dataMovies = await axios.get(urlMovie)
          const dataSeries = await axios.get(urlTvSeries)
  
          await redis.set('movies', JSON.stringify(dataMovies.data))
          await redis.set('series', JSON.stringify(dataSeries.data))
  
          res.status(200).json({
            movies: dataMovies.data,
            series: dataSeries.data
          })
        }
        
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = EntertainMeController