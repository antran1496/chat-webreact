let pri = function () {}
pri.baseurl = 'http://localhost:4443'
pri.mongo = {
  server: 'mongodb://localhost:27017/rxnetalov1'
}
pri.server = {
  port: 4443, // parseInt(process.env.PORT) || 4443,
  timeout: 10000 // parseInt(process.env.TIMEOUT) || 10000
}

pri.userconf = {
}

module.exports = pri
