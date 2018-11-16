var ejs= require('ejs');
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'root',
	    database : 'demo_home',
	    port	 : 3306
	});
	return connection;
}
function fetchData(callback,sqlQuery){

	console.log("\nSQL Query::"+sqlQuery);

	var connection=getConnection();

	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}

// var pool =  mysql.createPool({
// 	host : 'localhost',
// 	user : 'root',
// 	password: 'root',
// 	database: 'demo_home',
// 	port	 : 3306,
// 	connectionLimit: 500
// });
// function fetchData(callback,sqlQuery){

// pool.getConnection(function(err,connection){
// 	connection.query(sqlQuery, function(err, rows, fields) {
// 		if(err){
// 			console.log("ERROR: " + err.message);
// 		}
// 		else{
// 			callback(err, rows);
// 		}
// 		});
// 	connection.release();
// });
// }
exports.fetchData=fetchData;

