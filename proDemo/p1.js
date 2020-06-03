// var timeout = new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         console.log("执行完毕");
//         reject("timeout")
//     }, 2000);
// });
// timeout.then(
//     result=>{console.log("result"+result)},
//     error=>{console.log("error"+error)}
// )

function run(){
    return new Promise((resolve,reject)=>{
        console.log("执行");
        reject("好了");
    })
}
run().then(null,data=>{
    console.log(data)
})