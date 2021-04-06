const router = require('express').Router()
const movieRouter = require('./movie')

router.use('/movies', movieRouter)

module.exports = router