let mongoose = require('mongoose')
let Schema = mongoose.Schema

// create a schema
let schema = new Schema({
  name: { type: String, default: '' },
  desc: { type: String, default: '' },

  // [[RX_MODEL_CUSTOM]] //
  // [[RX_MODEL_CUSTOM_END]] //

  is_deleted: { type: Number, default: 0 },
  is_active: { type: Number, default: 1 },
  created_at: { type: Number, default: 0 },
  updated_at: { type: Number, default: 0 }
})

schema.pre('save', function (next) {
  this.created_at = this.created_at || Math.floor(Date.now() / 1000)
  this.updated_at = Math.floor(Date.now() / 1000)
  next()
})

let exportModel = mongoose.model('[[RXNAME]]', schema)
module.exports = exportModel
