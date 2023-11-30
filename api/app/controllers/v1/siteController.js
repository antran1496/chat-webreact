let util = require('util')
let rxdata = {}

function controller (res) { this.res = res; rxController.call(this, res); rxdata = res.data }
util.inherits(controller, rxController)

controller.prototype.index = async function () {
  let [err2, dbarrProduct] = await rxu.to(this.paging(this.filter(mongo.Product, { is_active: 1, is_deleted: 0 }), { pg_size: 3 }).exec())
  let [, dbarrReview] = await rxu.to(this.paging(this.filter(mongo.Review, { is_active: 1, is_deleted: 0 }), { pg_size: 3 }).exec())
  err2 ? this.cbFailed() : this.cbSuccess({ products: dbarrProduct, reviews: dbarrReview })
}

controller.prototype.product = async function () {
  let [err, dbarr] = await rxu.to(this.paging(this.filter(mongo.Product, rxdata.params), rxdata.params).populate('appdistobj appobj', null, { is_deleted: 0, is_active: 1 }).exec())
  let [, dbarr1] = await rxu.to(this.paging(this.filter(mongo.Product, { is_active: 1, is_deleted: 0 }), rxdata.params).populate('appdistobj appobj', null, { is_deleted: 0, is_active: 1 }).exec())
  let [, dbarr2] = await rxu.to(this.paging(this.filter(mongo.Productcate, { is_active: 1, is_deleted: 0 }), { pg_size: 10 }).exec())
  err ? this.cbFailed() : this.cbSuccess({ products: dbarr, hotproducts: dbarr1, cate: dbarr2 })
}

controller.prototype.productcate = async function () {
  let [err, dbarr] = await rxu.to(this.paging(this.filter(mongo.Product, rxdata.params), rxdata.params).populate('appdistobj appobj', null, { is_deleted: 0, is_active: 1 }).exec())
  err ? this.cbFailed() : this.cbSuccess({ products: dbarr })
}

controller.prototype.POSTorderadd = async function () {
  let updating = ['address', 'address1', 'phone', 'order']
  rxdata.params.order = rxu.json(rxdata.params.order)

  let dbObj = new mongo.Order(this.preUpdate(updating, rxdata.params))
  let [err, redbObj] = await rxu.to(dbObj.save())
  err ? this.cbFailed() : this.cbSuccess({ order: redbObj })
}

controller.prototype.testSql = async function () {
  let result = await rxu.to(rxu.sql.course.build({ name: 'foo', description: 'bar' }).save())
  rxdata.response({ msg: 'From user', data: result })
}

controller.prototype.testRedis = async function () {
  let result1 = {}
  let result2 = {}
  let result3 = {}

  /*
  // for (let i = 0; i < 1000000; i++) {
  let user = new rxu.redis.User()
  user.property({ name: 'test2', email: 'someMail@example.com', password: '123123', created_at: rxu.now() })
  try { await user.save() } catch (error) { if (error instanceof nohm.ValidationError) {} }
  // }

  // result1 = await UserModel.find({ visits: { offset: 15, limit: 2 }})
  // result1 = await UserModel.find({ name: { limit: 5 } })

  result1 = await rxu.redis.User.sort({ field: 'created_at', direction: 'DESC', limit: [0, 10] })
  // result1 = await UserModel.loadMany(result1)
  // for (let i in result1) {
  // result1[i] = result1[i].allProperties()
  // } */
  rxdata.response({ msg: 'From sqlLK', data: { user: result1, users: result2, count: result3 } })
}

module.exports = controller
