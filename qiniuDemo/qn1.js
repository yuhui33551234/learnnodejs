var accessKey ="-hXVC8a5b0BOMISKPl8pEEc08nejKv236v7GE0it";
var secreKey = "2fgWFxqkg14tsuOPcBYyGP8MOxWHpTKHlzU2-_9B";
var bucket = "kongjian"
var mac = new qiniu.auth.digest.Mac(accessKey, secreKey)
var putPolicy = new qiniu.rs.putPolicy({scope:bucket})
var uploadToken = putPolicy.uploadToken(mac)

let qn = {}

//上传
qn.uptoken = (bucket)=>{
    putPolicy = new qiniu.rs.putPolicy({scope:bucket})
    let tk = {
        'token': uploadToken,
        'url': 'h'
    }
}