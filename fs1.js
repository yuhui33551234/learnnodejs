'use strict'

var fs = require('fs')

//异步读取
// fs.readFile('pu1.js','utf-8',function(err,data){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data)
//     }
// })

// fs.readFile('sample.png',function(err,data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//         console.log(data.length+' bytes')
//     }
// })


//同步读取
// var data = fs.readFileSync('pu1.js','utf-8');
// console.log(data)

//异步写文件
//var data = 'Hello, Node JS';
// fs.writeFile('output.txt', data, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log('ok');
//     }
// })
//同步写文件
// fs.writeFileSync('output.txt',data)

// fs.stat('output.txt',function(err,stat){
//     if(err){
//         console.log(err)
//     }else{
//         console.log('isFile'+stat.isFile())
//         console.log(stat.isDirectory())
//         if(stat.isFile()){
//             console.log('size:'+stat.size);
//             console.log('birth time'+stat.birthtime)
//             console.log('modified time'+stat.mtime)
//         }
//     }
// })
var f1 = fs.statSync('output.txt')
console.log(f1)