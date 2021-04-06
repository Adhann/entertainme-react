const Movie = require('../models/Movie')

class MovieController {
  static async find(req, res) {
    try {
      const movies = await Movie.find()
      res.status(200).json(movies)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async findById(req, res, next) {
    try {
      const id = req.params.id
      const movie = await Movie.findById(id)
      if(!movie) throw res.status(404).json({message: "Error Not Found"})
      res.status(200).json(movie)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  
  static async addMovie(req, res, next) { 
    try {
      const { title, overview, poster_path, popularity, tags } = req.body

      const data = await Movie.create({title, overview, poster_path, popularity, tags})

      res.status(201).json(data.ops[0])
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const id = req.params.id
      const { title, overview, poster_path, popularity, tags } = req.body

      const data = await Movie.update(id, { title, overview, poster_path, popularity, tags })
      
      res.status(201).json(data.value)
    } catch (err) {
      res.status(500).json(err)  
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const id = req.params.id
      const data = await Movie.delete(id)
      if(!data.value) throw ({message: "Error Not Found"})
      res.status(200).json({message: "Removed Successfully"}) 
    } catch (err) {
      res.status(500).json(err) 
    }
  }
}


module.exports = MovieController