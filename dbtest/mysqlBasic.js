var mysql = require('mysql')

var connection = mysql.createConnection({
    host:'dbcloud.coolara.com',
    user:'root',
    password:'admin321',
    database:'dbtest'
});

connection.connect();

// insert one
/*
connection.query('insert into user(name,password) values("jeffry","sdjgfjh")',function(err,result){
    if(err) throw error;
    console.log(result)
})
*/

//insert param
/*
addsql = 'insert into user(name,password) values(?,?)'
addParams = ['lucu','sjdhfjh']
connection.query(addsql,addParams,function(err,result){
    if(err) throw error;
    console.log(result)
})
*/

// update
/*
modsql = 'update user set password=? where name=?'
modParams = ['password','jeff']
connection.query(modsql, modParams, function(err,result){
    if(err) throw error;
    console.log(result)
})
*/

// delete
delsql = 'delete from user where id=4'
connection.query(delsql, function(err,result){
    if(err) throw err;
    console.log(result)
})
// query
connection.query('select * from user',function(error, result){
    if(error) throw error;
    console.log(result);
})
connection.end()