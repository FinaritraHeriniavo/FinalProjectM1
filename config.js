var mysql = require('mysql');

module.exports = {
	connection : mysql.createConnection ({
		host : 'localhost',
		database : 'Andao',//'DBMSproject',
		user : 'root', // mysql username
	 	password : '1234', //mysql password
	})
}
