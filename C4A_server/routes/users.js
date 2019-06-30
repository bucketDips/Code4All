var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');
var con = require('./connexionDatabase.js');
var jwt = require('jsonwebtoken');
var config = require("./config");
var AUTH = require('./AUTHENTIFICATION')

router.get('/getUser/:id', AUTH.VERIFYAUTH, function(request, res, next) {
	var id = request.params.id;
	function getLastRecord(id) {
		return new Promise(function(resolve, reject) {
			var sql = "select * from users where id='"+id+"';";
			con.query(sql, function (err, rows, fields) {
				if (err) return reject(err);
				resolve(rows);
			});
	  });
	}
	getLastRecord(id).then(function(rows){ res.send(rows); });
});

router.get('/findUser/:nameOrEmail', AUTH.VERIFYAUTH, function(request, res, next) {
	var nameOrEmail = request.params.nameOrEmail.toLowerCase();
	function getLastRecord(nameOrEmail) {
		return new Promise(function(resolve, reject) {
			var sql = "select * from users where LOWER(name) LIKE '%"+nameOrEmail+"%' or LOWER(email) LIKE '%"+nameOrEmail+"%';";
			con.query(sql, function (err, rows, fields) {
				if (err) return reject(err);
				resolve(rows);
			});
		});
	}
	getLastRecord(nameOrEmail).then(function(rows){ res.send(rows); });
});





//get id from name
router.get('/getUserId/:email', AUTH.VERIFYAUTH, function(request, res, next) {
	var email = request.params.email;
	function getLastRecord(email) {
		return new Promise(function(resolve, reject) {
			var sql = "select id from users where email='"+email+"';";
			con.query(sql, function (err, rows, fields) {
				if (err) return reject(err);
				resolve(rows);
			});
	  });
	}
	getLastRecord(email).then(function(rows){
		if (!rows["0"])
		{
			res.send("falseUser")
		}
		// res.send((rows["0"].id).toString);
		res.send("id:"+rows["0"].id);
	});

});
router.get('/resetPwd/:email', function(request, res, next) {
	var email = request.params.email;
	function getLastRecord(pseudo) {
		return new Promise(function(resolve, reject) {
			var sql = "select id, email from users where email='"+email+"';";
			con.query(sql, function (err, rows, fields) {
				if (err) return reject(err);
				resolve(rows);
			});
	  });
	}
	function changePwd(id, pwd)
	{
		pwd=md5(pwd)
		return new Promise(function(resolve, reject) {
			var sql = "update users set password='"+pwd+"' where id='"+id+"';";
			con.query(sql, function (err, rows, fields) {
				if (err) return reject(err);
				resolve(rows);
			});
	  });
	}
	getLastRecord(email).then(function(rows){
		if (!rows["0"])
		{
			res.send("falseUser")
			return;
		}

		function makeRandomPwd() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,*!?";

			for (var i = 0; i < 8; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
		}
		var newPwd=makeRandomPwd();
		// res.send((rows["0"].id).toString);
		var email=rows["0"].email;

		var send = require('gmail-send')({
		  user: config.SERVERMAIL, // creer adresse pour cod4all
		  pass: config.SERVERMAILPWD,
		  to:   email,
		  subject: 'Réinitialisation de votre mot de passe',
		  text:    'Votre nouveau mot de passe est ' + newPwd
		});
		changePwd(rows["0"].id, newPwd);
		send({}, function (err, res) {
		  console.log('* [example 1.1] send() callback returned: err:', err, '; res:', res);
		})
		res.send("id:"+rows["0"].id);
	});

});
/* GET all users */
router.get('/getAllUser', AUTH.VERIFYAUTH, function(request, res, next) {


	function getLastRecord() {
		return new Promise(function(resolve, reject) {
			var sql = "select * from users;";
			con.query(sql, function (err, rows, fields) {
				if (err) return reject(err);
				resolve(rows);
			});
		});
	}
	getLastRecord().then(function(rows){ res.send(rows); });
});








/* UPDATE user with id */
router.put('/update/:id/:pseudo/:email', AUTH.VERIFYAUTH,function(request, res, next) {
	var id = request.params.id;
	var pseudo = request.params.pseudo;
	var email = request.params.email;
	function getLastRecord(id, pseudo, email) {
		return new Promise(function(resolve, reject) {
			var sql = "update users set name='"+pseudo+"', email='"+email+"' where id = "+id+";";
			con.query(sql, function (err, rows, fields) {
				if (err) return reject(err);
				resolve(rows);
			  });
			});
	}
	getLastRecord(id, pseudo, email).then(function(rows){ res.send(rows); }).catch(function(err){
		return res.status(403).json(err);
	});
});


/* DELETE user with id */
router.delete('/delete/:id', AUTH.VERIFYAUTH,function(request, res, next) {
	var id = request.params.id;
	function getLastRecord(id){
		return new Promise(function(resolve, reject) {
			var sql = "delete from users where id = "+id+";";
			con.query(sql, function (err, rows, fields) {
				if (err) return reject(err);
				resolve(rows);
			});
		});
	}
	getLastRecord(id).then(function(rows){ res.send(rows); });
});
router.get('/validate/:token', function(request, res, next) {
	
	var validateAccount = function(id) {
		return new Promise(function(resolve, reject) {
			var sql = "update users set valid=1 where id="+id+";";
			con.query(sql, function (err, rows, fields) {
				if (err) return reject(err);
				resolve(rows);
			});
		});
	}
	
	var token = request.params.token;
	request.headers.authorization = "Bearer " + token;
	if (token && token != 'null') {

        // verifies secret and checks exp
        jwt.verify(token, config.JWTKEY, function(err, decoded) {      
          if (err) {
            return res.status(403).json({
                success: true,
                code : 'INCORRECT_TOKEN',
                message: 'Token incorrect !'
            })
          }
		  else {
            validateAccount(decoded.id).then(function(rows){
				res.send("user validated");
			});
            
          }
        });

    }
	else {
		return res.status(403).json({
                success: false,
                code : 'NO_TOKEN',
                message: 'Pas de token !'
            })
	}
	
});
//connection
router.get('/connect/:email/:pwd', function(request, res, next) {
	
	var email = request.params.email;
	var pwd = md5(request.params.pwd);
	// var pwd = request.params.pwd;

	function getLastRecord(email) {
		return new Promise(function(resolve, reject) {
			var sql = "select * from users where email='"+email+"';";
			con.query(sql, function (err, rows, fields) {
				if (err) return reject(err);
				resolve(rows);
			});
		});
	}
	getLastRecord(email).then(function(rows){

		var jsonResponse="";
		if (!rows["0"])
		{
			return res.status(403).json({
				success: false,
				code : 'MISSING_AUTHORISATION',
				message: 'Cet utilisateur n\'existe pas'
			})
		}
		
		if (rows["0"].password == pwd)
		{
			var userInfo = {
				"email":rows["0"].email,
				"name":rows["0"].name,
				"id":rows["0"].id
			}
			jwt.sign(userInfo, config.JWTKEY, {expiresIn: config.EXPIRATIONTIME}, function(err, token) {
				if(err) return next(err);
				
				if (rows["0"].valid!=1)
				{
					jsonResponse = {
						success:false,
						code:"InvalidAccount",
						message: "Compte non confimé, verifiez vos email",
						
					}
					// res.send(JSON.stringify(jsonResponse));
					return res.status(403).json(jsonResponse);

				}
				jsonResponse = {
					success: true,
					code : 'AUTHENTIFICATION_SUCCESS',
					message: 'Authentification réussie !',
					token: token
				}
				
				res.send(JSON.stringify(jsonResponse));
			});
			

		}

		else
		{
			return res.status(403).json({
				success: false,
				code : 'MISSING_AUTHORISATION',
				message: 'Mauvais mot de passe'
			})
			
		}
		
	});
});







router.get('/create/:pseudo/:pwd/:email', function(request, res, next) {
	var pseudo = request.params.pseudo;
	var pwd = md5(request.params.pwd);
	var email = request.params.email;
	function getLastRecord(pseudo,pwd, email){
		return new Promise(function(resolve, reject) {
			var sql = "insert into users(name, password, email) values('"+pseudo+"','"+pwd+"','"+email+"');";
			con.query(sql, function (err, rows, fields) {
				if (err)
				{
					return resolve(err);
				}
				resolve(rows);
			});
		});
	}
	getLastRecord(pseudo, pwd, email).then(function(rows){
		var error = rows["sqlMessage"];
		if (error)
		{
			console.log(error)
			return res.status(403).json({
				success: false,
				code : 'SQL_ERROR',
				message: error
			})
		}
		else
		{
			
			var userInfo = {
				"email":email,
				"name":pseudo,
				"id":rows.insertId
			}

			jwt.sign(userInfo, config.JWTKEY, {expiresIn: config.EXPIRATIONTIME}, function(err, token) {
				if(err) return next(err);
				
				jsonResponse = {
					success: true,
					code : 'InscriptionSuccess',
					message: 'Inscription réussie, confirmez votre inscription en consultant vos mails : ' +email,
				}
				var msgText = 'Bonjour,\nConfirmer Votre inscription en cliquant sur ce lien :\n'
								+ config.PROTOCOLSERVEUR
								+ "://"
								+ config.HOST
								+ ":"
								+ config.PORTSERVEUR
								+ "/users/validate/"
								+ token;

				var send = require('gmail-send')({
					user: config.SERVERMAIL,
					pass: config.SERVERMAILPWD,
					to:   email,
					subject: 'CodInSchool : Confirmez votre inscription',
					text: msgText 
				});
				send({}, function (err, res) {
					console.log('* [example 1.1] send() callback returned: err:', err, '; res:', res);
				})
			
				res.send(JSON.stringify(jsonResponse));
		
			
		
			
			});
		}
	}).catch(function(err){
		return res.status(403).json(err);
	});
});

router.post('/changPwd/:pwd/:newPwd', AUTH.VERIFYAUTH,function(request, res, next) {
	var email = request.decoded.email;
	var pwd = md5(request.params.pwd);
	var newPwd = md5(request.params.newPwd);
	function getLastRecord(pseudo) {
		return new Promise(function(resolve, reject) {
			var sql = "select * from users where email='"+email+"';";
			con.query(sql, function (err, rows, fields) {
				if (err) return reject(err);
				resolve(rows);
			});
		});
	}
	function changePassword(email, pwd) {
		return new Promise(function(resolve, reject) {
			var sql = "update users set password='"+pwd+"' where email='"+email+"';";
			con.query(sql, function (err, rows, fields) {
				if (err) return reject(err);
				resolve(rows);
			});
		});
	}
	getLastRecord(email).then(function(rows){
		console.log("rows = " + JSON.stringify(rows))
		if (rows["0"].password == pwd)
			changePassword(email, newPwd).then(function(rows){ res.send(true); });
		else
			res.send(false);
	});
});

router.post('/changEmail/:pwd/:newEmail', AUTH.VERIFYAUTH, function(request, res, next) {
	var email = request.decoded.email;
	var pwd = md5(request.params.pwd);
	var newEmail = request.params.newEmail;
	function getLastRecord(pseudo) {
		return new Promise(function(resolve, reject) {
			var sql = "select * from users where email='"+email+"';";
			con.query(sql, function (err, rows, fields) {
				if (err) return reject(err);
				resolve(rows);
			});
		});
	}
	function changeEmail(email, newEmail) {
		return new Promise(function(resolve, reject) {
			var sql = "update users set email='"+newEmail+"' where email='"+email+"';";
			con.query(sql, function (err, rows, fields) {
				if (err)return reject(err);
				resolve(rows);
			});
		});
	}
	getLastRecord(email).then(function(rows){


		if (rows.length > 0 && rows["0"].password == pwd)
			changeEmail(email, newEmail).then(function(rows){ res.send(true); }).catch(function(err){
				return res.status(403).json(err);
			});
		else
			res.send(false);
	});
});

module.exports = router;
