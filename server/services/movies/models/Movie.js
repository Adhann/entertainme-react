const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')

class Movie {
  static find() {
    return getDatabase().collection('movies').find().toArray()
  }
  
  static findById(id) {
    return getDatabase().collection('movies').findOne({ _id: ObjectId(id) })
  }

  static create(objMovie) {
    return getDatabase().collection('movies').insertOne(objMovie)
  }

  static update(id, objMovie) {
    return getDatabase().collection('movies').findOneAndUpdate({ _id: ObjectId(id) }, { $set: objMovie })
  }

  static delete(id) {
    return getDatabase().collection('movies').findOneAndDelete({ _id: ObjectId(id) })
  }
}

module.exports = Movie