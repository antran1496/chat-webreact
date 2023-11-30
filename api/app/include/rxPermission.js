/* global rxu, pri */
// let UserModel = require(global.baseapp + '/models/userModel.js')
// let RoleModel = require(global.baseapp + '/models/roleModel.js')
// let PermissionModel  = require(global.baseapp + '/models/permissionModel.js')
const jwt = require('jsonwebtoken')
rxu.signToken = function (data, secret) {
  return jwt.sign(data, secret/* {expiresIn: pri.userconf.tokenExpiresIn} */)
}

rxu.signTokenNoExpired = function (data, secret) {
  return jwt.sign(data, secret)
}

rxu.validateToken = function (token, secret) {
  try {
    return jwt.verify(token, secret)
  } catch (err) {
    // console.log(err);
    return null
  }
}

let checkPermission = async function (req, res) {
  let arrPassAPIs = [
    'POST/v1/user/login', 'POST/v1/user/register', 'POST/mobi-v1/customer/facebookauth',
    'POST/mobi-v1/customer/phonenumber_register', 'POST/mobi-v1/customer/phonenumber_login',
    'POST/mobi-v1/customer/email_register', 'POST/mobi-v1/customer/email_login',
    'GET/mobi-v1/home/index', 'GET/mobi-v1/place/index', 'GET/mobi-v1/flight/index',
    'GET/mobi-v1/ticket/index', 'POST/v1/authorize/index', 'POST/mobi-v1/order/check_step_1',
    'POST/mobi-v1/order/check_step_2', 'GET/mobi-v1/order/payment', 'POST/v1/order/payment_callback',
    'POST/channel-v1/order/index', 'GET/mobi-v1/ticket_subscribe/update'
  ]

  let arrPassControllers = ['ticket', 'flight', 'home', 'place', 'ticket', 'crawler', 'site', 'page', 'dashboard']

  // let arrresult = []
  let controller = res.data.controller
  let version = res.data.version
  let action = res.data.action
  // let method = res.data.method
  let strcheck = res.data.method + '/' + version + '/' + controller + '/' + action
  let token = res.data.params.token || res.data.params.authorization

  if (arrPassControllers.indexOf(controller) !== -1) {
    return true
  }

  if (arrPassAPIs.indexOf(strcheck) === -1) {
    // Check if token is valid
    let decoded = rxu.validateToken(token, pri.userconf.secret); if (!decoded) { return false }
    res.data.decoded = decoded

    // Check user & admin permission
    let allowPaths = ['admin/v1', 'customer/mobi-v1']
    if (allowPaths.indexOf(decoded.role + '/' + version) !== -1) {
      return true
    }

    // Check other role permission
    // let role = await roleBus.findOneByParams({ code: decoded.role });
    // let userPermission = await permissionBus.findOneByParams({ controller: controller, action: action, method: method });
    //
    // if (!role || !userPermission) {
    //   return false;
    // }
    //
    // let permissions = role.permission.split(',');
    // if (permissions.indexOf(userPermission.id.toString()) === -1) {
    //   return false;
    // }
  }
  return true
}

module.exports = checkPermission
