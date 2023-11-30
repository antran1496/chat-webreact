/* global rxController, rxu */
let util = require('util')
let Model = require(global.baseapp + '/models/permission.js')
let fs = require('fs')
let rxdata = {}

function controller (res) { this.res = res; rxController.call(this, res); rxdata = res.data }
util.inherits(controller, rxController)

// G E T //
controller.prototype.index = async function () {
  let [err, dbarr] = await rxu.to(this.paging(this.filter(Model, rxdata.params), rxdata.params).exec())
  let [errcount, dbcount] = await rxu.to(this.count(Model, rxdata.params))
  err || errcount ? this.cbFailed() : this.cbSuccess(dbarr, { count: dbcount })  
}

controller.prototype.all = async function () {
  let [err, dbarr] = await rxu.to(Model.find({ is_deleted: 0 }).exec())
  err ? this.cbFailed() : this.cbSuccess(dbarr)
}

controller.prototype.delete = async function () {
  let [err] = await rxu.to(Model.findByIdAndUpdate(rxdata.params['_id'], { is_deleted: 1 }, { new: false }))
  err ? this.cbFailed() : this.cbSuccess(rxdata.params['_id'])
}

controller.prototype.restore = async function () {
  let [err] = await rxu.to(Model.findByIdAndUpdate(rxdata.params['_id'], { is_deleted: 0 }, { new: false }))
  err ? this.cbFailed() : this.cbSuccess(rxdata.params['_id'])
}

controller.prototype.generation = async function () {
  getGenPermission()
  rxdata.response({ success: 1, msg: 'Gen permission success' })
}

controller.prototype.POSTedit = async function () {
  let updating = ['name', 'desc']
  // let intfield = ['created_at', 'updated_at', 'is_deleted', 'is_active']

  let valid = await this.preventDupplicateSync(Model, { name: rxdata.params['name'] }, rxdata.params['_id'])
  if (valid) {
    let modeldata = this.preUpdate(updating, rxdata.params)
    let [err] = await rxu.to(Model.findByIdAndUpdate(rxdata.params['_id'], modeldata, { new: false }))
    err ? this.cbFailed() : this.cbSuccess(rxdata.params['_id'])
  }
}

function getGenPermission () {
  let arrAction = []
  let pathdir = global.baseapp + '/controllers/v1/'
  let countid = 1

  fs.readdir(pathdir, (err, files) => {
    if (!err) {
      files.forEach(file => {
        let pathToFile = pathdir + file
        let contents = ''
        try {
          contents = fs.readFileSync(pathToFile, 'utf8')
        } catch (e) {
          console.log('Error:', e.stack)
        }
        let res = contents.match(/prototype(.+)\S\w/g)
        res.forEach(actionname => {
          if (actionname.indexOf('function') !== -1) {
            let objAction = {}
            objAction['controller'] = file.replace('Controller.js', '')
            objAction['action'] = actionname.split(' ')[0].replace('prototype.', '')
            if (objAction['action'].indexOf('POST') !== -1) {
              objAction['method'] = 'POST'
              objAction['action'] = objAction['action'].replace('POST', '')
            } else {
              objAction['method'] = 'GET'
            }
            objAction['name'] = objAction['method'] + '_' + objAction['controller'] + '_' + objAction['action']
            objAction['id'] = countid
            arrAction.push(objAction)
            countid = countid + 1
          }
        })
      })
    } else { console.log(err) }

    Model.find({}, { controller: 1, action: 1, method: 1, name: 1 }, (errDocs, arrDocs) => {
      let lengthId = arrDocs.length
      let arrPerDocs = JSON.parse(JSON.stringify(arrDocs))
      let perId = lengthId + 1
      // Delete If not exist
      for (let j in arrPerDocs) {
        let objTempPer = arrPerDocs[j]
        let checkPerDoc = arrAction.filter(o => o.name === objTempPer.name)
        if (objTempPer && checkPerDoc.length === 0) {
          Model.findOne({ name: objTempPer.name }).remove().exec()
        }
      }

      for (let i in arrAction) {
        let objTemp = arrAction[i]
        let checkInPerDocs = arrPerDocs.filter(o => o.name === objTemp.name)
        if (checkInPerDocs.length === 0) {
          try {
            let tempController = objTemp['controller']
            let tempAction = objTemp['action']
            let tempName = objTemp['name']
            let tempMethod = objTemp['method']
            let tempId = perId
            let tempDesc = objTemp['name']
            let tempCreatedat = Math.floor(Date.now() / 1000)
            let tempUpdatedat = Math.floor(Date.now() / 1000)
            Model.updateOne(
              { controller: tempController, action: tempAction, method: tempMethod },
              { $set: { controller: tempController, action: tempAction, method: tempMethod, name: tempName, id: tempId, desc: tempDesc, meta: '', is_deleted: 0, is_active: 1, created_at: tempCreatedat, updated_at: tempUpdatedat } },
              { new: true, upsert: true },
              (err, newObj) => { if (err || !newObj) { console.log('Cant create or update permission!') } }
            )
            perId = perId + 1
          } catch (e) {
            console.log('Error:', e.stack)
          }
        }
      }
    })
  })
  return 1
}

module.exports = controller
