const router = require('express').Router()
const tvSeriesRouter = require('./tvSeries')

router.use('/tvSeries', tvSeriesRouter)

module.exports = router