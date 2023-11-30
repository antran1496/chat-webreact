/* global rxu, rxError */
let mongoose = require('mongoose')
let req = require('request')
// let UserModel = require(global.baseapp + '/models/userModel.js') //(rxu.orm)

function rxController (res) { this.res = res }

// S Y N C //
// Validates
rxController.prototype.validate = function (rules) {
  let rxdata = this.res.data
  let validateResult = rxu.validate(rxdata.params, rules)
  if (!validateResult['rxresult']) {
    rxdata.response({ success: -2, msg: 'Wrong input', rxdata: validateResult })
    return false
  }

  return true
}

rxController.prototype.validateEmail = function (email) {
  let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  let rxdata = this.res.data
  if (!re.test(email)) {
    rxdata.response({ success: -2, msg: 'Email invalid format' })
    return false
  } else {
    return true
  }
}

// Data work
rxController.prototype.filter = function (hmodel, params, arrInttype) {
  // Int type field
  arrInttype = arrInttype || ['created_at', 'updated_at', 'is_deleted', 'is_active']

  // Default filter first
  let filterDefault = { is_deleted: 0 }

  for (let index in params) {
    let curEle = params[index]

    // Search with option
    if (index.indexOf('searchoption_') === 0) {
      let curSearchTerm = index.replace('searchoption_', '')
      let searchValue = curEle.indexOf(',') === -1 ? curEle : curEle.split('\\,', -1)
      let elemMatch = {}; elemMatch[curSearchTerm + '.value'] = searchValue
      filterDefault['options'] = { $elemMatch: elemMatch }

    // Search price
    } else if (index.indexOf('searchprice_min') === 0) {
      // let curSearchTerm = index.replace('searchprice_min', '')
      filterDefault = { price: { $gt: curEle * 1000 } }

    // Search price
    } else if (index.indexOf('searchprice_max') === 0) {
      // let curSearchTerm = index.replace('searchprice_max', '')
      filterDefault = { price: { $lt: curEle * 1000 } }

    // Search with _id
    } else if (index.indexOf('searchid_') === 0) {
      let curSearchTerm = index.replace('searchid_', '')
      filterDefault[curSearchTerm] = mongoose.Types.ObjectId(curEle)
    } else if (index.indexOf('search_') === 0) {
      let curSearchTerm = index.replace('search_', '')
      if (arrInttype.indexOf(curSearchTerm) > -1) {
        curEle = parseInt(curEle)
        filterDefault[curSearchTerm] = curEle
      } else {
        filterDefault[curSearchTerm] = new RegExp(curEle, 'i')
      }
    }
  }

  return hmodel.find(filterDefault)
}

rxController.prototype.count = function (hmodel, params, arrInttype) {
  // Int type field
  arrInttype = arrInttype || ['created_at', 'updated_at', 'is_deleted', 'is_active']

  // Default filter first
  let filterDefault = { is_deleted: 0 }

  for (let index in params) {
    let curEle = params[index]

    // Search with option
    if (index.indexOf('searchoption_') === 0) {
      let curSearchTerm = index.replace('searchoption_', '')
      let searchValue = curEle.indexOf(',') === -1 ? curEle : curEle.split('\\,', -1)
      let elemMatch = {}; elemMatch[curSearchTerm + '.value'] = searchValue
      filterDefault['options'] = { $elemMatch: elemMatch }

    // Search price
    } else if (index.indexOf('searchprice_min') === 0) {
      // let curSearchTerm = index.replace('searchprice_min', '')
      filterDefault = { price: { $gt: curEle * 1000 } }

    // Search price
    } else if (index.indexOf('searchprice_max') === 0) {
      // let curSearchTerm = index.replace('searchprice_max', '')
      filterDefault = { price: { $lt: curEle * 1000 } }

    // Search with _id
    } else if (index.indexOf('searchid_') === 0) {
      let curSearchTerm = index.replace('searchid_', '')
      filterDefault[curSearchTerm] = mongoose.Types.ObjectId(curEle)
    } else if (index.indexOf('search_') === 0) {
      let curSearchTerm = index.replace('search_', '')
      if (arrInttype.indexOf(curSearchTerm) > -1) {
        curEle = parseInt(curEle)
        filterDefault[curSearchTerm] = curEle
      } else {
        filterDefault[curSearchTerm] = new RegExp(curEle, 'i')
      }
    }
  }

  return hmodel.count(filterDefault)
}

rxController.prototype.paging = function (hmodel, params) {
  params = params || {}
  // Paging
  let pgPage = (typeof (params.pg_page) === 'undefined' || parseInt(params.pg_page) < 1) ? 1 : parseInt(params.pg_page)
  let pgSize = (typeof (params.pg_size) === 'undefined' || parseInt(params.pg_size) < 1 || parseInt(params.pg_size) > 10001) ? 10 : parseInt(params.pg_size)

  // Sorting
  let stCol = params.st_col || 'created_at'
  let stType = (typeof (params.st_type) === 'undefined' || parseInt(params.st_type) !== 1) ? -1 : 1
  let stParams = {}; stParams[stCol] = stType
  return hmodel.limit(pgSize).skip((pgPage - 1) * pgSize).sort(stParams)
}

rxController.prototype.preUpdate = function (editables, params, arrInttype) {
  let dataUpdate = {}
  if (params.rxraw) {
    dataUpdate = params
  } else {
    arrInttype = arrInttype || ['created_at', 'updated_at', 'is_deleted', 'is_active']
    for (let index in params) {
      if (editables.indexOf(index) > -1) {
        if (arrInttype.indexOf(index) > -1) {
          params[index] = parseInt(params[index])
        }
        dataUpdate[index] = params[index]
      }
    }
  }

  return dataUpdate
}

rxController.prototype.preventDupplicate = function (model, params, ignoreId, callback) {
  ignoreId = ignoreId || 0

  // Ignore current data
  if (ignoreId) {
    params['_id'] = { '$ne': mongoose.Types.ObjectId(ignoreId) }
  }

  let rxdata = this.res.data
  model.find(params, function (err, docs) {
    if (err || docs.length) {
      rxdata.response({ success: -2, msg: 'Dupplicate data' })

    // Case: not dupplicate data
    } else { callback() }
  })

  return true
}

// Reponse helper
rxController.prototype.cbSuccess = function (data, extra) {
  let rxdata = this.res.data
  rxdata.response({ success: 1, msg: 'Query data success!', data: data, extra: extra })
}

rxController.prototype.cbSuccessRender = function (data) {
  let rxdata = this.res.data
  rxdata.render({ html: data })
}

rxController.prototype.cbFailed = function (message, data, code) {
  var rxdata = this.res.data
  if (typeof message === 'string') {
    rxdata.response({ success: code || -1, msg: message || rxError(-1), data: data })
  } else if (typeof message === 'number') {
    rxdata.response({ success: message, msg: rxError(message) || rxError(-1), data: data })
  } else {
    rxdata.response({ success: -1, msg: rxError(-1), data: data })
  }
}

// A S Y N C //

// Validates
/* rxController.prototype.authorize = async function() {
  let inthis  = this
  let rxdata  = this.res.data
  let token   = rxdata.params.token || ''
  let options = { uri: rxu.pri.passport.token +'?token=' + token , method: 'GET', json: true }
  let result  = {}

  // Verify token
  return new Promise(async function(resolve, reject) {
    req.get(options, async function(err, resp, body) {
      try {
        let ppuserInfo = rxu.get(body, ['data', 'user'], {})
        if (ppuserInfo.username) {

          // Find userinfo in database
          let [userErr, userObj] = await rxu.to(UserModel.findOne({username: ppuserInfo.username}))
          if (!userErr && userObj && userObj.username && mongoose.Types.ObjectId.isValid(userObj._id)) {

            // HAPPYENDING
            resolve(userObj)

          // Cant find user case
          } else { rxdata.response({success: -2, msg: 'Cant authorize !!'}); resolve(false) }

        // Passport cant authorize username
        } else { rxdata.response({success: -2, msg: 'Cant authorize !'}); resolve(false) }
      } catch(e) { rxu.emit(inthis, e) }
    })
  })
} */

rxController.prototype.authenticate = async function () {
  let inthis = this
  let rxdata = this.res.data
  let username = rxdata.params.username || ''
  let password = rxdata.params.password || ''

  let options = { uri: rxu.pri.passport.auth + '?username=' + username + '&password=' + password, method: 'GET', json: true }
  return new Promise(function (resolve, reject) {
    req.get(options, function (err, resp, body) {
      if (!err) {
        try {
          let ppauth = rxu.get(body, ['data', 'token'], false)
          if (ppauth) {
            // HAPPYENDING
            resolve(ppauth)

          // Passport cant authenticate username & passwork
          } else { rxdata.response({ success: -2, msg: 'Cant authorize !' }); resolve(false) }
        } catch (e) { rxu.emit(inthis, e) }
      } else { rxdata.response({ success: -2, msg: 'Cant authorize !' }); resolve(false) }
    })
  })
}

// Data work
rxController.prototype.preventDupplicateSync = async function (model, params, ignoreId) {
  ignoreId = ignoreId || 0

  let rxdata = this.res.data
  let [err, dbObj] = await rxu.to(model.findOne(params))
  if (err || dbObj) {
    rxdata.response({ success: 0, msg: 'Dupplicate data' })
    return false

  // Case: not error and not dupplication data
  } else { return true }
}

module.exports = rxController
