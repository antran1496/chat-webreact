let mongoose = require('mongoose')
let Schema = mongoose.Schema

// create a schema
let userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  firstname: { type: String, required: false },
  fullname: { type: String, required: '' },
  username: { type: String, default: '' },
  address: { type: String, default: '' },
  admin: { type: Boolean, default: false },
  roleid: { type: String, default: '' },
  location: { type: String, default: '' },
  desc: { type: String, default: '' },
  meta: {
    age: { type: Number, default: 0 },
    website: { type: String, default: '' }
  },
  status: { type: Number, default: 0 },
  is_active: { type: Number, default: 1 },
  is_deleted: { type: Boolean, default: 0 },
  created_at: { type: Number, default: 0 },
  updated_at: { type: Number, default: 0 },
  authorization: { type: String, default: '@@@!!!@@@' }
}, { collection: 'user' })

userSchema.pre('save', function (next) {
  let self = this
  self.created_at = self.created_at || Math.floor(Date.now() / 1000)
  self.updated_at = Math.floor(Date.now() / 1000)
  next()
})

let Model = mongoose.model('User', userSchema)
module.exports = Model
