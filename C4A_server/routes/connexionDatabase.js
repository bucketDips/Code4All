var mysql = require('mysql');

var connection;
var devMod=1
if (devMod===1)
{
	connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'codeforall',
	});
}
else{
	connection = mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    database : '',
	});
}

connection.connect(function(err) {
    if (err){
      console.log(err);
      throw err;
    }
});

module.exports = connection;
