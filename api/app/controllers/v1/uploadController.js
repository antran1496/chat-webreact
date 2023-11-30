let path = require('path')
let util = require('util')
let fs = require('fs')
let rxdata = {}

function controller (res) { this.res = res; rxController.call(this, res); rxdata = res.data }
util.inherits(controller, rxController)

controller.prototype.POSTindex = async function () {
  let rxfile = rxdata.files.uploadFile
  let rxfileNew = Math.round(rxu.now('micro')) + rxu.strGen() + path.extname(rxfile.name)
  fs.rename(rxfile.path, path.join(global.baseup_img, rxfileNew), (err) => {
    err ? rxdata.response({ success: 0 }) : rxdata.response({ success: 1, msg: 'From index', data: rxfileNew })
  })
}

module.exports = controller
