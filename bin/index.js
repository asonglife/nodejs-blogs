const http = require('http')

const PORT = 3000

const handlerFunc = require('../app')

const serverHandler = http.createServer(handlerFunc)
serverHandler.listen(PORT)
