// Auto load all model
let fs = require('fs')
let path = require('path')
let mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

let mongo = {}
fs.readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== '_index.js')
  })
  .forEach(function (file) {
    let model = require(path.join(__dirname, file))
    mongo[rxu.strCapitalize(file.replace('.js', ''))] = model
  })

module.exports = mongo
