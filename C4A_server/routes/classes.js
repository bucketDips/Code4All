var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');
var con = require('./connexionDatabase.js');
var config = require("./config");
var AUTH = require('./AUTHENTIFICATION')



router.get('/getStudentClassesById', AUTH.VERIFYAUTH, function(request, res, next) {
    var id = request.decoded.id;
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
router.get('/getProfessorClassesById/', AUTH.VERIFYAUTH, function(request, res, next) {
    var id = request.decoded.id;
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

router.get('/getStudentListInClass/:classId', AUTH.VERIFYAUTH, AUTH.isProfessorOrStudentInThisClassRoom, function(request, res, next) {
    var id = request.decoded.id;
    var classId = request.params.classId;
    function getLastRecord(classId,id) {
        return new Promise(function(resolve, reject) {
            var sql = "select users.id, users.name, email from classroom, users, classroom_students " +
                "where users.id=classroom_students.idStudent " +
                "and classroom.id=classroom_students.idclassroom " +
                "and classroom.id="+classId+" " +
                ";";

            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    getLastRecord(classId,id).then(function(rows){ res.send(rows); });
});
router.get('/getProfessorListInClass/:classId', AUTH.VERIFYAUTH, AUTH.isProfessorOrStudentInThisClassRoom, function(request, res, next) {
    var id = request.decoded.id;
    var classId = request.params.classId;
    function getLastRecord(id,classId) {
        return new Promise(function(resolve, reject) {
            var sql = "select users.id, users.name, email from classroom, users, classroom_professors " +
                "where users.id=classroom_professors.idProfessor " +
                "and classroom.id=classroom_professors.idclassroom " +
                "and classroom.id="+classId+" " +
                ";";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    getLastRecord(id,classId).then(function(rows){ res.send(rows); });
});
router.post('/addStudentToClass/:id/:classId', AUTH.VERIFYAUTH, AUTH.isProfessorInThisClassRoom ,function(request, res, next) {
    var id = request.params.id;
    var classId = request.params.classId;
    function getLastRecord(id,classId) {
        return new Promise(function(resolve, reject) {
            var sql = "insert into classroom_students(idClassRoom, idStudent) values ('"+classId+"','"+id+"');";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    getLastRecord(id,classId).then(function(rows){ res.send(rows); });

});
router.post('/addProfessorToClass/:id/:classId', AUTH.VERIFYAUTH, AUTH.isProfessorInThisClassRoom, function(request, res, next) {
    var id = request.params.id;
    var classId = request.params.classId;

    function getLastRecord(id,classId) {
        return new Promise(function(resolve, reject) {
            var sql = "insert into classroom_professors(idClassRoom, idProfessor) values ('"+classId+"','"+id+"');";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    getLastRecord(id,classId).then(function(rows){ res.send(rows); });

});

router.post('/createClassroom/:name', AUTH.VERIFYAUTH, function(request, res, next) {
    var name = request.params.name;
    var id = request.decoded.id;

    function getLastRecord(name) {
        return new Promise(function(resolve, reject) {
            var sql = "insert into classroom(name) values ('"+name+"');";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    function addTeacherToClass(id, classeId) {

        return new Promise(function(resolve, reject) {
            var sql = "insert into classroom_professors(idProfessor,idClassRoom) values ('"+id+"','"+classeId+"');";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    getLastRecord(name).then(function(rows){
        addTeacherToClass(id, rows.insertId).then(function(rows){
            res.send(rows);
        })

    });
});




module.exports = router;
