const http = require('http')
const fs = require('fs')
const soar = require('./soar.js')
// const qs = require('querystring')

const app = http.createServer()

app.listen(7777, function() {
    console.log('服务已经启动: localhost:7777');
})

app.on('request', function(request, response) {
    console.log('请求：', request.url)
    if (request.url === '/') {
        response.writeHead(200, {'Conten-Type': 'text/html'})
        fs.readFile('./index.html', 'utf-8', function(err, data) {
            if (err) {
                throw err
            }
            response.end(data)
        })
    }

    if (request.url === '/soar') {
        let str = ''
        request.on('data', function (chunk) {
          str += chunk
        })
        request.on('end', function () {
            const params = JSON.parse(str);
            soar(params.sql).then(res => {
                response.setHeader('content-type', 'text/html;charset=utf-8')
                res = res.replace('open /dev/stderr: no such device or address', '')
                response.end(res)
            }).catch(err => {
                response.setHeader('content-type', 'text/plain;charset=utf-8')
                console.log(err);
                response.end(err)
            })
        })
    }
})