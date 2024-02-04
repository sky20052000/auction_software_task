
let mysql = require('mysql');

let connection = mysql.createPool({
    host:'localhost', 
    user: 'root',
    port:'3306',
    password: '', 
    database:'auction',
});

 
connection.getConnection(function(err, connection) {
    if (err) {
        console.log('==>'+err);
    }else{
        console.log('Datbase connected succesfully.');
    }       
});

module.exports = connection;
