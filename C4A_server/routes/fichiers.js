var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');
var con = require('./connexionDatabase.js');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var config = require("./config");
var AUTH = require('./AUTHENTIFICATION');
var CLASSES = require('./classes');
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

function insertFile(filename, sender) {

    return new Promise(function(resolve, reject) {
        var sql = "insert into fichier(name,sender) values ('"+filename+"',"+sender+")"
        con.query(sql, function (err, rows, fields) {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

/* GET users listing. */
router.get('/getUserFileList', AUTH.VERIFYAUTH, function(request, res, next) {
    var userId = request.decoded.id;
    function getUserFileList(userId) {
        return new Promise(function(resolve, reject) {
            var sql = "select name, fileid from fichier, user_files where fileId=id and userId="+userId+";";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    getUserFileList(userId).then(function(rows){
        res.send(rows);
    }).catch(function(err){
        return res.status(403).json(err);
    });

})
function getFileNameFromBatabase(fileId,userId) {
    return new Promise(function(resolve, reject) {
        var sql = "select * from fichier, user_files where user_files.fileId=fichier.id and (fichier.sender= ? or user_files.userId=?) and fichier.id = ?";
        con.query(sql,[userId, userId, fileId], function (err, rows, fields) {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}
router.post('/deleteFile/:fileId', AUTH.VERIFYAUTH, function(request, res, next) {
    var userId = request.decoded.id;


    var fileId = request.params.fileId;
    function deleteFile(userId,fileId) {
        return new Promise(function(resolve, reject) {
            var sql = "delete from fichier where sender = ? and id = ?;";
            con.query(sql,[userId, fileId], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    function deleteUserFile(fileId) {
        return new Promise(function(resolve, reject) {
            var sql = "delete from user_files where fileId = ?;";
            con.query(sql,[fileId], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    function deleteClassFile(fileId) {
        return new Promise(function(resolve, reject) {
            var sql = "delete from classRoom_files where fileId = ?;";
            con.query(sql,[fileId], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    function deleteExerciceFile(fileId) {
        return new Promise(function(resolve, reject) {
            var sql = "delete from exercices_Files where file_id = ?;";
            con.query(sql,[fileId], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    getFileNameFromBatabase(fileId, userId).then(function (rows) {
        if (rows.length == 0){
            return res.status(403).json({
                success: false,
                code : 'INCORRECT_FILE',
                message: "Ce fichier n'existe pas, ou il ne vous appartient pas"
            })
        }
        deleteFile(userId, fileId).then(function (rows) {
            res.send(rows);
        }).catch(function(err){
            return res.status(403).json(err);
        });;
        deleteUserFile(fileId);
        deleteExerciceFile(fileId);
        deleteClassFile(fileId);

    }).catch(function(err){
        return res.status(403).json(err);
    });


})
router.get('/getUserFile/:fileId', AUTH.VERIFYAUTH, function(request, res, next) {
    var fileId = request.params.fileId;
    var userId = request.decoded.id
    // var userId = 6


    getFileNameFromBatabase(fileId,userId).then(rows => {
        if (!rows["0"])
        {
            return res.status(403).json({
                success: false,
                code : 'INCORRECT_FILE',
                message: "Ce fichier n'existe pas, ou il ne vous appartient pas"
            })
        }
        var pathFile = __dirname +"/FichiersUtilisateur/" + rows["0"].id;
        var pathname = __dirname +"/FichiersUtilisateur/" + rows["0"].name;
        res.download(pathFile,  rows["0"].name);


    }).catch(function(err){
        return res.status(403).json(err);
    });

});
router.get('/getAllUserImages', AUTH.VERIFYAUTH, function(request, res, next) {
    var userId = request.decoded.id;
    // var userId = 6;
    var extension = [".png",".jpeg",".jpg",".gif"]
    function getUserFileList(userId) {
        return new Promise(function(resolve, reject) {
            var sql = "select name, fileid from fichier, user_files where fileId=id and sender='"+userId+"' or userId="+userId+";";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    getUserFileList(userId).then(function(rows){
        var result = rows.filter(function(word){
            for (var i = 0; i < extension.length; ++i){
                if (word.name.indexOf(extension[i]) > 0){
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    for (var i = 0; i < 30; i++)
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    text +=  "_" + word.name;

                    word.publicName = text;
                    word.url = config.HOST + ":" + config.PORTSERVEUR + "/" + text;

                    return true;
                }

            }
        });

        for (var i = 0; i < result.length; ++i){
            var pathFile = __dirname +"/FichiersUtilisateur/" +result[i].fileid;
            var newpath = __dirname.substring(0, __dirname.indexOf("/routes")) + "/public/" + result[i].publicName;
            fs.copyFile(pathFile, newpath, (err) => {
                if (err) throw err;
                console.log(pathFile + ' was copied to '+newpath);

            });
        }
        res.send(result);
    }).catch(function(err){
        return res.status(403).json(err);
    });

})
router.get('/getImageURL/:fileId', AUTH.VERIFYAUTH, function(request, res, next) {
    var fileId = request.params.fileId;
    var userId = request.decoded.id
    // var userId = 6
    function getFileNameFromBatabase(fileId,userId) {
        return new Promise(function(resolve, reject) {
            var sql = "select * from fichier, user_files where fileId=id and userId="+userId+" and id ='"+fileId+"';";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    getFileNameFromBatabase(fileId,userId).then(rows => {
        if (!rows["0"])
        {
            return res.status(403).json({
                success: false,
                code : 'INCORRECT_FILE',
                message: "Ce fichier n'existe pas, ou il ne vous appartient pas"
            })
        }
        var pathFile = __dirname +"/FichiersUtilisateur/" + rows["0"].id;
        var pathname = __dirname +"/FichiersUtilisateur/" + rows["0"].name;
        var oldpath = pathFile;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 30; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        text +=  "_" + rows["0"].name;
        var newpath = __dirname.substring(0, __dirname.indexOf("/routes")) + "/public/" + text;


        fs.copyFile(oldpath, newpath, (err) => {
            if (err) throw err;
            console.log(oldpath + ' was copied to '+newpath);
            res.send(config.HOST + ":" + config.PORTSERVEUR + "/" + text);
        });



    }).catch(function(err){
        return res.status(403).json(err);
    });

});
router.get('/getClassRoomFile/:classId/:fileId', AUTH.VERIFYAUTH, AUTH.isProfessorOrStudentInThisClassRoom ,function(request, res, next) {
    var fileId = request.params.fileId;
    var classRoomId = request.params.classId;


    getFileNameFromBatabase(fileId,classRoomId).then(rows => {
        if (!rows["0"])
        {
            return res.status(403).json({
                success: false,
                code : 'INCORRECT_FILE',
                message: "Ce fichier n'existe pas, ou il ne vous appartient pas"
            })
        }
        var pathFile = __dirname +"/FichiersUtilisateur/" + rows["0"].id;
        var pathname = __dirname +"/FichiersUtilisateur/" + rows["0"].name;
        res.download(pathFile,  rows["0"].name);

    }).catch(function(err){
        return res.status(403).json(err);
    });


    function getFileNameFromBatabase(fileId,classRoomId) {
        return new Promise(function(resolve, reject) {
            var sql = "select * from fichier, classroom_files where fileId=id and classroomId="+classRoomId+" and id ='"+fileId+"';";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }



});
router.post('/uploadToUser/:filename/:dest', AUTH.VERIFYAUTH, function(request, res, next) {
    var filename = request.params.filename;
    var dest = request.params.dest;
    var sender = request.decoded.id

    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
        insertFile(filename, sender).then(function(rows){
            var oldpath = files[Object.keys(files)[0]].path;
            var newpath = __dirname +"/FichiersUtilisateur/" + rows.insertId;
            addFileToUserFileTable(rows.insertId, dest);
            fs.copyFile(oldpath, newpath, (err) => {
                if (err) throw err;
                console.log(oldpath + ' was copied to '+newpath);
                // res.end();
                res.send(rows);
            });
        }).catch(function(err){
            return res.status(403).json(err);
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


});
router.post('/uploadToExercice/:fileId/:exerciceId', AUTH.VERIFYAUTH, function(request, res, next) {
    var fileId = request.params.fileId;
    var exerciceId = request.params.exerciceId;



    function addFileToExerciceFileTable(fileId, exerciceId) {
        return new Promise(function(resolve, reject) {
            var sql = "insert into exercices_Files(file_id, exercice_id) values ('"+fileId+"',"+exerciceId+")"
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    addFileToExerciceFileTable(fileId, exerciceId).then(function(rows){
        res.send(rows)
    }).catch(function(err){
        return res.status(403).json(err);
    });


});
router.post('/uploadToClass/:filename/:classId', AUTH.VERIFYAUTH, AUTH.isProfessorInThisClassRoom, function(request, res, next) {
    var dest = request.params.classId;
    var filename = request.params.filename;
    var sender = request.decoded.id
    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {

    insertFile(filename, sender).then(function(rows){
        var oldpath = files[Object.keys(files)[0]].path;
        var newpath = __dirname +"/FichiersUtilisateur/" + rows.insertId;
        addFileToClassRoomFileTable(rows.insertId, dest);
        fs.copyFile(oldpath, newpath, (err) => {
            if (err) throw err;
            console.log(oldpath + ' was copied to '+newpath);
            // res.end();
            res.send(rows);
        });
    }).catch(function(err){
        return res.status(403).json(err);
    });


    });

    function addFileToClassRoomFileTable(fileId, dest) {
        return new Promise(function(resolve, reject) {
            var sql = "insert into classRoom_files(fileId, classRoomId) values ('"+fileId+"',"+dest+")"
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }


});





module.exports = router;
