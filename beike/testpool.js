var MongoClient = require('mongodb').MongoClient
var app = require('express')()
var MongoPool = require('./dbPool.js')

app.listen(3000, function() {
  MongoPool.initPool()
  console.log('serve start successfully on the port: 3000')
})

app.get("/", function(req, res) {
  MongoPool.getInstance(function (client){
    var db = client.db('shop')
    db.collection("tt").insertOne({"did":54545}, function(err, res){
      if(err) throw err;
      console.log('insert success')
      //db.close()
  })
  });
});