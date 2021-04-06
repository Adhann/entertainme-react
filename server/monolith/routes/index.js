const router = require('express').Router()
const movieRouter = require('./movie')
const tvSeriesRouter = require('./tvSeries')

router.use('/movies', movieRouter)
router.use('/tvSeries', tvSeriesRouter)

module.exports = router