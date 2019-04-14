var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');
var con = require('./connexionDatabase.js');
var formidable = require('formidable');

/* GET users listing. */
router.get('/getFile/:fileId', function(request, res, next) {
    var fileId = request.params.fileId;
    fs.get

});
router.post('/upload', function(request, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
        getLastRecord(files).then(function(rows){
            var oldpath = files[Object.keys(files)[0]].path;
            var newpath = __dirname +"\\FichiersUtilisateur\\" + rows.insertId;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;

                res.end();
            });
        });


    });
    function getLastRecord(files) {
        return new Promise(function(resolve, reject) {
            var sql = "insert into fichier(NOM) values ('"+files[Object.keys(files)[0]].name+"')"
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

});





module.exports = router;
