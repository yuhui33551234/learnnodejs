var qn = require('qn');
var fs = require('fs')

var client = qn.create({
    accessKey:'-hXVC8a5b0BOMISKPl8pEEc08nejKv236v7GE0it',
    secretKey:'2fgWFxqkg14tsuOPcBYyGP8MOxWHpTKHlzU2-_9B',
    bucket:'kongjian',
    //origin:'http://{bucket}.u.qiniudn.com',
    uploadURL: 'http://up-z2.qiniup.com/'
})

/*
client.upload('haha2',{key:'haha2.txt'},function(err,result){
    console.log(result)
})
*/
client.upload(fs.createReadStream("../sample.png"), { key:'sample.png' },function(err, result){
    console.log(result)
})