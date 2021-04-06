const router = require('express').Router()
const movieRouter = require('./movie')
const tvSeriesRouter = require('./tvSeries')
const entertainmeRouter = require('./entertainme')

router.use('/movies', movieRouter)
router.use('/tvSeries', tvSeriesRouter)
router.use('/entertainme', entertainmeRouter)

module.exports = router