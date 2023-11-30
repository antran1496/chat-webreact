var admin = require('firebase-admin')
var apn = require('apn')

// -------------------------Firebase--------------------------------------------
let getOrInitFirebaseApp = function (name, path, databaseURL) {
  let serviceAccount = require(path)
  let fapp

  // Find firebase app
  for (let app of admin.apps) { if (app.name === name) { fapp = app; break } }

  // Create app if it not present
  if (!fapp) {
    fapp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: databaseURL },
    name
    )
  }

  return fapp
}

/**
    config: appName, path, databaseURL
    fcms: array of firebase token
    message: title, body
**/

module.exports.pushWithFirebase = async function (config, fcms, message) {
  // Get firebase app
  let fapp = getOrInitFirebaseApp(config.appName, config.path, config.databaseURL)

  if (!fapp) { console.log('Cant init firebase app'); return }

  // Payload which will be sent to client
  let payload = {
    notification: {
      title: message.title,
      body: message.body
    },
    data: message.payload || {}
  }

  if (fcms.length !== 0) { await fapp.messaging().sendToDevice(fcms, payload) }
}

// -------------------------APNS--------------------------------------------

/**
    config: keyPath, keyId, teamId, appBundleId
    apns: array of apns token
    message: title, body
**/
module.exports.pushWithAPNS = async function (config, apns, message) {
  // Create apn provider
  let provider = new apn.Provider({
    token: {
      key: config.keyPath,
      keyId: config.keyId,
      teamId: config.teamId
    },
    production: config.production
  })

  // Create notification
  let noti = new apn.Notification()
  noti.badge = 0
  noti.sound = 'default'
  noti.alert = message.body
  noti.payload = message.payload || {}
  noti.topic = config.appBundleId

  // Send notification to devices
  if (apns.length !== 0) { let result = await provider.send(noti, apns) /* console.log(JSON.stringify(result)); */ } // eslint-disable-line no-unused-vars

  // Release memory
  provider.shutdown()
}
