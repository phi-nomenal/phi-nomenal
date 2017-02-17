let express = require('express')
let proxy = require('http-proxy')
let path = require('path')

let app = express()
let ethProxy = proxy.createProxyServer({target: 'http://localhost:8545'})

app.use(express.static(path.join(__dirname, '..', 'phi-nomenal-webapp', 'dist')))

app.all('/eth', function(request, response) {
  ethProxy.web(request, response)
})

app.listen(process.env.PORT || 8080)
