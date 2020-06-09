var crawler = require("crawler");
var url = require('url')

var c = new crawler({
    rateLimit:5000,
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
            var href = $(element).find(".resblock-name a").attr('href')
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
                "href":href
            }
            //console.log(dic)
            saveLoupanInfo(dic,'loupan')
            console.log(name+" " +fstatus+" " +ftype+" " +addr +" " +room+" " +tag+" " +price+" " +avgr)

            // 楼盘动态 默认取100页动态
            let i = 1
            var num = 30
            while(i<= num){
                page_url = url.resolve(base_url, href+"dongtai/"+"pg"+i+"/")
                console.log("开始处理 "+name+" 第"+i+"页 【楼盘动态】,url:"+page_url)
                c.queue({
                    uri:page_url,
                    name:name,
                    href:href,
                    callback:parseLPdongtai
                });
                i++;
            }

            // 用户评论 默认取100页动态
            let j = 1
            var num = 50
            while(j<= num){
                page_url = url.resolve(base_url, href+"pinglun/"+"pg"+j+"/")
                console.log("开始处理 "+name+" 第"+j+"页 【用户评论】,url:"+page_url)
                c.queue({
                    uri:page_url,
                    name:name,
                    href:href,
                    callback:parseYHpinglun
                });
                j++;
            }

            // 顾问评论 默认取100页动态
            let k = 1
            var num = 10
            while(k<= num){
                page_url = url.resolve(base_url, href+"pinglun/guwen/"+"pg"+k+"/")
                console.log("开始处理 "+name+" 第"+j+"页 【顾问评论】,url:"+page_url)
                c.queue({
                    uri:page_url,
                    name:name,
                    href:href,
                    callback:parseGWpinglun
                });
                k++;
            }
            
        })
    }
    done()
}

function parseLPdongtai(error, res, done){
    if(error){
        console.log(error)
    }else{
        var $ = res.$;
        var title = $("title").text();
        
        
        $(".dongtai-one ").each(function(index,element){
            var dic={}
            var dt_zixun = $(element).find("a .a-tag").text()
            var dt_title = $(element).find("a .a-title").text()
            var dt_zixun = $(element).find("a .a-time").text()
            var dt_word = $(element).find(".a-word p").text()
            dic = {
                "name":res.options.name,
                "dt_zixun":dt_zixun,
                "dt_title":dt_title,
                "dt_zixun":dt_zixun,
                "dt_word":dt_word,
                "href":res.options.href,
            }
            //console.log(dic)
            saveLoupanInfo(dic,"dongtai")
            console.log(dt_zixun+" " +dt_title+" " +dt_zixun+" " +dt_word )
        })
    }
    done()
}

//用户评论
function parseYHpinglun(error, res, done){
    if(error){
        console.log(error)
    }else{
        var $ = res.$;
        var title = $("title").text();
        
        
        $(".comment-content-item ").each(function(index,element){
            var dic={}
            var pl_yonghu = $(element).find(".name-wrapper span").text()
            var pl_text = $(element).find(".text .text-top").text()
            var pl_time = $(element).find(".time-and-love .time").text()
            var pl_comment = $(element).find(".comment-num .num").text()
            var pl_love = $(element).find(".love-button .num").text()
            var pl_realsew = $(element).is(".name-wrapper .real-saw")
            dic = {
                "name":res.options.name,
                "pl_yonghu":pl_yonghu,
                "pl_text":pl_text,
                "pl_time":pl_time,
                "pl_comment":pl_comment,
                "pl_love":pl_love,
                "pl_realsew":pl_realsew,
                "href":res.options.href,
            }
            //console.log(dic)
            saveLoupanInfo(dic,"yhpinglun")
            //console.log(dt_zixun+" " +dt_title+" " +dt_zixun+" " +dt_word )
        })
    }
    done()
}

//顾问评论
function parseGWpinglun(error, res, done){
    if(error){
        console.log(error)
    }else{
        var $ = res.$;
        var title = $("title").text();
        
        
        $(".agent-name-wrapper.agent ").each(function(index,element){
            var dic={}
            var agent_name= $(element).find(".agent-name").text()
            var agent_status = $(element).find(".agent-status").text()
            var agent_dknum = $(element).find(".agent-name-wrapper >span").first().text()
            var agent_cjnum = $(element).find(".agent-name-wrapper >span").last().text()
            var agent_text = $(element).find(".text .text-top").text()
            var agent_time = $(element).find(".time").text()
            var agent_comment = $(element).find(".comment-num .num").text()
            var agent_love = $(element).find(".love-button .num").text()
            dic = {
                "name":res.options.name,
                "agent_name":agent_name,
                "agent_status":agent_status,
                "agent_dknum":agent_dknum,
                "agent_cjnum":agent_cjnum,
                "agent_text":agent_text,
                "agent_time":agent_time,
                "agent_comment":agent_comment,
                "agent_love":agent_love,
                "href":res.options.href,
            }
            //console.log(dic)
            saveLoupanInfo(dic,"gwpinglun")
            //console.log(dt_zixun+" " +dt_title+" " +dt_zixun+" " +dt_word )
        })
    }
    done()
}

//var mongodbClient = require('mongodb').MongoClient
//var mongdo_url = "mongodb://admin:admin741@dbcloud.coolara.com:27017/"
var MongoPool = require('./dbPool.js')

// function saveLoupanInfo(dic, tab){
//     mongodbClient.connect(mongdo_url, {useNewUrlParser:true,useUnifiedTopology:true},function(err, db){
//         if(err) throw err;
//         var dbo = db.db("beike");
//         dbo.collection(tab).insertOne(dic, function(err, res){
//             if(err) throw err;
//             console.log('insert success')
//             db.close()
//         })
//     })
// }
function saveLoupanInfo(dic, tab){
    MongoPool.getInstance(function (client){
        var db = client.db("beike")
        db.collection(tab).insertOne(dic, function(err, res){
            if(err) throw err;
            console.log('insert success')
            //db.close()
        })
      });
}

run()