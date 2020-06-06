var crawler = require("crawler");

var c = new crawler({
    rateLimit:3000,
    maxConnections:1,
    callback:function(error,res,done){
        if(error){
            console.log(error)
        }else{
            var $ = res.$;
            var title = $("title").text();
            //var url = res.uri;
            console.log("current crawl: "+title+" url:"+res.url)
        }
        done()
    }
})

base_url='https://km.fang.ke.com/loupan/'

var i = 1
function run(){
    const num = 100
    while(i<= num){
        page_url = base_url+"pg"+i+"/"
        console.log("开始处理第"+i+"页,url:"+page_url)
        c.queue({
            uri:page_url,
            callback:parseLoupan
        });
        i++;
    }
}

function parseLoupan(error, res, done){
    if(error){
        console.log(error)
    }else{
        var $ = res.$;
        var title = $("title").text();
        
        
        $(".resblock-list-wrapper .resblock-desc-wrapper").each(function(index,element){
            var dic={}
            var name = $(element).find(".resblock-name a").text()
            var fstatus = $(element).find(".resblock-name .resblock-type").text()
            var ftype = $(element).find(".resblock-name > span").last().text()
            var addr = $(element).find(".resblock-location").text().trim()
            if(addr){
                addr1 = addr.split("/")[0];
                addr2 = addr.split("/")[1];
                addr3 = addr.split("/")[2];
            }
            const rooms = [];
            var room = $(element).find(".resblock-room > span").each(function(i,e){
                rooms[i] = $(this).text();
            })
            room = rooms.join('/');

            const tags = [];
            var tag = $(element).find(".resblock-tag > span").each(function(i,e){
                tags[i] = $(this).text();
            })
            tag = tags.join('/');

            var price = $(element).find(".resblock-price .number").text().trim()
            var avgr = $(element).find(".resblock-price .second").text().trim()

            dic = {
                "name":name,
                "fstatus":fstatus,
                "ftype":ftype,
                "addr1":addr1,
                "addr2":addr2,
                "addr3":addr3,
                "room":room,
                "tag":tag,
                "price":price,
                "avgr":avgr,
            }
            //console.log(dic)
            saveLoupanInfo(dic)
            console.log(name+" " +fstatus+" " +ftype+" " +addr +" " +room+" " +tag+" " +price+" " +avgr)
        })
    }
    done()
}

var mongodbClient = require('mongodb').MongoClient
var url = "mongodb://admin:admin741@dbcloud.coolara.com:27017/"

function saveLoupanInfo(dic){
    mongodbClient.connect(url, {useNewUrlParser:true,useUnifiedTopology:true},function(err, db){
        if(err) throw err;
        var dbo = db.db("beike");
        dbo.collection("loupan").insertOne(dic, function(err, res){
            if(err) throw err;
            console.log('insert success')
            db.close()
        })
    })
}
run()