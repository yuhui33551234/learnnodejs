var crawler = require("crawler");

var c = new crawler({
    maxConnections:1,
    rateLimit:1000,
    callback:function(error, res,done){
        if(error){
            console.log(error);
        }{
            var $ = res.$
            console.log($("title").text())
        }
        done();
    }
})

c.queue("http://www.baidu.com");

c.queue(["http://www.bing.com","http://www.myweplus.com","http://www.myweplus.com","http://www.myweplus.com","http://www.myweplus.com","http://www.myweplus.com","http://www.myweplus.com","http://www.myweplus.com","http://www.myweplus.com"])