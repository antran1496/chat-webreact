let util = require('util')
let mongoose = require('mongoose')
let User = require(global.baseapp + '/models/user.js')
let RoleModel = require(global.baseapp + '/models/role.js')
let PermissionModel = require(global.baseapp + '/models/permission.js')
let rxdata = {}

let filterArr = ['password']

function controller (res) { this.res = res; rxController.call(this, res); rxdata = res.data }
util.inherits(controller, rxController)

controller.prototype.POSTindex = async function () {
  let valid = this.validate({
    username: { required: true },
    password: { required: true }
  })

  if (valid) {
    let [err, newUser] = await rxu.to(User.findOneAndUpdate({ username: rxdata.params['username'], password: rxu.md5(rxdata.params['password']), admin: true, is_deleted: 0, is_active: 1 }, { $set: { authorization: rxu.genhex() } }, { new: true }))

    let arrresult = []
    let roleid = (newUser) ? newUser.roleid : null
    if (roleid) {
      let [, dbarrrole] = await rxu.to(RoleModel.findOne({ '_id': mongoose.Types.ObjectId(roleid), 'is_deleted': 0 }))
      if (dbarrrole && dbarrrole.permission) {
        let arrper = dbarrrole.permission.split(',')
        if (arrper && arrper.length > 0) {
          let [, dbarrper] = await rxu.to(PermissionModel.find({ 'id': { '$in': arrper } }))
          let arrrole = dbarrper.map((item) => item.controller)
          arrresult = Array.from(new Set(arrrole))
        }
      }
    }

    if (arrresult.length !== 0) {
      err ? rxdata.response({ success: -2, msg: 'Cant authorize!' }) : newUser ? rxdata.response({ 'success': 1, 'msg': 'Allow', 'data': { 'user': rxu.filter(newUser, filterArr), 'arrper': arrresult } }) : rxdata.response({ success: -2, msg: 'Cant authorize!' })
    } else {
      err ? rxdata.response({ success: -2, msg: 'Cant authorize!' }) : newUser ? this.cbSuccess(rxu.filter(newUser, filterArr)) : rxdata.response({ success: -2, msg: 'Cant authorize!' })
    }
  }
}

module.exports = controller
