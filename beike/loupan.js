var rp = require("request-promise")
var cheerio = require("cheerio")

base_url='https://km.fang.ke.com/loupan/'
var base_option = {
    uri:base_url,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
    },
    transform:function(body){
        return cheerio.load(body)
    }
}

// 获得楼盘信息
rp(base_option).then(function($){
    //var totalpage = $(".page-box a").eq(2).text()
    $(".page-container").each(function(i,e){
        //rooms[i] = $(this).text();
        console.log($(this).text())
    })
    //console.log(totalpage)
})
var loupan_arr =[]
var i = 1
function run(){
    const num = 100
    while(i<= num){
        page_url = base_url+"pg"+i+"/"
        console.log("开始处理第"+i+"页,url:"+page_url)
        base_option.url = page_url
        dics = loupan_info(base_option)

        i++;
    }
}

function loupan_info(option){
    // 获得楼盘信息
    rp(option).then(function($){
        $(".resblock-list-wrapper .resblock-desc-wrapper").each(function(index,element){
            var dic={}
            var name = $(element).find(".resblock-name a").text()
            var fstatus = $(element).find(".resblock-name .resblock-type").text()
            var ftype = $(element).find(".resblock-name > span").last().text()
            var addr = $(element).find(".resblock-location").text().trim()
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
                "addr":addr,
                "room":room,
                "tag":tag,
                "price":price,
                "avgr":avgr,
            }
            console.log(dic)
            loupan_arr.push(dic)
            insertOne('loupan', dic)
            //console.log(name+" " +fstatus+" " +ftype+" " +addr +" " +room+" " +tag+" " +price+" " +avgr)
            console.log("第"+i+"页")
            return loupan_arr
        })
    })
}


function insertOne(collection, obj){
     new Promise((resolve, rehect)=>{
        var MongoClient = require('mongodb').MongoClient
        var url = "mongodb://admin:admin741@dbcloud.coolara.com/27017"
        MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
            if(err) throw err;
            var dbo = db.db("beike")
            dbo.collection(collection).insertOne(obj, function(err, res){
                if(err) reject(err)
                console.log("insert success");
                db.close()
                resolve()
            })
        })
    })
}
run()