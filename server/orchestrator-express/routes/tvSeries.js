const router = require('express').Router()
const TvSeriesController = require('../controllers/TvSeriesController')

router.get('/', TvSeriesController.findAll)
router.get('/:id', TvSeriesController.findById)
router.post('/', TvSeriesController.addTvSeries)
router.put('/:id', TvSeriesController.updateTvSeries)
router.delete('/:id', TvSeriesController.deleteTvSeries)

module.exports = router