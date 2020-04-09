'use strict';

var http = require('http');

// var server = http.createServer(function(request, response){
//     console.log(request.method+':'+request.url)
//     response.writeHead(200, {'Content-type':'text/html'});
//     response.end('<h1>hello,world!</h1>')
// });
// server.listen(8000);
// console.log('Server is running at http://127.0.0.1:8000'); 

var url = require('url'),fs=require('fs')
var path = require('path')

console.log(url.parse('www.baidu.com'))

var workDir = path.resolve('.')

console.log(workDir)

var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

var server = http.createServer(function(request, response){
    var pathname = url.parse(request.url).pathname
    var filepath = path.join(root, pathname)
    fs.stat(filepath, function(err, stats){
        if(!err && stats.isFile()){
            console.log('200 '+request.url)
            response.writeHead(200)
            fs.createReadStream(filepath).pipe(response)
        }else{
            console.log('404 '+ request.url)
            response.writeHead(404)
            response.end('404 Not Found')
        }
    })
})
server.listen(8000)
console.log('Server is running at http://127.0.0.1:8000'); 