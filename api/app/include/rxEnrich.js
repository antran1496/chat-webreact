let url = require('url')
let formidable = require('formidable')

// Enrice data
let resEnrich = function (req, res, callback) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  let pathinfo = url.parse(req.url, true)
  let data = {
    req: req,
    url: url,
    startTime: rxu.now(),

    hostname: req.headers.host,
    method: req.method,

    pathinfo: pathinfo,
    pathname: pathinfo.pathname,
    allpath: pathinfo.pathname.split('/')
  }

  data.hostname = req.headers.host
  data.pathinfo = url.parse(req.url, true)
  data.pathname = data.pathinfo.pathname
  data.allpath = data.pathname.split('/')
  data.method = req.method
  data.version = data.allpath[1]
  data.controller = (typeof (data.allpath[2]) !== 'undefined') ? data.allpath[2] : 'index'
  data.action = (typeof (data.allpath[3]) !== 'undefined') ? data.allpath[3] : 'index'

  if (data.allpath.length < 4) {
    data.version = 'v1'
    data.controller = (typeof (data.allpath[1]) !== 'undefined') ? data.allpath[1] : 'index'
    data.action = (typeof (data.allpath[2]) !== 'undefined') ? data.allpath[2] : 'index'
  }

  // rxu.log(req.method + ': ' + data.controller + '/' + data.action + ' :' + req.url)
  data.render = async function (options) {
    res.setHeader('Content-Type', 'text/html')
    options = options || {}

    let tempData = options.html || ''
    let exit = options.exit || true

    let returnData = tempData
    if (exit || !exit) {
      res.writeHead(200)
      await res.end(returnData)
      // res.destroy()
    } else {
      res.writeHead(200)
      await res.end(returnData)
      // res.destroy()
    }
  }

  data.renderjson = async function (options) {
    res.setHeader('Content-Type', 'application/json')
    options = options || {}
    res.writeHead(200)
    await res.end(JSON.stringify(options))
  }

  data.renderplain = async function (options) {
    res.setHeader('Content-Type', 'text/plain')
    options = options || {}

    let tempData = options.html || ''
    let exit = options.exit || true

    let returnData = tempData
    if (exit || !exit) {
      res.writeHead(200)
      await res.end(returnData)
      // res.destroy()
    } else {
      res.writeHead(200)
      await res.end(returnData)
      // res.destroy()
    }
  }

  // Response func
  data.response = async function (options, extra) {
    options = options || {}

    let tempData = {}
    let exit = options.exit === true ? options.exit : false

    tempData.success = options.success || 0
    tempData.msg = options.msg || rxError(options.success)
    tempData.data = options.data || {}
    tempData.extra = options.extra || {}
    tempData.cpui = rxu.now() - data.startTime
    tempData.cpu = tempData.cpui.toString().substr(0, 8) + 'ms'
    let returnData = JSON.stringify(tempData)

    if (!res.isWritehead) {
      res.writeHead(200)
      res.isWritehead = true
    }

    await res.end(returnData)
    if (tempData.cpui < 5) {
      rxu.log('\x1b[36m' + req.method + ': ' + data.controller + '/' + data.action + ' :' + tempData.cpu + '\x1b[0m')
    } else if (tempData.cpui < 10) {
      rxu.log('\x1b[36m' + req.method + ': ' + data.controller + '/' + data.action + ' :' + tempData.cpu + '\x1b[33m - MEDIUM \x1b[0m ')
    } else if (tempData.cpui < 100) {
      rxu.log('\x1b[36m' + req.method + ': ' + data.controller + '/' + data.action + ' :' + tempData.cpu + '\x1b[31m - SLOW \x1b[0m')
    }

    if (exit) { throw new Error('EXIT') }
  }

  data.responseEnd = async function () {
    if (!res.isWritehead) {
      res.writeHead(200)
      res.isWritehead = true
      await res.end(`{"success": 0, "msg": "Done job", "data": {}}`)
      // res.destroy()
    }
  }

  // Request params
  let form = new formidable.IncomingForm()
  form.encoding = 'utf-8'

  if (data.method === 'GET') {
    data.params = data.pathinfo.query
    callback(data)
  } else {
    form.uploadDir = global.baseup + '/temp/'
    form.parse(req, function (err, fields, files) {
      if (!err) {
        data.files = files
        data.form = form

        // Add get + post params
        data.params = Object.assign(fields, data.pathinfo.query)
        callback(data)

      // Case: cant perform action
      } else { console.log(err) }
    })
  }

  return data
}

module.exports = {
  resEnrich: resEnrich
}
