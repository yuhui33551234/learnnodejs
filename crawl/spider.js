let axios = require('axios')

function insertMany(collection, arr){
    return new Promise((resolve, rehect)=>{
        var MongoClient = require('mongodb').MongoClient
        var url = "mongodb://dbcloud.coolara.com/27017"
        MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
            if(err) throw err;
            var dbo = db.db("lol")
            dbo.collection(collection).insertMany(arr, function(err, res){
                if(err) reject(err)
                console.log("insert count:"+ res.insertedCount);
                db.close()
                resolve()
            })
        })
    })
}

function insertOne(collection, obj){
    return new Promise((resolve, rehect)=>{
        var MongoClient = require('mongodb').MongoClient
        var url = "mongodb://dbcloud.coolara.com/27017"
        MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
            if(err) throw err;
            var dbo = db.db("lol")
            dbo.collection(collection).insertOne(obj, function(err, res){
                if(err) reject(err)
                console.log("insert success");
                db.close()
                resolve()
            })
        })
    })
}

//获取英雄列表
async function getHeroList(){
    let httpUrl = "https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js"
    let result = await axios.get(httpUrl)
    console.log(result.data.hero)
    await insertMany("Heros", result.data.hero)
    return result.data.hero
}
//getHeroList()

async function getHero(heroid){
    let httpUrl = `https://game.gtimg.cn/images/lol/act/img/js/hero/${heroid}.js`
    console.log(httpUrl)
    let result = await axios.get(httpUrl)
    await insertOne('heroinfo', result.data.hero)
    return result.data;
}

// 定义主函数
async function run(){
    let heroList = await getHeroList()
    await heroList.reduce(async(prev,item,i)=>{
        await prev
        return new Promise(async(resolve,reject)=>{
            await getHero(item.heroId)
            resolve()
        })
    }, Promise.resolve())
}

run()