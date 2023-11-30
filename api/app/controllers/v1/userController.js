let util = require('util')
let Model = require(global.baseapp + '/models/user.js')
let RoleModel = require(global.baseapp + '/models/role.js')
let PermissionModel = require(global.baseapp + '/models/permission.js')
// let PerController = require(global.baseapp + '/controllers/permissionController.js')
// let crypto = require('crypto')
let rxdata = {}

// let filterArr = ['password']

function controller (res) { this.res = res; rxController.call(this, res); rxdata = res.data }
util.inherits(controller, rxController)

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

controller.prototype.POSTindex = async function () {
  if (this.validate({
    username: { required: true },
    fullname: { required: true },
    email: { required: true },
    phone: { required: true },
    address: { required: true },
    password: { required: true },
    // roleid: {required: true},
    repassword: { required: true }
  })) {
    if (rxdata.params.password !== rxdata.params.repassword) {
      this.cbFailed({ msg: 'Your password and repeat password do not match.' })
    } else {
      rxdata.params.password = rxu.md5(rxdata.params.password)
      rxdata.params.admin = true

      let updating = ['username', 'fullname', 'email', 'phone', 'password', 'address', 'admin', 'roleid']
      let modeldata = this.preUpdate(updating, rxdata.params)
      let dbObj = new Model(modeldata)
      let valid = await this.preventDupplicateSync(Model, { email: rxdata.params['email'], username: rxdata.params['username'] }, rxdata.params['_id'])
      let valieemail = this.validateEmail(rxdata.params.email)
      if (valid && valieemail) {
        let [err, dbarr] = await rxu.to(dbObj.save())
        err ? this.cbFailed() : this.cbSuccess(dbarr)
      } else {
        this.cbFailed({ msg: 'Email format do not match Or Email duplicate Or Username duplicate' })
      }
    }
  }
}

controller.prototype.POSTedit = async function () {
  let updating = ['username', 'fullname', 'email', 'phone', 'address', 'roleid', 'desc']
  // let intfield = ['created_at', 'updated_at', 'is_deleted', 'is_active']
  let modeldata = this.preUpdate(updating, rxdata.params)
  let [err] = await rxu.to(Model.findByIdAndUpdate(rxdata.params['_id'], modeldata, { new: false }))
  err ? this.cbFailed() : this.cbSuccess(rxdata.params['_id'])
}

controller.prototype.gen = async function () {
  let arrtmp = []
  let [, dbperarr] = await rxu.to(PermissionModel.find({ is_deleted: 0 }, { id: 1, _id: 0 }).exec())
  dbperarr.forEach((perid) => { arrtmp.push(perid.id) })

  let jsonRole = { name: 'SupperAdmin', desc: 'SupperAdmin', code: '01234', permission: arrtmp.join(','), created_at: Math.floor(Date.now() / 1000), updated_at: Math.floor(Date.now() / 1000), is_deleted: 0, is_active: 1, id: 0 }
  let [, dbrole] = await rxu.to(RoleModel.findOneAndUpdate(
    { name: 'SupperAdmin', code: '01234' },
    { $set: jsonRole },
    { new: true, upsert: true }
  ).exec())

  let jsonUser = { username: 'admin', fullname: 'admin', email: 'admin@gmail.com', phone: '(+84)000000000', address: '', password: rxu.md5('admin'), admin: true, roleid: dbrole._id, created_at: Math.floor(Date.now() / 1000), updated_at: Math.floor(Date.now() / 1000), is_deleted: 0, is_active: 1 }
  await rxu.to(Model.findOneAndUpdate(
    { username: 'admin', fullname: 'admin' },
    { $set: jsonUser },
    { new: true, upsert: true }
  ).exec())
  rxdata.response({ success: 1, msg: 'Gen user success' })
}

module.exports = controller
