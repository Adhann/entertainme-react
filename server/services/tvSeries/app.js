const express = require('express')
const { connect } = require('./config/mongodb')
const routes = require('./routes/')
const app = express()
const PORT = 4002
// const routes = require()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

connect().then(() => {
  console.log('Mongo connected');
  // console.log(database, '<<<<<<<<< DB');
  
  app.listen((PORT), () => {
    console.log('app running on PORT', PORT)
  })
})
