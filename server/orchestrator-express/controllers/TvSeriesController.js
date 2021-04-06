const urlTvSeries = 'http://localhost:4002/tvSeries'
const Redis = require('ioredis')
const redis = new Redis()

class TvSeriesController {
  static async findAll(req, res) {
    try {
      const tvSeriesCache = await redis.get('tvSeries')
      if (tvSeriesCache) {
        res.status(200).json(JSON.parse(tvSeriesCache))
      } else {
        const { data } = await axios.get(urlTvSeries)
        await redis.set('tvSeries', JSON.stringify(data))
        res.status(200).json(data)
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async findById(req, res, next) {
    try {
      const id = req.params.id
      const { data } = await axios.get(`${urlTvSeries}/${id}`)
      
      if(!data) throw res.status(404).json({message: "Error Not Found"})
      
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  
  static async addTvSeries(req, res, next) { 
    try {
      const { title, overview, poster_path, popularity, tags } = req.body

      const { data } = await axios.post(`${url}`, {
        title, overview, poster_path, poster_path, tags, popularity
      })

      await redis.del('tvSeries')

      res.status(201).json(data.ops[0])
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async updateTvSeries(req, res, next) {
    try {
      const id = req.params.id
      const { title, overview, poster_path, popularity, tags } = req.body

      const { data } = await axios.put(`${url}/${id}`, {
        title, overview, poster_path, poster_path, tags, popularity
      })
      
      await redis.del('tvSeries')

      res.status(201).json(data.value)
    } catch (err) {
      res.status(500).json(err)  
    }
  }

  static async deleteTvSeries(req, res, next) {
    try {
      const id = req.params.id
      const { data } = await axios.delete(`${url}/${id}`)
      if(!data.value) throw ({message: "Error Not Found"})
      
      await redis.del('tvSeries')
      
      res.status(200).json({message: "Removed Successfully"}) 
    } catch (err) {
      res.status(500).json(err) 
    }
  }
}


module.exports = TvSeriesController