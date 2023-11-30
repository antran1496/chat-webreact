let path = require('path')
let fs = require('fs')

let serverStaticFiles = function (request, response) {
  // response.setHeader('Cache-Control', 'public, max-age=2592000')
  // response.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString())

  let filePath = '.' + request.url
  if (filePath === './') filePath = './index.html'

  let isStatic = (filePath.indexOf('upload/image') !== -1)
  let extname = path.extname(filePath)
  let contentType = 'text/html'
  switch (extname) {
    case '.txt':
      isStatic = true
      contentType = 'text/html'
      break
    case '.html':
      isStatic = true
      contentType = 'text/html'
      break
    case '.ico':
      isStatic = true
      contentType = 'image/x-icon'
      break
    /* case '.js':
      isStatic = true
      contentType = 'text/javascript'
      break */
    case '.css':
      isStatic = true
      contentType = 'text/css'
      break
    case '.json':
      isStatic = true
      contentType = 'application/json'
      break
    case '.png':
      isStatic = true
      contentType = 'image/png'
      break
    case '.jpg':
      isStatic = true
      contentType = 'image/jpg'
      break
    case '.wav':
      isStatic = true
      contentType = 'audio/wav'
      break
  }

  if (isStatic) {
    fs.readFile(filePath, function (error, content) {
      if (error) {
        if (error.code === 'ENOENT') {
          if (contentType.indexOf('image') !== -1) {
            fs.readFile('./upload/image/default' + extname, function (error, content) {
              if (!error) {
                response.writeHead(200, { 'Content-Type': contentType }); response.end(content, 'utf-8')
              } else { console.log(error) }
            })
          } else {
            fs.readFile('./upload/image/404.html', function (error, content) {
              if (!error) {
                response.writeHead(200, { 'Content-Type': contentType }); response.end(content, 'utf-8')
              } else { console.log(error) }
            })
          }
        } else {
          response.writeHead(500)
          response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n')
          response.end()
        }
      } else {
        response.writeHead(200, { 'Content-Type': contentType })
        response.end(content, 'utf-8')
      }
    })

    return true
  }

  return false
}

module.exports = {
  serverStaticFiles: serverStaticFiles
}
