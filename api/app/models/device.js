let mongoose = require('mongoose')
let Schema = mongoose.Schema

// create a schema
let userSchema = new Schema({
  uuid: { type: String, default: 0 },
  device: { type: Schema.Types.Mixed, default: {} },
  status: { type: Number, default: 0 },

  is_active: { type: Number, default: 1 },
  is_deleted: { type: Boolean, default: 0 },
  created_at: { type: Number, default: 0 },
  updated_at: { type: Number, default: 0 },
  authorization: { type: String, default: '@@@!!!@@@' }
}, { collection: 'device' })

userSchema.pre('save', function (next) {
  let self = this
  self.created_at = self.created_at || Math.floor(Date.now() / 1000)
  self.updated_at = Math.floor(Date.now() / 1000)
  next()
})

let Model = mongoose.model('Device', userSchema)
module.exports = Model
