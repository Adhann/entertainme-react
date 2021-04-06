const express = require('express')
const routes = require('./routes/')
const app = express()
const PORT = 4000
// const routes = require()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen((PORT), () => {
  console.log('app running on PORT', PORT)
})
