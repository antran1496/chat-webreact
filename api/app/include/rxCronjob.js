/* global pri */
// index.js
let cron = require('node-cron')
let request = require('request')
let host = 'http://localhost:' + pri.server.port

// let showstart = function (name) { console.log('\n--- S T A R T --- ' + name) }
// let showend = function (name) { console.log('--- D O N E --- ' + name) }

cron.schedule('*/30 * * * * *', function () {
  // let name = 'Automation CI CD'
  // showstart(name)
  request(host + '/auto?secret=Rxnano123!', (error, response, body) => {
    if (error) {
      console.log(error)
    } else if (response && response.statusCode && body) {
      // console.log(body)
    }
  })
  // showend(name)
})

cron.schedule('*/30 * * * * *', function () {
  request(host + '/auto/info?secret=Rxnano123!', (error, response, body) => {
    if (error) {
      console.log(error)
    } else if (response && response.statusCode && body) {}
  })
})
