let mongoose = require('mongoose')
let pri = require(global.baseapp + '/config/index.js')
let rxu = require('@rxframework/rxulti')

global.pri = pri

// Init one time
mongoose.set('useFindAndModify', false)
rxu.mgo = mongoose.connect(pri.mongo.server, { useNewUrlParser: true, useUnifiedTopology: true })
rxu.guard = async function (rxdata, condition, error, func) {
  if (!condition) {
    (typeof func === 'function') ? func() : await rxdata.response({ ...error, exit: true })
  }
}

rxu.log = function (loginfo) {
  switch (pri.env) {
    case 'development':
      console.log(loginfo)
      break
  }
}

module.exports = rxu
