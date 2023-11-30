let util = require('util')
let Model = mongo.Order
let rxdata = {}

function controller (res) { this.res = res; rxController.call(this, res); rxdata = res.data }
util.inherits(controller, rxController)

// G E T //
controller.prototype.index = async function () {
  let [err, dbarr] = await rxu.to(this.paging(this.filter(Model, rxdata.params), rxdata.params).exec())
  let [errcount, dbcount] = await rxu.to(this.count(Model, rxdata.params))
  err || errcount ? this.cbFailed() : this.cbSuccess(dbarr, { count: dbcount })
}

controller.prototype.delete = async function () {
  let [err] = await rxu.to(Model.findByIdAndUpdate(rxdata.params['_id'], { is_deleted: 1 }, { new: false }))
  err ? this.cbFailed() : this.cbSuccess(rxdata.params['_id'])
}

controller.prototype.restore = async function () {
  let [err] = await rxu.to(Model.findByIdAndUpdate(rxdata.params['_id'], { is_deleted: 0 }, { new: false }))
  err ? this.cbFailed() : this.cbSuccess(rxdata.params['_id'])
}

// P O S T //
controller.prototype.POSTindex = async function () {
  let updating = [ 'name', 'address', 'address1', 'phone', 'status', 'order', 'is_active', 'is_hot' ]
  let dbObj = new Model(this.preUpdate(updating, rxdata.params))
  let [err, redbObj] = await rxu.to(dbObj.save())
  err ? this.cbFailed() : this.cbSuccess(redbObj)
}

controller.prototype.POSTedit = async function () {
  let updating = [ 'name', 'address', 'address1', 'phone', 'status', 'order', 'is_active', 'is_hot' ]
  let modeldata = this.preUpdate(updating, rxdata.params)
  let [err] = await rxu.to(Model.findByIdAndUpdate(rxdata.params['_id'], modeldata, { new: false }))
  err ? this.cbFailed() : this.cbSuccess(rxdata.params['_id'])
}

module.exports = controller
