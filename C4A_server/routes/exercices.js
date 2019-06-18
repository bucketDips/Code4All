var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');
var con = require('./connexionDatabase.js');
var jwt = require('jsonwebtoken');
var config = require("./config");
var AUTH = require('./AUTHENTIFICATION')

var tmpFuncJson = {
    nom: "michel",
    code: "function() {console.log('chocapic');}",
    description: "merde"
}
var createFunction = function (txt) {
    return new Function("return " + txt)();
}
/* GET users listing. */
router.get('/test', function(request, res, next) {
    var id = request.params.id;
    var temp = {}
    function getLastRecord(id) {
        return new Promise(function(resolve, reject) {
            var sql = "select * from users where id='"+id+"';";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    temp[tmpFuncJson.nom] = createFunction(tmpFuncJson.code);
    temp[tmpFuncJson.nom]();

    res.send("toto");
});



module.exports = router;
