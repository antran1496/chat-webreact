let util = require('util')
let Model = require(global.baseapp + '/models/role.js')
let rxdata = {}

function controller (res) { this.res = res; rxController.call(this, res); rxdata = res.data }
util.inherits(controller, rxController)

// G E T //
controller.prototype.index = async function () {
  let [err, dbarr] = await rxu.to(this.paging(this.filter(Model, rxdata.params), rxdata.params).exec())
  let [errcount, dbcount] = await rxu.to(this.count(Model, rxdata.params))
  err || errcount ? this.cbFailed() : this.cbSuccess(dbarr, { count: dbcount })
}
controller.prototype.all = async function () {
  let [err, dbarr] = await rxu.to(Model.find({ is_deleted: 0 }).exec())
  err ? this.cbFailed() : this.cbSuccess(dbarr)
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
  rxdata.params['permission'] = (rxdata.params['permission'] && rxdata.params['permission'].constructor === Array) ? rxdata.params['permission'].join(',') : rxdata.params['permission']
  let dbObj = new Model({
    name: rxdata.params['name'],
    desc: rxdata.params['desc'],
    code: rxdata.params['code'],
    permission: rxdata.params['permission'],
    created_at: Math.floor(Date.now() / 1000),
    updated_at: Math.floor(Date.now() / 1000)
  })
  let valid = await this.preventDupplicateSync(Model, { name: dbObj.name }, 0)
  if (valid) {
    let [err, arrdbObj] = await rxu.to(dbObj.save())
    err ? this.cbFailed() : this.cbSuccess(arrdbObj)
  }
}
controller.prototype.POSTedit = async function () {
  rxdata.params['permission'] = (rxdata.params['permission'] && rxdata.params['permission'].constructor === Array) ? rxdata.params['permission'].join(',') : rxdata.params['permission']
  let updating = ['name', 'desc', 'code', 'permission']
  let intfield = ['created_at', 'updated_at', 'is_deleted', 'is_active']
  let [err] = await rxu.to(Model.findByIdAndUpdate(rxdata.params['_id'], this.preUpdate(updating, rxdata.params, intfield), { new: false }))
  err ? this.cbFailed() : this.cbSuccess(rxdata.params['_id'])
}
module.exports = controller
