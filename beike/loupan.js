var rp = require("request-promise")
var cheerio = require("cheerio")

var base_option = {
    uri:'https://km.fang.ke.com/loupan/pg2/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
    },
    transform:function(body){
        return cheerio.load(body)
    }
}

// 获得楼盘列表
rp(base_option).then(function($){
    $(".resblock-list-wrapper .resblock-desc-wrapper").each(function(index,element){
        var name = $(element).find(".resblock-name a").text()
        var fstatus = $(element).find(".resblock-name .resblock-type").text()
        var ftype = $(element).find(".resblock-name > span").last().text()
        var addr = $(element).find(".resblock-location").text().trim()
        const rooms = [];
        var room = $(element).find(".resblock-room > span").each(function(i,e){
            rooms[i] = $(this).text();
        })
        room = rooms.join('/');

        
        console.log(name+" " +fstatus+" " +ftype+" " +addr +" " +room)
    })
})