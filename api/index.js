// Variables & Nodejs libs
const http = require('http')

// Debug
const pmx = require('pmx')
const probe = pmx.probe()
const meter = probe.meter({ name: 'req/sec', samples: 50 })
let maxListenersExceededWarning = require('max-listeners-exceeded-warning')
maxListenersExceededWarning()

// Path
global.basedir = __dirname
global.baseapp = global.basedir + '/app'
global.baseup = global.basedir + '/upload'
global.baseup_img = global.baseup + '/image'

// Rx libs
global.rxu = require(global.baseapp + '/include/rxUtilserver.js')
global.rxunuse = require(global.baseapp + '/include/rxDatabase.js')
global.rxError = require(global.baseapp + '/include/rxError.js')
global.rxStatic = require(global.baseapp + '/include/rxStatic.js')
global.rxEnrich = require(global.baseapp + '/include/rxEnrich.js')
global.rxPermission = require(global.baseapp + '/include/rxPermission.js')
global.rxController = require(global.baseapp + '/include/rxController.js')
// global.rxCronjob = require(global.baseapp + '/include/rxCronjob.js')

// Handle all exception
let handleException = function (req, res, route, err) {
  rxu.log(err)
  if (err && err.toString() !== 'Error: EXIT') {
    rxu.log('ERROR: Error ' + err.stack)
    if (!res.isWritehead) { res.data.response({ success: 0, msg: 'Not supported, Exception', data: {} }) }
  }
}

let handleExceptionProcess = function (err) {
  rxu.log(err)
  if (err && err.toString() !== 'Error: EXIT') { rxu.log('ERROR: Error ' + err.stack) }
}

// Main script
rxu.log(`[RXRUNNING] API listening at http://localhost:${pri.server.port}`)
let server = http.createServer(function (req, res) {
  meter.mark()
  res.inthis = this
  let isStatic = global.rxStatic.serverStaticFiles(req, res)
  if (!isStatic) {
    global.rxEnrich.resEnrich(req, res, async function (data) {
      res.data = data

      // Case: CORD request
      if (['GET', 'POST'].indexOf(req.method) === -1) {
        res.data.response({ status: 1, msg: 'Allow' })
        return
      }

      try {
        // Check permisison
        let isAuthorized = await global.rxPermission(req, res)
        if (!isAuthorized) {
          // res.data.response({ success: -111, msg: global.rxError(-111) })
          // return
        }

        let controllerFile = global.baseapp + '/controllers' + '/' + res.data.version + '/' + res.data.controller + 'Controller.js'
        let actionName = (req.method === 'GET') ? res.data.action : req.method + res.data.action
        let controllerObj = new (require(controllerFile))(res)
        try { await controllerObj[actionName]() } catch (err) { rxu.log(err) /* early exist handle */ }

      // Case: error when server request
      } catch (err) {
        rxu.log(err)
        
        // Case: not found module
        if (err.code === 'MODULE_NOT_FOUND' || err.message === 'controllerObj[actionName] is not a function') {
          res.data.response({ status: -1, msg: 'Not support' })

        // Case: other error
        } else { res.data.response({ status: -1, msg: err.message }) }
      }
    })
  }
})

// Emit exception
server.setMaxListeners(0)
server.timeout = pri.server.timeout
server.on('error', (req, res, route, err) => handleException(req, res, route, err))
server.on('unhandledRejection', (req, res, route, err) => handleException(req, res, route, err))
server.on('uncaughtException', (req, res, route, err) => handleException(req, res, route, err))
server.listen(pri.server.port)

// Throw exception
process.on('unhandledRejection', (reason, p) => handleExceptionProcess(reason)) // rxu.log('ERROR: UnhandledRejection ' + reason) })
process.on('uncaughtException', (err) => handleExceptionProcess(err)) // rxu.log('ERROR: uncaughtException ' + err.stack) })
