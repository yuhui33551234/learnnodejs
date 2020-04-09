const crypto = require('crypto')
const hash = crypto.createHash('sha1')

hash.update('Hello world')
console.log(hash.digest('hex'))

const hmac = crypto.createHmac('sha256','yuhui')
hmac.update('hi,the world')
console.log(hmac.digest('hex'))


function aesEncrypt(data, key){
    const cipher = crypto.createCipher('aes-256-cfb', key)
    var crypted = cipher.update(data,'utf8','hex')
    crypted += cipher.final('hex')
    return crypted
}

function aesDecrypt(encrypted, key){
    const decipher = crypto.createDecipher('aes-256-cfb',key)
    var decrypted = decipher.update(encrypted,'hex','utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}

var data = 'HEllo, this is a test word!'
var key ='password'
var encrypted = aesEncrypt(data,key)
var decrypted = aesDecrypt(encrypted,key)
console.log('plain text:'+data)
console.log('encrypted text:'+encrypted)
console.log('decrypted text:'+decrypted)