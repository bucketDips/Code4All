var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');
var con = require('./connexionDatabase.js');
var config = require("./config");
var AUTH = require('./AUTHENTIFICATION')

/* GET users listing. */
router.get('/getStudentClassesById/:id', AUTH.VERIFYAUTH, function(request, res, next) {
    var id = request.params.id;
    function getLastRecord(id) {
        return new Promise(function(resolve, reject) {
            var sql = "select classroom.name, classroom.id from classroom, classroom_students where " +
                "classroom_students.idClassRoom=classroom.id and " +
                "classroom_students.idStudent='"+id+"';";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    getLastRecord(id).then(function(rows){ res.send(rows); });
});
router.get('/getProfessorClassesById/:id', AUTH.VERIFYAUTH, function(request, res, next) {
    var id = request.params.id;
    function getLastRecord(id) {
        return new Promise(function(resolve, reject) {
            var sql = "select classroom.name, classroom.id from classroom, classroom_professors where " +
                "classroom_professors.idClassRoom=classroom.id and " +
                "classroom_professors.idProfessor='"+id+"';";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    getLastRecord(id).then(function(rows){ res.send(rows); });
});




module.exports = router;
