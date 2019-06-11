var jwt = require('jsonwebtoken');
var config = require("./config");
var con = require('./connexionDatabase.js');

exports.isProfessorInThisClassRoom = function(request, res, next) {
    var classId = request.params.classId;
    var idProfessor = request.decoded.id

    function getLastRecord(classId,idProfessor){
        return new Promise(function(resolve, reject) {
            var sql = "select * from classroom_professors where idClassRoom ='"+classId+"' and idProfessor='"+idProfessor+"';";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    getLastRecord(classId,idProfessor).then(function(rows){
        if (rows.length > 0)
            return next();
        return res.status(403).json({
            success: true,
            code : 'MISSING_AUTHORISATION',
            message: 'Vous n\'êtes pas professeur dans cette classe'
        })
    })

}
exports.isProfessorOrStudentInThisClassRoom = function(request, res, next) {
    var classId = request.params.classId;
    var idProfessor = request.decoded.id

    function getLastRecord(classId,idProfessor){
        return new Promise(function(resolve, reject) {
            var sql = "select * from classroom_professors, classroom_students " +
                "where" +
                " classroom_students.idClassRoom ='"+classId+"' " +
                "or classroom_professors.idClassRoom ='"+classId+"' " +
                "and idStudent='"+idProfessor+"' " +
                "or idProfessor='"+idProfessor+"';";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    getLastRecord(classId,idProfessor).then(function(rows){
        if (rows.length > 0)
            return next();
        return res.status(403).json({
            success: true,
            code : 'MISSING_AUTHORISATION',
            message: 'Vous n\'êtes ni étudiant ni professeur dans cette classe'
        })
    })

}
exports.VERIFYAUTH = function(req,res,next){
   
    if(!req.headers.authorization)
        return res.status(403).json({ 
                success: false, 
                code : 'MISSING_AUTHORIZATION_HEADER',
                message: 'Le header \'authorization\' est manquant'
            }); 
    
    var token = req.headers.authorization.split(' ')[1];
    
    /// s'il y a un token on va le traiter
    // token="toto";
    if (token && token != 'null') {

        // verifies secret and checks exp
        jwt.verify(token, config.JWTKEY, function(err, decoded) {      
          if (err) {
            return res.status(403).json({
                success: true,
                code : 'INCORRECT_TOKEN',
                message: 'Token incorrect !'
            })
          } else {
            req.decoded = decoded;    
            return next();
          }
        });

    } 
    //si pas de token interdiction
    else {
        return res.status(403).json({ 
            success: false, 
            code : 'AUTHENTIFICATION_REQUIRED',
            message: 'Vous devez être authentifié pour accéder à cette ressource !' 
        });
    }
};
