{
    let ajax = function(callback){
        console.log('exec')
        setTimeout(function(){
            callback && callback()
        })
    }

    ajax(function(){
        console.log('exec ajax')
    })
}