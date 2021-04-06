const urlMovie = 'http://localhost:4001/movies'
const Redis = require('ioredis')
const redis = new Redis()

class MovieController {
  static async findAll(req, res) {
    try {
      const movieCache = await redis.get('movies')
      if (movieCache) {
        res.status(200).json(JSON.parse(movieCache))
      } else {
        const { data } = await axios.get(urlMovie)
        await redis.set('movies', JSON.stringify(data))
        res.status(200).json(data)
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async findById(req, res, next) {
    try {
      const id = req.params.id
      const { data } = await axios.get(`${urlMovie}/${id}`)
      
      if(!data) throw res.status(404).json({message: "Error Not Found"})
      
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  
  static async addMovie(req, res, next) { 
    try {
      const { title, overview, poster_path, popularity, tags } = req.body

      const { data } = await axios.post(`${url}`, {
        title, overview, poster_path, poster_path, tags, popularity
      })

      await redis.del('movies')

      res.status(201).json(data.ops[0])
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const id = req.params.id
      const { title, overview, poster_path, popularity, tags } = req.body

      const { data } = await axios.put(`${url}/${id}`, {
        title, overview, poster_path, poster_path, tags, popularity
      })
      
      await redis.del('movies')

      res.status(201).json(data.value)
    } catch (err) {
      res.status(500).json(err)  
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const id = req.params.id
      const { data } = await axios.delete(`${url}/${id}`)
      if(!data.value) throw ({message: "Error Not Found"})
      
      await redis.del('movies')
      
      res.status(200).json({message: "Removed Successfully"}) 
    } catch (err) {
      res.status(500).json(err) 
    }
  }
}


module.exports = MovieController