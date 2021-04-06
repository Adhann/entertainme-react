const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')

class TvSeries {
  static find() {
    return getDatabase().collection('tvSeries').find().toArray()
  }
  
  static findById(id) {
    return getDatabase().collection('tvSeries').findOne({ _id: ObjectId(id) })
  }

  static create(objTvSeries) {
    return getDatabase().collection('tvSeries').insertOne(objTvSeries)
  }

  static update(id, objTvSeries) {
    return getDatabase().collection('tvSeries').findOneAndUpdate({ _id: ObjectId(id) }, { $set: objTvSeries })
  }

  static delete(id) {
    return getDatabase().collection('tvSeries').findOneAndDelete({ _id: ObjectId(id) })
  }
}

module.exports = TvSeries