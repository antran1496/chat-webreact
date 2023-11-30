let mongoose = require('mongoose')
let Schema = mongoose.Schema

// create a schema
let schema = new Schema({
  name: { type: String, default: '', required: true, unique: true },
  id: { type: Number, default: 0 },
  controller: { type: String, default: '' },
  action: { type: String, default: '' },
  method: { type: String, default: '' },
  desc: { type: String, default: '' },
  meta: { type: String, default: '' },
  is_deleted: { type: Number, default: 0 },
  is_active: { type: Number, default: 1 },
  created_at: { type: Number, default: 0 },
  updated_at: { type: Number, default: 0 }
}, { collection: 'permission' })

let Model = mongoose.model('Permission', schema)
schema.pre('save', function (next) {
  let self = this
  self.created_at = self.created_at || Math.floor(Date.now() / 1000)
  self.updated_at = Math.floor(Date.now() / 1000)
  next()
})

module.exports = Model
