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
var data = fs.readFileSync('pu1.js','utf-8');
console.log(data)
