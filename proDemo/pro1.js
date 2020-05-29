let fs = require("fs")
fs.readFile('./output.txt', function(err, data){
    console.log("开始读取文件")
    fs.readFile(data,'utf8',function(err,data){
        console.log(data)
    })
    console.log("读取完成")
})
console.log("main over")