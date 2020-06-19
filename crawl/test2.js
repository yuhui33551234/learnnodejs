var agent = require('superagent');
var cheerio = require('cheerio');
var url = require('url')

var baseurl = 'https://cnodejs.org/'
var tarurl = 'https://cnodejs.org/?tab=all&page='
var arr = []

i = 1
flag = true

function run(){
    while(i<10){
        console.log('start parse '+ i +' page')
         getPageInfo2(tarurl+i, arr)
        //sleep(5)
        i++;
    }
}

async function getPageInfo2(pageurl, arr){
    var res = await agent.get(pageurl);
    
    
        $ = cheerio.load(res.text)
        console.log('find data parse')
        $('#topic_list .cell').each(function(index, element){
            let reply = $(element).find('.count_of_replies').text().trim()
            let visit = $(element).find('.count_of_visits').text().trim()
            let link = url.resolve(tarurl, $(element).find('.topic_title').attr('href'))
            let title = $(element).find('.topic_title').attr('title')
            //onsole.log(link+'==='+title)
            arr.push({"reply":reply,
                "visit":visit,
                "link":link,
                "title":title
            })
            //console.log('title '+title +'link '+link +'parse '+pageurl +' ok')
        })
        console.log('caiji shuju  '+arr.length)
}

function getPageInfo(pageurl, arr){
    agent.get(pageurl).end(function(err, res){
        if(err) throw err;
        
        $ = cheerio.load(res.text)
        //console.log(cheerio.html($('#topic_list')))
        console.log('find data parse')
        $('#topic_list .cell').each(function(index, element){
            let reply = $(element).find('.count_of_replies').text().trim()
            let visit = $(element).find('.count_of_visits').text().trim()
            let link = url.resolve(tarurl, $(element).find('.topic_title').attr('href'))
            let title = $(element).find('.topic_title').attr('title')
            //onsole.log(link+'==='+title)
            arr.push({"reply":reply,
                "visit":visit,
                "link":link,
                "title":title
            })
            //console.log('title '+title +'link '+link +'parse '+pageurl +' ok')
        })
       
        console.log('caiji shuju  '+arr.length)
        //run()
    }) 
}

// getPageInfo('https://cnodejs.org/?tab=all&page=62',arr,flag)
run()