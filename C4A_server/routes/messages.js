var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');
var con = require('./connexionDatabase.js');


router.post('/sendMessage/:IdSender/:IdDest/:subject/:msg', function(request, res, next) {
    var IdSender = request.params.IdSender;
    var IdDest = request.params.IdDest;
    var subject = request.params.subject;
    var msg = request.params.msg;
    function createMessage(IdSender) {
        return new Promise(function(resolve, reject) {
            var sql = "insert into messages(sender,subject,text) values ('"+IdSender+"','"+subject+"','"+msg+"')";
            console.log(sql)
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    function addMessageToUser(target, idMessage) {
        console.log("addMessageToUser")
        console.log("target")
        console.log(target)
        console.log("idMessage")
        console.log(idMessage)
        return new Promise(function(resolve, reject) {
            var sql = "insert into user_messages(target,message) values ("+target+","+idMessage+")";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    createMessage(IdSender).then(function(rows){
        addMessageToUser(IdDest,rows.insertId).then(function(rows){
            res.send(rows);
        });

    });
});
router.post('/sendMessageToClass/:IdSender/:IdClassDest/:subject/:msg', function(request, res, next) {
    var IdSender = request.params.IdSender;
    var IdDest = request.params.IdClassDest;
    var subject = request.params.subject;
    var msg = request.params.msg;
    function createMessage(IdSender) {
        return new Promise(function(resolve, reject) {
            var sql = "insert into messages(sender,subject,text) values ('"+IdSender+"','"+subject+"','"+msg+"')";
            console.log(sql)
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    function addMessageToClass(target, idMessage) {
        console.log("addMessageToClass")
        console.log("target")
        console.log(target)
        console.log("idMessage")
        console.log(idMessage)
        return new Promise(function(resolve, reject) {
            var sql = "insert into classroom_messages(idClassRoom,idMessage) values ("+target+","+idMessage+")";
            console.log(sql);
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    createMessage(IdSender).then(function(rows){
        addMessageToClass(IdDest,rows.insertId).then(function(rows){
            res.send(rows);
        });

    });
});


// Recupere les messages adressés a l'utilisateur, ainsi que ceux de toute les classRoom dans lesquelle il est
router.get('/:getUserMsg/:id', function(request, res, next) {
    var userId = request.params.id;
    function createMessage(userId) {
        return new Promise(function(resolve, reject) {
            var sql = "select distinct classroom_students.idStudent, messages.id, sender,users.name as senderName, subject, text " +
                "from messages, users, user_messages,classroom_messages,classroom_students " +
                "where " +
                "classroom_messages.idMessage = messages.id " +
                "and " +
                "classroom_messages.idclassroom = classroom_students.idclassroom " +
                "and " +
                "classroom_students.idStudent='"+userId+"' " +
                "or " +
                "(users.id=sender " +
                "and " +
                "messages.id=user_messages.message) " +
                "and " +
                "target='"+userId+"' " +
                "group by messages.id " +
                "order by messages.id desc;";
            console.log(sql)
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    createMessage(userId).then(function(rows){ res.send(rows); });
});



module.exports = router;