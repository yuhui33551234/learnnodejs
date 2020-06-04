var mongodbClient = require('mongodb').MongoClient
var url = "mongodb://admin:admin741@dbcloud.coolara.com:27017/"

////插入一个
mongodbClient.connect(url, {useNewUrlParser:true,useUnifiedTopology:true},function(err, db){
    if(err) throw err;
    var dbo = db.db("crawl");
    var myobj = {name:"yuhui2", type:"good2",like:['chi','he','玩']}
    dbo.collection("users").insertOne(myobj, function(err, res){
        if(err) throw err;
        console.log('insert success')
        db.close()
    })
})
//插入多个
// mongodbClient.connect(url, {useNewUrlParser:true,useUnifiedTopology:true},function(err, db){
//     if(err) throw err;
//     var dbo = db.db("crawl");
//     var myobj = [
//         {name:"yuhui2", type:"good2",like:['chi','he','玩']},
//         {name:"yuhui3", type:"good3",like:['chi','he','玩']},
//         {name:"yuhui4", type:"good4",like:['chi','he','玩']}
//     ]
//     dbo.collection("users").insertMany(myobj, function(err, res){
//         if(err) throw err;
//         console.log('insert success,count:' + res.insertedCount)
//         db.close()
//     })
// })
//查找
// mongodbClient.connect(url, {useNewUrlParser:true,useUnifiedTopology:true},function(err, db){
//     if(err) throw err;
//     var dbo = db.db("crawl");
//     var whereStr = {"name":{
//         $in:['yuhui2','yuhui3']
//     }}
//     dbo.collection("users").find(whereStr).toArray(function(err, result){
//         if(err) throw err;
//         console.log(result)
//         db.close()
//     })
// })
// mongodbClient.connect(url, {useNewUrlParser:true,useUnifiedTopology:true},function(err, db){
//     if(err) throw err;
//     var dbo = db.db("crawl");
//     var whereStr = {"name":{
//         $in:['yuhui2','yuhui3']
//     }}
//     var updateStr = {$set: {"type": "chou"}}
//     dbo.collection("users").updateMany(whereStr, updateStr, function(err, result){
//         if(err) throw err;
//         console.log(result)
//         db.close()
//     })
// })

// mongodbClient.connect(url, {useNewUrlParser:true,useUnifiedTopology:true},function(err, db){
//     if(err) throw err;
//     var dbo = db.db("crawl");
//     var mysort = {"name":-1}
//     var updateStr = {$set: {"type": "chou"}}
//     dbo.collection("users").find().sort(mysort).skip(2).toArray(function(err, result){
//         if(err) throw err;
//         console.log(result)
//         db.close()
//     })
// })

// mongodbClient.connect(url, {useNewUrlParser:true,useUnifiedTopology:true},function(err, db){
//     if(err) throw err;
//     var dbo = db.db("crawl");
//     // var mysort = {"name":-1}
//     // var updateStr = {$set: {"type": "chou"}}
//     var whereStr = {"name":"yuhui2"}
//     dbo.collection("users").deleteOne(whereStr,function(err, result){
//         if(err) throw err;
//         console.log(result)
//         db.close()
//     })
// })