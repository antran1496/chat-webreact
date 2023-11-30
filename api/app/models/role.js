let mongoose = require('mongoose')
let Schema = mongoose.Schema

// create a schema
let schema = new Schema({
  name: { type: String, default: '', required: true, unique: true },
  code: { type: String, default: '' },
  desc: { type: String, default: '' },
  id: { type: Number, default: 0 },
  permission: { type: String, default: '' },
  is_deleted: { type: Number, default: 0 },
  is_active: { type: Number, default: 1 },
  created_at: { type: Number, default: 0 },
  updated_at: { type: Number, default: 0 }
}, { collection: 'role' })

let Model = mongoose.model('Role', schema)
schema.pre('save', function (next) {
  let self = this
  self.created_at = self.created_at || Math.floor(Date.now() / 1000)
  self.updated_at = Math.floor(Date.now() / 1000)
  next()
})

module.exports = Model
