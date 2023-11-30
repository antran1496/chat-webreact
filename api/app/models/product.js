let mongoose = require('mongoose')
let Schema = mongoose.Schema
let cateName = 'productcate'

// create a schema
let schema = new Schema({

  // General
  name: { type: String, default: '' },
  desc: { type: String, default: '' },
  tags: { type: Array, default: [] },
  content: { type: String, default: '' },
  price: { type: Number, default: 0 },
  price_old: { type: Number, default: 0 },
  packed: { type: Number, default: 500 },

  // Seo
  seoslug: { type: String, default: '' },
  seotitle: { type: String, default: '' },
  seometa: { type: String, default: '' },

  // Image
  img_landscape: { type: String, default: '' },
  img_portrait: { type: String, default: '' },
  img_detail: { type: String, default: '' },

  // Stock
  stock: { type: Number, default: 0 },
  unit: { type: String, default: 'g' },

  // Rating
  ratings: { type: Array, default: [] },
  ratingsSumary: { type: Number, default: 0 },

  // Options, Attributes
  options: { type: Array, default: [] },
  attributes: { type: Array, default: [] },

  // Relation - cate
  app: { type: mongoose.Schema.Types.ObjectId, ref: cateName },
  appobj: { type: mongoose.Schema.Types.ObjectId, ref: cateName },
  appdist: [{ type: mongoose.Schema.Types.ObjectId, ref: cateName }],
  appdistobj: [{ type: mongoose.Schema.Types.ObjectId, ref: cateName }],

  // [[RX_MODEL_CUSTOM]] //
  // [[RX_MODEL_CUSTOM_END]] //

  // Status
  is_hot: { type: Number, default: 0 },
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

let exportModel = mongoose.model('product', schema)
module.exports = exportModel
