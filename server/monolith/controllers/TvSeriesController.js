const TvSeries = require('../models/TvSeries')
class TvSeriesController {
  static async find(req, res) {
    try {
      const data = await TvSeries.find()
      res.send(data)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async findById(req, res, next) {
    try {
      const id = req.params.id
      const data = await TvSeries.findById(id)
      if(!data) throw res.status(404).json({message: "Error Not Found"})
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  
  static async addTvSeries(req, res, next) { 
    try {
      const { title, overview, poster_path, popularity, tags } = req.body

      const data = await TvSeries.create({title, overview, poster_path, popularity, tags})

      res.status(201).json(data.ops[0])
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async updateTvSeries(req, res, next) {
    try {
      const id = req.params.id
      const { title, overview, poster_path, popularity, tags } = req.body

      const data = await TvSeries.update(id, { title, overview, poster_path, popularity, tags })
      
      res.status(201).json(data.value)
    } catch (err) {
      res.status(500).json(err)  
    }
  }

  static async deleteTvSeries(req, res, next) {
    try {
      const id = req.params.id
      const data = await TvSeries.delete(id)
      if(!data.value) throw ({message: "Error Not Found"})
      res.status(200).json({message: "Removed Successfully"}) 
    } catch (err) {
      res.status(500).json(err) 
    }
  }

}


module.exports = TvSeriesController