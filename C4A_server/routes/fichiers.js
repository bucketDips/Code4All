var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');
var con = require('./connexionDatabase.js');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var config = require("./config");
var AUTH = require('./AUTHENTIFICATION')
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'application/font-sfnt'
};


/* GET users listing. */
router.get('/getUserFile/:fileId', AUTH.VERIFYAUTH, function(request, res, next) {
    var fileId = request.params.fileId;
    function getFileNameFromBatabase(fileId) {
        return new Promise(function(resolve, reject) {
            var sql = "select * from fichier where id ='"+fileId+"';";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    getFileNameFromBatabase(fileId).then(rows => {
        if (!rows["0"])
        {
            res.send("false");
        }
        var pathFile = __dirname +"\\FichiersUtilisateur\\" + rows["0"].id;
        var pathname = __dirname +"\\FichiersUtilisateur\\" + rows["0"].name;
        res.download(pathFile,  rows["0"].name);

    })

});
router.post('/upload/:dest', AUTH.VERIFYAUTH, function(request, res, next) {
    var dest = request.params.dest;
    var sender = request.decoded.id
    // var sender = 6
    var form = new formidable.IncomingForm();
    console.log("form")
    console.log(form)
    form.parse(request, function (err, fields, files) {
        console.log("err")
        console.log(err)
        console.log("fields")
        console.log(fields)
        console.log("files")
        console.log(files)
        insertFile(files).then(function(rows){
            var oldpath = files[Object.keys(files)[0]].path;
            var newpath = __dirname +"\\FichiersUtilisateur\\" + rows.insertId;
            addFileToUserFileTable(rows.insertId, dest);
            fs.copyFile(oldpath, newpath, (err) => {
                if (err) throw err;
                console.log(oldpath + ' was copied to '+newpath);
                res.end();
            });
        });
    });

    function addFileToUserFileTable(fileId, dest) {
        return new Promise(function(resolve, reject) {
            var sql = "insert into user_files(fileId, userId) values ('"+fileId+"',"+dest+")"
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    function insertFile(files) {
        return new Promise(function(resolve, reject) {
            var sql = "insert into fichier(name,sender) values ('"+files[Object.keys(files)[0]].name+"',"+sender+")"
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

});





module.exports = router;
