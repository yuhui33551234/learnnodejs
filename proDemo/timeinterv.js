function timeout (delay=1000){
    return new Promise(resolve=>setTimeout(resolve,delay))
}
timeout(2000).then(()=>{
    console.log("then")
})