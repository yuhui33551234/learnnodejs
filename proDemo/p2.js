var agent = require("superagent");
var cheerio = require("cheerio")


 async function run(){
     i=0
     while(i<10){
        p1 = await agent.get("www.baidu.com");
        
        $ = cheerio.load(p1.text)
        console.log($("title").text())
        i++;
        console.log(i)
    }
    
 }
 
 agent.get("www.baidu.com").end(function(error,res){
     console.log("hudiao");
 });

 run()