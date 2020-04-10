var rp = require('request-promise')
var cheerio = require('cheerio')

var options = {
    uri: 'https://www.flysnow.org/archives/',
    transform: function(body){
        return cheerio.load(body)
    }
}

rp(options).then(function($){
    console.log($('.post-archive ul li').length)
    $('.post-archive ul li').each(function(index,element){
        href = $(element).find('a').attr('href')
        title = $(element).find('a').attr('title')
        console.log('title: '+title+ ' href: '+href)

        options.uri = href
        rp(options).then(function($){
            console.log( cheerio.html($('.post-content')))
        }).catch(function(err){
            console.log(err)
        })
    })
}).catch(function(err){
    console.log(err)
})

 function getContent(url){
    options.uri = url
    rp(options).then(function($){
        console.log( $('.post-content'))
    }).catch(function(err){
        console.log(err)
    })
}