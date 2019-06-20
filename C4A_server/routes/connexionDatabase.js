var mysql = require('mysql');
var config = require('./config');

var connection;
var devMod=0
if (devMod===1)
{
	connection = mysql.createConnection({
		host     : config.DEVHOST,
		user     : config.DEVUSER,
		password : config.DEVPWD,
		database : config.DB
	});
}
else{
	connection = mysql.createConnection({
		host     : config.HOST,
		user     : config.USER,
		password : config.PWD,
		database : config.DB
	});
}

connection.connect(function(err) {
    if (err){
      console.log(err);
      throw err;
    }
});

//keep connection alive
setInterval(function () {
	connection.query('SELECT 1',function (err, rows, fields) {
		
	});
}, 15000);
module.exports = connection;
