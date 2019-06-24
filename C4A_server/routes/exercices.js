var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');
var con = require('./connexionDatabase.js');
var jwt = require('jsonwebtoken');
var config = require("./config");
var AUTH = require('./AUTHENTIFICATION')
var gEval =eval;
var fs = require('fs');
var sEval = require('safe-eval');
var SqlString = require('sqlstring');
var evalContext = {
    evalContext: this,
    sEval:sEval,
};
var tmpFuncJson = {
    name: "michel",
    code: "function() {console.log('chocapic');}",
    description: "merde"
}
var funcString = [
    {
        "name":"i",
        "code":"function oki() {\r\n  return \"A\";\r\n}",
        "description":"o"
    }
]
var createFunction = function (txt) {
    return new Function("return " + txt)();
}

function insertExerciceFunctions(functions, exercice_id) {
    return new Promise(function(resolve, reject) {
        var reccords = [];
        var str = "";
        for (var i = 0; i < functions.length; ++i){
            str += "('"+exercice_id+"','"+escapeQuote(functions[i].code)+"','"+escapeQuote(functions[i].name)+"','"+escapeQuote(functions[i].description)+"'),"

        }
        str = str.substring(0,str.length - 1)
        var sql = "INSERT INTO exercice_functions (exercice_id, code, name, description) VALUES " + str
        console.log(sql)
        con.query(sql,function (err, rows, fields) {
            if (err) return reject(err);
            resolve(rows);
        });
    });
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
    temp[funcString[0].name] = createFunction(funcString[0].code);
    var ret = temp[funcString[0].name]();
    console.log("res")
    console.log(ret)
    console.log("res")

    res.send("toto");
});
router.post('/addExerciceToClass/:id/:classId', AUTH.VERIFYAUTH, AUTH.isProfessorInThisClassRoom ,function(request, res, next) {
    var exerciceId = request.params.id;
    var classId = request.params.classId;

    function addExerciceToClass(exerciceId,classId) {
        return new Promise(function(resolve, reject) {
            // var sql = "insert into class_exercices(class_id, exercice_id) values ?;"
            var sql = "insert into class_exercices(class_id, exercice_id) values ('"+classId+"','"+exerciceId+"');"
            // con.query(sql,[classId,exerciceId],function (err, rows, fields) {
            con.query(sql,function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    addExerciceToClass(exerciceId,classId).then(function(rows){
        res.send(rows)
    }).catch(function(err){
        return res.status(403).json(err);
    });
});
router.get('/getAllStoreExercicesNotOwned', AUTH.VERIFYAUTH,function(request, res, next) {
    var userId = request.decoded.id
    function getAllStoreExercicesNotOwned(userId) {
        return new Promise(function(resolve, reject) {
            var sql = "select exercices.id, exercices.title, exercices.text " +
                "from exercices, user_exercices " +
                "where exercices.isPublic=1 " +
                "and exercices.id = user_exercices.exerciceId " +
                "and user_exercices.userid != ? " +
                "and author_id != ?;"
            con.query(sql, [userId,userId], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }


    getAllStoreExercicesNotOwned(userId).then(function(rows){
        res.send(rows)

    }).catch(function(err){
        return res.status(403).json(err);
    });

})
router.get('/getUserExercices', AUTH.VERIFYAUTH,function(request, res, next) {
    var userId = request.decoded.id
    function getUserPersonnalExercices(userId) {
        return new Promise(function(resolve, reject) {
            var sql = "select id, title, text from exercices where author_id = ?;"
            con.query(sql, [userId], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    function getUserForkedExercices(userId) {
        return new Promise(function(resolve, reject) {
            var sql = "select exercices.id, exercices.title, exercices.text from exercices, user_exercices where user_exercices.userid = ? and exercices.id = user_exercices.exerciceId;"
            con.query(sql, [userId], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    function getUserClassExercices(userId) {
        return new Promise(function(resolve, reject) {
            var sql = "select exercices.id, exercices.title, exercices.text from exercices, class_exercices, classroom_students where class_exercices.exercice_id = exercices.id " +
                "and classroom_students.idClassRoom = class_exercices.class_id and classroom_students.idstudent = ?;"
            con.query(sql, [userId], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    getUserPersonnalExercices(userId).then(function(rowsPersonnal){
        getUserForkedExercices(userId).then(function(rowsForked){
            getUserClassExercices(userId).then(function(rowsClass){
                res.json({
                    perso:rowsPersonnal,
                    forked:{
                        fromStore : rowsForked,
                        fromClasses: rowsClass
                    }
                })

            }).catch(function(err){
                return res.status(403).json(err);
            });
        }).catch(function(err){
            return res.status(403).json(err);
        });
    }).catch(function(err){
        return res.status(403).json(err);
    });
})
router.get('/getExercice/:id', AUTH.VERIFYAUTH,function(request, res, next) {
    var id = request.params.id;
    var userId = request.decoded.id
    var temp = {}
    function getExercice(id) {
        return new Promise(function(resolve, reject) {
            var sql = "select * from exercices where id='"+id+"';";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });

        });
    }
    function getFunctions(id) {
        return new Promise(function(resolve, reject) {
            var sql = "select * from exercice_functions where exercice_id ='"+id+"';";
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    function getExerciceFiles(id) {
        return new Promise(function(resolve, reject) {
            var sql = "select * from fichier, exercices_Files where fichier.id = exercices_Files.file_id and exercices_Files.exercice_id ='"+id+"';";
            console.log(sql)
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    getExercice(id).then(function(rows){
        if (rows.length == 0){
            return res.status(404).json({
                success: false,
                code : 'NOT_FOUND',
                message: 'Cet exercice n\'existe pas !'
            })
        }
        // if (rows[0].author_id != userId && rows[0].public == 0){
        //     return res.status(403).json({
        //         success: false,
        //         code : 'MISSING_AUTHORISATION',
        //         message: 'Cet exercice ne vous appartient pas et n\'est pas public!'
        //     })
        // }
        getFunctions(id).then(function(rows1){
            rows[0].content = JSON.parse(rows[0].content);
            getExerciceFiles(id).then(function(fileExo){
                console.log("fileExo")
                console.log(fileExo)
                console.log(fileExo.length)
                for (var i = 0; i < fileExo.length; ++i){
                    var pathFile = __dirname +"/FichiersUtilisateur/" +fileExo[i].file_id;
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    for (var j = 0; j < 30; j++)
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    text +=  "_" + fileExo[i].name;

                    var publicName = text;
                    var url = config.HOST + ":" + config.PORTSERVEUR + "/" + publicName;
                    var newpath = __dirname.substring(0, __dirname.indexOf("/routes")) + "/public/" + publicName;
                    console.log("newpath")
                    console.log(newpath)
                    console.log("url")
                    console.log(url)
                    fileExo[i].url = url;
                    console.log("nique")
                    console.log(pathFile + ' will be  copied to '+newpath);

                    fs.copyFile(pathFile, newpath, (err) => {
                        if (err) throw err;
                        console.log(pathFile + ' was copied to '+newpath);

                    })
                }
                var resultJson = {
                    exercice: rows[0],
                    functions: rows1,
                    fichiers : fileExo
                }
                console.log("resultJson")
                console.log(resultJson)
                res.send(resultJson);
            }).catch(function(err){
                return res.status(403).json(err);
            });


        }).catch(function(err){
            return res.status(403).json(err);
        });
    }).catch(function(err){
        return res.status(403).json(err);
    });
});
var getFuncName = function(str){
    return str.substring(0,str.indexOf('('))
}
router.post('/executeExercice', AUTH.VERIFYAUTH,function(request, res, next) {
    // var exercice = JSON.parse(request.body.exercice);
    var exercice = ""
    var functionList = {};
    // tmp
    exercice = {
        "exercice":
            {
                "id": 6,
                "title": "test",
                "text": "toto",
                "isPublic": 1,
                "content": "{\"lines\":6,\"columns\":20,\"patternId\":8,\"blocks\":[{\"id\":0,\"row\":6,\"column\":1,\"width\":10,\"height\":1,\"patternId\":8},{\"id\":1,\"row\":6,\"column\":11,\"width\":10,\"height\":1,\"patternId\":8},{\"id\":2,\"row\":3,\"column\":8,\"width\":1,\"height\":1,\"patternId\":4},{\"id\":3,\"row\":3,\"column\":9,\"width\":1,\"height\":1,\"patternId\":3},{\"id\":4,\"row\":3,\"column\":10,\"width\":1,\"height\":1,\"patternId\":4},{\"id\":5,\"row\":3,\"column\":11,\"width\":1,\"height\":1,\"patternId\":3}],\"npcs\":[{\"id\":0,\"row\":5,\"column\":15,\"width\":1,\"height\":1,\"patternId\":6}],\"pcs\":[{\"id\":0,\"row\":5,\"column\":5,\"width\":1,\"height\":1,\"patternId\":2,\"functions\":[{\"name\":\"i\",\"code\":\"function oki() {\r\n  return \"A\";\r\n}\",\"description\":\"o\"}]}],\"labels\":[]}",
                "author_id": 1
            }
        ,
        "functions": [
            {
                "function_id": 1,
                "exercice_id": 6,
                "code": "function A() {\r\n  console.log( \"AA\");\r\n}",
                "name": "A"
            },
            {
                "function_id": 2,
                "exercice_id": 6,
                "code": "function B(a,b) {\r\n  console.log(\"TOoTO\");console.log(a);console.log(b);\r\n}",
                "name": "B"
            }
            ,
            {
                "function_id": 2,
                "exercice_id": 6,
                "code": "function C(a) {return a}",
                "name": "C"
            }
            ,
            {
                "function_id": 3,
                "exercice_id": 6,
                // "code": "function boucle(depart,fin, action) {for (var sfglkj = depart; sfglkj < fin; ++sfglkj){console.log(\"action = \" + action);new Function(action)()}}",
                "code": "function boucle(depart,fin, action) {for (var sfglkj = depart; sfglkj < fin; ++sfglkj){new Function(action)()}}",
                "name": "boucle"
            }
            ,
            {
                "function_id": 4,
                "exercice_id": 6,
                // "code": "function boucle(depart,fin, action) {for (var sfglkj = depart; sfglkj < fin; ++sfglkj){console.log(\"action = \" + action);new Function(action)()}}",
                "code": "function condition(cnd, action) {if(cnd){new Function(action)()}}",
                // "code": "function condition(cnd, action) {if(cnd){sEval(action,evalContext)}}",
                // "code": "function condition(cnd, action) {if(cnd){console.log(\"action = \" + action);eval(action)}}",
                "name": "condition"
            }
        ],
        // "solution":"A();B(1,2);B(3,4);A();boucle(0,4,console.log(\"jordan\"))"
        // "solution":"A();B(1,2);B(3,4);A();boucle(0,4,A())"
        // "solution":"boucle(0,4,'boucle(0,4,\"B(3,4)\")');boucle(0,2,'console.log(\"bite\")')"
        // "solution":"boucle(0,4,'boucle(0,4,\"B(3,4)\")');"
        "solution":"condition(1<2, 'console.log(\"bite\")');condition(1>2, 'console.log(\"mousse\")')"
    };
    var exerciceSteps = [];
    for (var i = 0; i < exercice.functions.length; ++i) {
        var name = exercice.functions[i].name;
        functionList[name] = createFunction(exercice.functions[i].code)
        var tmp = gEval(exercice.functions[i].code)
        evalContext[exercice.functions[i].name] = tmp;
        console.log("evalContext")
        console.log(evalContext)


    }
    exerciceSteps.push(exercice.exercice.content);
    var functionUsedList = exercice.solution.split(";")
    // for (var i = 0; i < functionList.length; ++i){
    //
    // }
    for (var i = 0; i < functionUsedList.length; ++i){
        console.log(functionUsedList[i])
        gEval(functionUsedList[i],evalContext)
        /*var variables = functionUsedList[i]
        variables = variables.substring(variables.indexOf('('))
        var asParameters = false;
        if (variables.length > 2) {
            variables = variables.replace('(','')
            variables = variables.replace(')','')
            variables = variables.split(',')
            asParameters = true;
        }
        var ret;
        var funcName = getFuncName(functionUsedList[i]);
        if (asParameters){

            for (var j = 0; j < variables.length; ++j){
                var variableName = getFuncName(variables[j]);
                if (variables[j].indexOf("(") > 0 && functionList[variableName]){
                    var funcCode = functionList[variableName].toString()
                    variables[j] = funcCode.substring(funcCode.indexOf('{') + 1, funcCode.length - 1);
                }

            }
            // console.log("apres")
            // console.log(variables)
            ret = functionList[funcName].apply(null, variables);
        }

        else {
            ret = functionList[funcName].apply(null, null);
        }*/
        // exerciceSteps.push(exercice.exercice.content);
    }
    // console.log(functionUsedList);
    // res.send(exerciceSteps)
    res.send("toto")
});
var escapeQuote1 = function(str){

    var find = "'";
    var re = new RegExp(find, 'g');
    return str.replace(re, "\'")
    // return str
}
function escapeQuote (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            // case "\0":
            //     return "\\0";
            // case "\x08":
            //     return "\\b";
            // case "\x09":
            //     return "\\t";
            // case "\x1a":
            //     return "\\z";
            // case "\n":
            //     return "";
            // case "\r":
            //     return "";
            // case "\"":
            case "'":
            // case "\\":
            // case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}
router.post('/add', AUTH.VERIFYAUTH,function(request, res, next) {
    var contentOjb =JSON.parse(request.body.exercice);
    var content = JSON.stringify(contentOjb)
    var author_id = request.decoded.id


    function insertExercice(contentOjb,content,author_id) {
        return new Promise(function(resolve, reject) {
            console.log("debut conversion")
            console.log(SqlString.escape('toto'))

            // contentOjb.title = escapeQuote(contentOjb.title)
            contentOjb.title = SqlString.escape(contentOjb.title)
            // contentOjb.text = escapeQuote(contentOjb.text)
            contentOjb.text = SqlString.escape(contentOjb.text)
            // content = escapeQuote(content)
            //content = SqlString.escape(content)
            console.log("content")
            console.log(content)
            var sql = "insert into exercices(title,text,isPublic,content, author_id,code)"
            sql += "values('"+contentOjb.title+"','"+contentOjb.text+"','"+contentOjb.public+"','"+escapeQuote(content)+"','"+author_id+"','"+contentOjb.code+"')"+";";
            console.log(sql)
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });

        });
    }

    insertExercice(contentOjb,content,author_id).then(function(rows){
        if (contentOjb.functions.length == 0){
            res.send(rows);
        }
        else {
            insertExerciceFunctions(contentOjb.functions,rows.insertId).then(function(rows1){
                res.json(rows);
            }).catch(function(err){
                return res.status(403).json(err);
            });
        }

    }).catch(function(err){
        return res.status(403).json(err);
    });


});
function deleteExerciceFunctions(exo_id) {
    return new Promise(function(resolve, reject) {
        var sql = "delete from exercice_functions where exercice_id='"+exo_id+"';"
        console.log(sql)
        con.query(sql, function (err, rows, fields) {
            if (err) return reject(err);
            resolve(rows);
        });

    });
}
router.post('/modify/:exerciceId', AUTH.VERIFYAUTH,function(request, res, next) {
    var contentOjb =JSON.parse(request.body.exercice);
    var content = JSON.stringify(contentOjb)
    var author_id = request.decoded.id
    var exo_id = request.params.exerciceId


    function modifyExercice(exo_id,contentOjb,content,author_id) {
        return new Promise(function(resolve, reject) {
            // contentOjb.title = escapeQuote(contentOjb.title)
            contentOjb.title = SqlString.escape(contentOjb.title)
            // contentOjb.text = escapeQuote(contentOjb.text)
            contentOjb.text = SqlString.escape(contentOjb.text)
            // content = escapeQuote(content)
            content = SqlString.escape(content)
            // console.log("content")
            // console.log(content)
            // console.log("content")
            // console.log(content)
            var sql = "update exercices set title='"+contentOjb.title+"',text='"+contentOjb.text+"',isPublic='"+contentOjb.public
            sql+="',content='"+content+"',code='"+contentOjb.code+"' where id='"+exo_id+"' and author_id='"+author_id+"';"
            console.log(sql)
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });

        });
    }


    modifyExercice(exo_id,contentOjb,content,author_id).then(function(rows){
        deleteExerciceFunctions(exo_id).then(function(rows){
            console.log(rows)
            if (contentOjb.functions.length == 0){
                res.send(rows);
            }
            else{
                insertExerciceFunctions(contentOjb.functions,exo_id).then(function(rows1){
                    res.send(rows);
                }).catch(function(err){
                    return res.status(403).json(err);
                });

            }

        }).catch(function(err){
            return res.status(403).json(err);
        });
    }).catch(function(err){
        return res.status(403).json(err);
    });


});
router.post('/delete/:exerciceId', AUTH.VERIFYAUTH,function(request, res, next) {
    var author_id = request.decoded.id
    var exo_id = request.params.exerciceId


    function deleteExercice(exo_id,author_id) {
        return new Promise(function(resolve, reject) {
            // var sql = "delete exercices, user_exercices, exercice_functions, class_exercices" +
            //     " from exercices" +
            //     " inner join user_exercices on user_exercices.exerciceId=exercices.id" +
            //     " inner join exercice_functions on exercice_functions.exercice_id=exercices.id" +
            //     " inner join class_exercices on class_exercices.exercice_id=exercices.id" +
            //     " where  " +
            //     "exercices.id = ? and exercices.author_id = ?;"
            var sql = "delete from exercices where id = ? and author_id = ?;"
            con.query(sql,[exo_id,author_id], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });

        });
    }
    function deleteUserExercice(exo_id) {
        return new Promise(function(resolve, reject) {
            var sql = "delete from user_exercices where exerciceId = ?"
            con.query(sql,[exo_id], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });

        });
    }
    function deleteClassExercice(exo_id) {
        return new Promise(function(resolve, reject) {
            var sql = "delete from class_exercices where exercice_id = ?"
            con.query(sql,[exo_id], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });

        });
    }
    function deleteExerciceFunction(exo_id) {
        return new Promise(function(resolve, reject) {
            var sql = "delete from exercice_functions where exercice_id = ?"
            con.query(sql,[exo_id], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });

        });
    }


    deleteExercice(exo_id,author_id).then(function(rowsExercice){
        if (rowsExercice.affectedRows=0)
            return res.status(403).json({
                success: false,
                code : 'MISSING_AUTHORISATION',
                message: 'Cet exercice ne vous appartient!'
            })
        deleteUserExercice(exo_id).then(function(rowsUserExercice){
            deleteClassExercice(exo_id).then(function(rowsClassExercice){
                deleteExerciceFunction(exo_id).then(function(rows){
                    res.send(rows);
                }).catch(function(err){
                    return res.status(403).json(err);
                });
            }).catch(function(err){
                return res.status(403).json(err);
            });
        }).catch(function(err){
            return res.status(403).json(err);
        });
    }).catch(function(err){
        return res.status(403).json(err);
    });


});



module.exports = router;
