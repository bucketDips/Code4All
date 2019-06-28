var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');
var con = require('./connexionDatabase.js');
var jwt = require('jsonwebtoken');
var config = require("./config");
var gridClass = require("./grid.js")
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
function stand(str) {
    str = str.substring(1, str.length - 1)
    var find = "\\\\r\\\\n"
    var re = new RegExp(find, 'g');
    str = str.replace(re, "\r\n")
    find = "\\\\"
    re = new RegExp(find, 'g');
    str = str.replace(re, "")
    // str = rmendOfLine(str)
    return str
}
function deleteExercice(exo_id,author_id) {
    return new Promise(function(resolve, reject) {
        var sql = "delete from exercices where id = ? and author_id = ?;"
        con.query(sql,[exo_id,author_id], function (err, rows, fields) {
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
function deleteExerciceFromClass(exo_id, class_id) {
    return new Promise(function(resolve, reject) {
        var sql = "delete from class_exercices where exercice_id = ? and class_id = ?;"
        con.query(sql,[exo_id, class_id], function (err, rows, fields) {
            if (err) return reject(err);
            resolve(rows);
        });

    });
}
function insertExerciceFunctions(functions, exercice_id) {
    return new Promise(function(resolve, reject) {
        if (functions.length == 0){
            resolve({});
        }
        var reccords = [];
        var str = "";
        for (var i = 0; i < functions.length; ++i){
            str += "("+exercice_id+","+SqlString.escape(functions[i].code)+","+SqlString.escape(functions[i].name)+","+SqlString.escape(functions[i].description)+"),"

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
function insertExerciceTests(tests, exercice_id) {
    return new Promise(function(resolve, reject) {
        if (tests.length == 0){
            resolve({});
        }
        var reccords = [];
        var str = "";
        for (var i = 0; i < tests.length; ++i){
            str += "("+exercice_id+","+SqlString.escape(tests[i].code)+","+SqlString.escape(tests[i].name)+","+SqlString.escape(tests[i].description)+"),"

        }
        str = str.substring(0,str.length - 1)
        var sql = "INSERT INTO exercice_tests (exercice_id, code, name, description) VALUES " + str
        console.log(sql)
        con.query(sql,function (err, rows, fields) {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}
/* GET users listing. */
router.get('/test', function(request, res, next) {
    // var id = request.params.id;
    // var temp = {}
    // function getLastRecord(id) {
    //     return new Promise(function(resolve, reject) {
    //         var sql = "select * from users where id='"+id+"';";
    //         con.query(sql, function (err, rows, fields) {
    //             if (err) return reject(err);
    //             resolve(rows);
    //         });
    //     });
    // }
    // temp[funcString[0].name] = createFunction(funcString[0].code);
    // var ret = temp[funcString[0].name]();
    // console.log("res")
    // console.log(ret)
    // console.log("res")
    var grille = new gridClass.Grid(5,5,1)
    console.log("grille")
    console.log(grille)
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
            var sql = "select exercices.id, exercices.title, exercices.description " +
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
            var sql = "select id, title, description from exercices where author_id = ?;"
            con.query(sql, [userId], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    function getUserForkedExercices(userId) {
        return new Promise(function(resolve, reject) {
            var sql = "select exercices.id, exercices.title, exercices.description from exercices, user_exercices where user_exercices.userid = ? and exercices.id = user_exercices.exerciceId;"
            con.query(sql, [userId], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    function getUserClassExercices(userId) {
        return new Promise(function(resolve, reject) {
            var sql = "select exercices.id, exercices.title, exercices.description from exercices, class_exercices, classroom_students where class_exercices.exercice_id = exercices.id " +
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
                for (var i = 0; i < rowsPersonnal.length; ++i){
                    rowsPersonnal[i].title = rowsPersonnal[i].title.substring(1,rowsPersonnal[i].title.length - 1)
                    rowsPersonnal[i].description = rowsPersonnal[i].description.substring(1,rowsPersonnal[i].description.length - 1)
                }
                for (var i = 0; i < rowsForked.length; ++i){
                    rowsForked[i].title = rowsForked[i].title.substring(1,rowsForked[i].title.length - 1)
                    rowsForked[i].description = rowsForked[i].description.substring(1,rowsForked[i].description.length - 1)
                }
                for (var i = 0; i < rowsClass.length; ++i){
                    rowsClass[i].title = rowsClass[i].title.substring(1,rowsClass[i].title.length - 1)
                    rowsClass[i].description = rowsClass[i].description.substring(1,rowsClass[i].description.length - 1)
                }
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
    function getTests(id) {
        return new Promise(function(resolve, reject) {
            var sql = "select * from exercice_tests where exercice_id ='"+id+"';";
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
        getTests(id).then(function(rowsTests) {
            getFunctions(id).then(function (rows1) {
                // rows[0].content = JSON.parse(rows[0].content);
                getExerciceFiles(id).then(function (fileExo) {
                    for (var i = 0; i < fileExo.length; ++i) {
                        var pathFile = __dirname + "/FichiersUtilisateur/" + fileExo[i].file_id;
                        var text = "";
                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                        for (var j = 0; j < 30; j++)
                            text += possible.charAt(Math.floor(Math.random() * possible.length));
                        text += "_" + fileExo[i].name;

                        var publicName = text;
                        var url = config.HOST + ":" + config.PORTSERVEUR + "/" + publicName;
                        var newpath = __dirname.substring(0, __dirname.indexOf("/routes")) + "/public/" + publicName;
                        console.log("newpath")
                        console.log(newpath)
                        console.log("url")
                        console.log(url)
                        fileExo[i].url = url;
                        console.log(pathFile + ' will be  copied to ' + newpath);

                        fs.copyFile(pathFile, newpath, (err) => {
                            if (err) throw err;
                            console.log(pathFile + ' was copied to ' + newpath);

                        })
                    }

                    function remQuote(str) {
                        return str.substring(1, str.length - 1)
                    }



                    rows[0].title = rows[0].title.substring(1, rows[0].title.length - 1)
                    rows[0].description = rows[0].description.substring(1, rows[0].description.length - 1)
                    rows[0].code = stand(rows[0].code)
                    // var find = "\\\\r\\\\n"
                    // var re = new RegExp(find, 'g');
                    // rows[0].code = rows[0].code.replace(re, "\r\n")
                    // find = "rn"
                    // re = new RegExp(find, 'g');
                    // rows[0].code = rows[0].code.replace(re, "\r\n")
                    // find = ";nn"
                    // re = new RegExp(find, 'g');
                    // rows[0].code = rows[0].code.replace(re, ";\n\n")
                    // find = ";n"
                    // re = new RegExp(find, 'g');
                    // rows[0].code = rows[0].code.replace(re, ";\n")
                    rows[0].blocks = JSON.parse(stand(rows[0].blocks))
                    rows[0].npcs = JSON.parse(stand(rows[0].npcs))
                    rows[0].pcs = JSON.parse(stand(rows[0].pcs))
                    rows[0].labels = JSON.parse(stand(rows[0].labels))
                    // console.log(rows[0].labels)
                    rows[0].functions = rows1;
                    rows[0].fichiers = fileExo;
                    rows[0].tests = rowsTests;
                    var resultJson = {
                        exercice: rows[0]
                    }

                    res.send(resultJson);
                }).catch(function (err) {
                    console.log("err1")
                    return res.status(403).json(err);
                });


            }).catch(function (err) {
                console.log("errfunc")
                return res.status(403).json(err);
            });
        }).catch(function (err) {
            console.log("errtest")
            return res.status(403).json(err);
        });
    }).catch(function(err){
        console.log("err3")
        return res.status(403).json(err);
    });
});
var getFuncName = function(str){
    return str.substring(0,str.indexOf('('))
}
var instanciateGrid = function(exercice){
    var grid = new gridClass.Grid(exercice.rows, exercice.columns, exercice.patternId)
    var current;
    var i = 0;
    for (i = 0; i < exercice.blocks.length; ++i){
        current =  exercice.blocks[i];
        grid.addBlock(new gridClass.Block(current.id,current.row,current.column,current.width, current.height,current.patternId))
    }
    for (i = 0; i < exercice.npcs.length; ++i){
        current =  exercice.npcs[i];
        grid.addNpc(new gridClass.Npc(current.id,current.row,current.column,current.width, current.height,current.patternId))
    }
    for (i = 0; i < exercice.pcs.length; ++i){
        current =  exercice.pcs[i];
        grid.addPc(new gridClass.Pc(current.id,current.row,current.column,current.width, current.height,current.patternId))
    }
    for (i = 0; i < exercice.labels.length; ++i){
        current =  exercice.labels[i];
        grid.addLabel(new gridClass.Label(current.id,current.row,current.column,current.width, current.height,current.text))
    }
    for (i = 0; i < exercice.functions.length; ++i){
        current =  exercice.functions[i];
        grid.addFunction(new gridClass.Func(current.name,current.code,current.description))
    }
    return grid;
}
router.get('/getUserExerciceSolutionAndroid/:exerciceId', AUTH.VERIFYAUTH,function(request, res, next) {
    var exerciceId = request.params.exerciceId;
    var userId = request.decoded.id;
    function getUserExerciceSolutionAndroid(userId, exerciceId) {
        return new Promise(function(resolve, reject) {
            var sql = "select * from user_exercice_solution_android where userId= ? and exercice_id = ?";
            console.log(sql)
            con.query(sql, [userId,exerciceId],function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    getUserExerciceSolutionAndroid(userId, exerciceId).then(function(rows){

        rows[0].solution = stand(rows[0].solution);
        res.send(JSON.parse(rows[0].solution));

    }).catch(function(err){
        return res.status(403).json(err);
    });

});
router.post('/saveUserExerciceSolutionWeb/:exerciceId', AUTH.VERIFYAUTH,function(request, res, next) {
    var solution = SqlString.escape(request.body.solution)
    var exerciceId = request.params.exerciceId
    var userId = request.decoded.id
    function deleteUserExerciceSolutionWeb(userId, exerciceId) {
        return new Promise(function(resolve, reject) {
            var sql = "delete from user_exercice_solution_web where userId= ? and exercice_id = ?";
            console.log(sql)
            con.query(sql, [userId, exerciceId], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    function saveUserExerciceSolutionWeb(userId, exerciceId, sol) {
        return new Promise(function(resolve, reject) {
            var sql = "insert into user_exercice_solution_web( userId,exercice_id, solution) values (?);";
            console.log(sql)
            con.query(sql, [[userId,exerciceId,sol]],function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    deleteUserExerciceSolutionWeb(userId, exerciceId).then(function(rows){
        saveUserExerciceSolutionWeb(userId, exerciceId, solution).then(function(rows){
            res.send(rows);
        }).catch(function(err){
            return res.status(403).json(err);
        });
    }).catch(function(err){
        return res.status(403).json(err);
    });

})
router.get('/getUserExerciceSolutionWeb/:exerciceId', AUTH.VERIFYAUTH,function(request, res, next) {
    var exerciceId = request.params.exerciceId;
    var userId = request.decoded.id;
    function getUserExerciceSolutionWeb(userId, exerciceId) {
        return new Promise(function(resolve, reject) {
            var sql = "select * from user_exercice_solution_web where userId= ? and exercice_id = ?";
            console.log(sql)
            con.query(sql, [userId,exerciceId],function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    getUserExerciceSolutionWeb(userId, exerciceId).then(function(rows){

        rows[0].solution = stand(rows[0].solution);
        res.send(rows[0].solution);

    }).catch(function(err){
        return res.status(403).json(err);
    });

});
router.post('/executeExercice', AUTH.VERIFYAUTH,function(request, res, next) {
    var userId = request.decoded.id;
    var exerciceData = JSON.parse(request.body.exercice);
    var exercice = exerciceData.exercice;
    var grid = instanciateGrid(exercice);
    var exerciceSteps = [];
    var addState = function(){
        console.log("addState")
        exerciceSteps.push(JSON.parse(JSON.stringify(grid)))
    }
    addState();
    function deleteUserExerciceSolutionAndroid(userId, exerciceId) {
        return new Promise(function(resolve, reject) {
            var sql = "delete from user_exercice_solution_android where userId= ? and exercice_id = ?";
            console.log(sql)
            con.query(sql, [userId, exerciceId], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    function saveUserExerciceSolutionAndroid(userId, exerciceId, sol) {
        return new Promise(function(resolve, reject) {
            var sql = "insert into user_exercice_solution_android( userId,exercice_id, solution) values (?);";
            console.log(sql)
            con.query(sql, [[userId,exerciceId,sol]],function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    grid["boucle"] = function(start, end, actions){
        for (var w = start; w < end; ++w){
            for (var i = 0; i < actions.length; ++i){
                var currentAction = actions[i];
                if (currentAction.type === "boucle"){
                    this.boucle(currentAction.start,currentAction.end, currentAction.actions)
                }
                else if (currentAction.type === "condition"){
                    this.condition(cond, currentAction.actions)
                }
                else{
                    this[currentAction](this);
                    addState();
                }

            }
        }


    }
    grid["condition"] = function(cond, actions){
        if (this[cond] && this[cond](this)){
            for (var i = 0; i < actions.length; ++i){
                var currentAction = actions[i];
                if (currentAction.type === "boucle"){
                    this.boucle(currentAction.start,currentAction.end, currentAction.actions)
                }
                else if (currentAction.type === "condition"){
                    this.condition(cond, currentAction.actions)
                }
                else{
                    this[currentAction](this);
                    addState();
                }
            }
        }




    }
    for (var i = 0; i < exercice.functions.length; ++i) {
        var func = exercice.functions[i];
        func.code = func.code.replace(func.name + "()", func.name+"(grid)")
        grid[func.name] = createFunction(func.code);
    }
    for (var i = 0; i < exerciceData.solution.length; ++i){
        var currentAction = exerciceData.solution[i];
        if (currentAction.type === "boucle"){
            grid.boucle(currentAction.start,currentAction.end, currentAction.actions)
        }
        else if (currentAction.type === "condition"){
            grid.condition(cond, currentAction.actions)
        }
        else{
            grid[currentAction](grid);
            addState();
        }

    }
    var exerciceId = exerciceData.exercice.id;
    deleteUserExerciceSolutionAndroid(userId, exerciceId).then(function(rows){
        saveUserExerciceSolutionAndroid(userId, exerciceId, SqlString.escape(JSON.stringify(exerciceData.solution))).then(function(rows){
            return res.send(exerciceSteps);
        }).catch(function(err){
            return res.status(403).json(err);
        });
    }).catch(function(err){
        return res.status(403).json(err);
    });

});
router.post('/executeExerciceTest', AUTH.VERIFYAUTH,function(request, res, next) {
    // var exerciceData = JSON.parse(request.body.exercice);
    var exerciceData = {
        "exercice": {
            "id": 65,
            "title": "testpourrobin",
            "description": "",
            "isPublic": 0,
            "author_id": 4,
            "code": "// Initialization of the grid\r\nvar grid = createGrid(6, 20, 44);\r\n\r\n// Initialization of blocs\r\nvar block0 = createBlock(0, 6, 1, 10, 1, 41);\r\ngrid.addBlock(block0);\r\nvar block1 = createBlock(1, 6, 11, 10, 1, 41);\r\ngrid.addBlock(block1);\r\nvar block2 = createBlock(2, 3, 8, 1, 1, 39);\r\ngrid.addBlock(block2);\r\nvar block3 = createBlock(3, 3, 9, 1, 1, 43);\r\ngrid.addBlock(block3);\r\nvar block4 = createBlock(4, 3, 10, 1, 1, 39);\r\ngrid.addBlock(block4);\r\nvar block5 = createBlock(5, 3, 11, 1, 1, 43);\r\ngrid.addBlock(block5);\r\nvar block6 = createBlock(8, 2, 19, 1, 4, 50);\r\ngrid.addBlock(block6);\r\n\r\n// Initialization of mario\r\nvar pc0 = createPc(0, 5, 5, 1, 1, 42);\r\ngrid.addPc(pc0);\r\n\r\n// Initialization of enemy\r\nvar npc0 = createNpc(6, 5, 15, 1, 1, 40);\r\ngrid.addNpc(npc0);\r\n\r\n// Initialization of labels\r\nvar label0 = createLabel(0, 1, 18, 1, 1, 'score :');\r\ngrid.addLabel(label0);\r\nvar label1 = createLabel(1, 1, 19, 1, 1, '0');\r\ngrid.addLabel(label1);\r\n\r\n// Initialization of functions\r\nfunction avanceMarioDroite() {\r\n  var mario = this.grid.getPc(0);\r\n  mario.column = mario.column + 1;\r\n  // grid update\r\n  if(mario.row === 4) {\r\n    if(mario.column === this.grid.getNpc(6).column) {\r\n      this.grid.removeNpc(6);\r\n      var label = this.grid.getLabel(1);\r\n      label.text = (Number(label.text) + 1).toString();\r\n      // grid update\r\n    }\r\n    mario.row = 5;\r\n    // grid update\r\n  }\r\n  else {\r\n    if(mario.column === this.grid.getNpc(6).column) {\r\n      loose(); // appeller cette méthode robin ?\r\n    }\r\n  }\r\n  if(mario.column === this.grid.getBlock(8).column){\r\n    success(); // appeller cette méthode robin ?\r\n    // grid update\r\n  }\r\n}\r\n\r\nfunction marioSaute() {\r\n  var mario = this.grid.getPc(0);\r\n  \r\n  if(mario.row !== 5) {\r\n    loose(\"Mario ne peut pas faire de double saut !\");  // appeller cette méthode robin ?\r\n    // grid update\r\n  }\r\n  else {\r\n    mario.row = 4;\r\n    // grid update\r\n  }\r\n  \r\n  if(mario.column === this.grid.getBlock(3).column \r\n    || mario.column === this.grid.getBlock(5).column) {\r\n    var label = this.grid.getLabel(1);\r\n    label.text = (Number(label.text) + 1).toString();\r\n    // grid update\r\n  }\r\n}\r\n\r\nfunction marioRetombe() {\r\n  var mario = this.grid.getPc(0);\r\n  \r\n  if(mario.row !== 4) {\r\n    loose(\"Mario est déjà sur le sol !\");  // appeller cette méthode robin ?\r\n    // grid update\r\n  }\r\n  else {\r\n    mario.row = 5;\r\n    // grid update\r\n  }\r\n}\r\n\r\nfunction ennemiDevant() {\r\n  retu\r\n this.grid.getPc(0).column === this.grid.getNpc(6).column - 1;\r\n}\r\n\r\nfunction coffreAuDessus() {\r\n  var mario = this.grid.getPc(0);\r\n  retu\r\n mario.column === this.grid.getBlock(3).column ||\r\n    mario.column === this.grid.getBlock(5).column;\r\n}\r\n\r\nvar avance = createFunction(\"avanceMarioDroite\", \r\n  avanceMarioDroite, \r\n  \"permet d'avance mario de une case vers la droite\");\r\nvar saute = createFunction(\"marioSaute\",\r\n  marioSaute,\r\n  \"permet de faire sauter mario\");\r\nvar retombe = createFunction(\"marioRetombe\",\r\n  marioRetombe,\r\n  \"permet de faire retomber mario sur le sol\");\r\nvar ennemi = createFunction(\"ennemiDevant\",\r\n  ennemiDevant,\r\n  \"permet de savoir si un ennemi est devant\");\r\nvar coffre = createFunction(\"coffreAuDessus\",\r\n  coffreAuDessus,\r\n  \"permet de savoir si un coffre est au dessu\");\r\n  \r\ngrid.addFunction(avance);\r\ngrid.addFunction(saute);\r\ngrid.addFunction(retombe);\r\ngrid.addFunction(ennemi);\r\ngrid.addFunction(coffre);\r\n\r\n// Initialization of tests\r\nfunction marioSurDrapeau() {\r\n  if(this.grid.getPc(0).column === this.grid.getBlock(8).column) {\r\n    retu\r\n [true, \"mario est bien sur le drapeau\"];\r\n  }\r\n  else {\r\n    retu\r\n [false, \"mario n'est pas sur le drapeau\"];\r\n  }\r\n}\r\n\r\nfunction aTroisPoints() {\r\n  if(Number(this.grid.getLabel(1).text) === 3) {\r\n    retu\r\n [true, \"mario a bien 3 points\"];\r\n  }\r\n  else {\r\n    retu\r\n [false, \"mario n'a pas eu les 3 points\"];\r\n  }\r\n}\r\n\r\nfunction aTueLennemi() {\r\n  try {\r\n    this.grid.getNpc(6);\r\n    retu\r\n [false, \"l'ennemi n'est pas mort\"];\r\n  }\r\n  catch(error) {\r\n    retu\r\n [true, \"l'ennemi est bien mort\"];\r\n  }\r\n}\r\n\r\nvar drapeau = createFunction(\"marioSurDrapeau\", \r\n  marioSurDrapeau, \r\n  \"vérifie que mario a bien atteint le drapeau\");\r\nvar points = createFunction(\"aTroisPoints\", \r\n  aTroisPoints, \r\n  \"vérifie que mario a bien eu les 3 points\");\r\nvar ennemi = createFunction(\"aTueLennemi\", \r\n  aTueLennemi, \r\n  \"vérifie que mario a bien eu tué l'ennemi\");\r\n  \r\ngrid.addTest(drapeau);\r\ngrid.addTest(points);\r\ngrid.addTest(ennemi);",
            "blocks": [
                {
                    "id": 0,
                    "row": 6,
                    "column": 1,
                    "width": 10,
                    "height": 1,
                    "patternId": 41
                },
                {
                    "id": 1,
                    "row": 6,
                    "column": 11,
                    "width": 10,
                    "height": 1,
                    "patternId": 41
                },
                {
                    "id": 2,
                    "row": 3,
                    "column": 8,
                    "width": 1,
                    "height": 1,
                    "patternId": 39
                },
                {
                    "id": 3,
                    "row": 3,
                    "column": 9,
                    "width": 1,
                    "height": 1,
                    "patternId": 43
                },
                {
                    "id": 4,
                    "row": 3,
                    "column": 10,
                    "width": 1,
                    "height": 1,
                    "patternId": 39
                },
                {
                    "id": 5,
                    "row": 3,
                    "column": 11,
                    "width": 1,
                    "height": 1,
                    "patternId": 43
                },
                {
                    "id": 7,
                    "row": 3,
                    "column": 12,
                    "width": 1,
                    "height": 1,
                    "patternId": 39
                },
                {
                    "id": 8,
                    "row": 2,
                    "column": 19,
                    "width": 1,
                    "height": 4,
                    "patternId": 50
                }
            ],
            "columns": 20,
            "labels": [
                {
                    "id": 0,
                    "row": 1,
                    "column": 18,
                    "width": 1,
                    "height": 1,
                    "text": "score :"
                },
                {
                    "id": 1,
                    "row": 1,
                    "column": 19,
                    "width": 1,
                    "height": 1,
                    "text": "0"
                }
            ],
            "rows": 6,
            "npcs": [
                {
                    "id": 6,
                    "row": 5,
                    "column": 15,
                    "width": 1,
                    "height": 1,
                    "patternId": 40
                }
            ],
            "patternId": 44,
            "pcs": [
                {
                    "id": 0,
                    "row": 5,
                    "column": 5,
                    "width": 1,
                    "height": 1,
                    "patternId": 42
                }
            ],
            "functions": [
                {
                    "id": 48,
                    "exercice_id": 65,
                    "code": "function avanceMarioDroite() {\n" +
                        "  var mario = grid.getPc(0);\n" +
                        "  mario.column = mario.column + 1;\n" +
                        "  // grid update\n" +
                        "  if(mario.row === 4) {\n" +
                        "    if(mario.column === grid.getNpc(6).column) {\n" +
                        "      grid.removeNpc(6);\n" +
                        "      var label = grid.getLabel(1);\n" +
                        "      label.text = (Number(label.text) + 1).toString();\n" +
                        "      addState()\n" +
                        "    }\n" +
                        "    mario.row = 5;\n" +
                        "    addState();\n" +
                        "  }\n" +
                        "  else {\n" +
                        "    if(mario.column === grid.getNpc(6).column) {\n" +
                        "      console.log('perdu'); // appeller cette méthode robin ?\n" +
                        "    }\n" +
                        "  }\n" +
                        "  if(mario.column === grid.getBlock(8).column){\n" +
                        "    console.log('gagné'); // appeller cette méthode robin ?\n" +
                        "    addState();\n" +
                        "  }\n" +
                        "}",
                    "name": "avanceMarioDroite",
                    "description": "permet d'avance mario de une case vers la droite"
                },
                {
                    "id": 52,
                    "exercice_id": 65,
                    "code": "function coffreAuDessus() {\r\n  var mario = this.grid.getPc(0);\r\n  retu\r\n mario.column === this.grid.getBlock(3).column ||\r\n    mario.column === this.grid.getBlock(5).column;\r\n}",
                    "name": "coffreAuDessus",
                    "description": "permet de savoir si un coffre est au dessu"
                },
                {
                    "id": 51,
                    "exercice_id": 65,
                    "code": "function ennemiDevant() {\r\n  retu\r\n this.grid.getPc(0).column === this.grid.getNpc(6).column - 1;\r\n}",
                    "name": "ennemiDevant",
                    "description": "permet de savoir si un ennemi est devant"
                },
                {
                    "id": 50,
                    "exercice_id": 65,
                    "code": "function marioRetombe() {\r\n  var mario = this.grid.getPc(0);\r\n  \r\n  if(mario.row !== 4) {\r\n    loose(\"Mario est déjà sur le sol !\");  // appeller cette méthode robin ?\r\n    // grid update\r\n  }\r\n  else {\r\n    mario.row = 5;\r\n    // grid update\r\n  }\r\n}",
                    "name": "marioRetombe",
                    "description": "permet de faire retomber mario sur le sol"
                },
                {
                    "id": 49,
                    "exercice_id": 65,
                    "code": "function marioSaute() {\r\n  var mario = this.getPc(0);\r\n  \r\n  if(mario.row !== 5) {\r\n    loose(\"Mario ne peut pas faire de double saut !\");  // appeller cette méthode robin ?\r\n    // grid update\r\n  }\r\n  else {\r\n    mario.row = 4;\r\n    // grid update\r\n  }\r\n  \r\n  if(mario.column === this.grid.getBlock(3).column \r\n    || mario.column === this.grid.getBlock(5).column) {\r\n    var label = this.grid.getLabel(1);\r\n    label.text = (Number(label.text) + 1).toString();\r\n    // grid update\r\n  }\r\n}",
                    "name": "marioSaute",
                    "description": "permet de faire sauter mario"
                }
            ],
            "fichiers": [
                {
                    "id": 39,
                    "name": "brick.png",
                    "sender": 4,
                    "exercice_id": 65,
                    "file_id": 39,
                    "url": "212.47.235.40:3000/fya5AUFw5fruRY86aQ4fs6y55VZolH_brick.png"
                },
                {
                    "id": 40,
                    "name": "goomba.gif",
                    "sender": 4,
                    "exercice_id": 65,
                    "file_id": 40,
                    "url": "212.47.235.40:3000/PWHDvViqdliZxJtIRPyGaotWiJ46w8_goomba.gif"
                },
                {
                    "id": 41,
                    "name": "ground.png",
                    "sender": 4,
                    "exercice_id": 65,
                    "file_id": 41,
                    "url": "212.47.235.40:3000/jr1tUmUUUSL88bE1lfDWpZcrS9UyQj_ground.png"
                },
                {
                    "id": 42,
                    "name": "mario.png",
                    "sender": 4,
                    "exercice_id": 65,
                    "file_id": 42,
                    "url": "212.47.235.40:3000/x2lFKpRJxBgZzVtzedqq3q7DALj7DT_mario.png"
                },
                {
                    "id": 43,
                    "name": "surprise.jpg",
                    "sender": 4,
                    "exercice_id": 65,
                    "file_id": 43,
                    "url": "212.47.235.40:3000/vStBIPGF9oPLLoJdg2TVdH9bhIElJW_surprise.jpg"
                },
                {
                    "id": 44,
                    "name": "sky.png",
                    "sender": 4,
                    "exercice_id": 65,
                    "file_id": 44,
                    "url": "212.47.235.40:3000/bpDxnu3Yj8nSqFiAl8Ev07FYs0Z1bQ_sky.png"
                },
                {
                    "id": 50,
                    "name": "drapeau.png",
                    "sender": 4,
                    "exercice_id": 65,
                    "file_id": 50,
                    "url": "212.47.235.40:3000/1xEyo3P17PALdOe9UlATwAszDz7Bdd_drapeau.png"
                }
            ],
            "tests": [
                {
                    "id": 10,
                    "exercice_id": 65,
                    "code": "function marioSurDrapeau() {\r\n  if(this.grid.getPc(0).column === this.grid.getBlock(8).column) {\r\n    retu\r\n [true, \"mario est bien sur le drapeau\"];\r\n  }\r\n  else {\r\n    retu\r\n [false, \"mario n'est pas sur le drapeau\"];\r\n  }\r\n}",
                    "name": "marioSurDrapeau",
                    "description": "vérifie que mario a bien atteint le drapeau"
                },
                {
                    "id": 11,
                    "exercice_id": 65,
                    "code": "function aTroisPoints() {\r\n  if(Number(this.grid.getLabel(1).text) === 3) {\r\n    retu\r\n [true, \"mario a bien 3 points\"];\r\n  }\r\n  else {\r\n    retu\r\n [false, \"mario n'a pas eu les 3 points\"];\r\n  }\r\n}",
                    "name": "aTroisPoints",
                    "description": "vérifie que mario a bien eu les 3 points"
                },
                {
                    "id": 12,
                    "exercice_id": 65,
                    "code": "function aTueLennemi() {\r\n  try {\r\n    this.grid.getNpc(6);\r\n    retu\r\n [false, \"l'ennemi n'est pas mort\"];\r\n  }\r\n  catch(error) {\r\n    retu\r\n [true, \"l'ennemi est bien mort\"];\r\n  }\r\n}",
                    "name": "aTueLennemi",
                    "description": "vérifie que mario a bien eu tué l'ennemi"
                }
            ]
        },
        // "solution": "avanceMarioDroite();boucle(0,4, \"avanceMarioDroite()|avanceMarioDroite()|\");avanceMarioDroite();"
        "solution": [
            "avanceMarioDroite",
            {
                "type":"boucle",
                "start":0,
                "end":4,
                "actions":[
                    "avanceMarioDroite",
                    {
                        "type":"boucle",
                        "start":0,
                        "end":2,
                        "actions":[
                            "avanceMarioDroite"
                        ]
                    }
                ]
            }
        ]
    }
    var exercice = exerciceData.exercice;
    var grid = instanciateGrid(exercice);
    var exerciceSteps = [];
    // exerciceSteps.push(grid)
    var addState = function(){
        console.log("addState")
        exerciceSteps.push(JSON.parse(JSON.stringify(grid)))
    }
    addState();
    grid["boucle"] = function(start, end, actions){
        for (var w = start; w < end; ++w){
            for (var i = 0; i < actions.length; ++i){
                var currentAction = actions[i];
                if (currentAction.type === "boucle"){
                    this.boucle(currentAction.start,currentAction.end, currentAction.actions)
                }
                else if (currentAction.type === "condition"){
                    this.condition(cond, currentAction.actions)
                }
                else{
                    this[currentAction](this);
                    addState();
                }

            }
        }


    }
    grid["condition"] = function(cond, actions){
       if (this[cond] && this[cond](this)){
           for (var i = 0; i < actions.length; ++i){
               var currentAction = actions[i];
               if (currentAction.type === "boucle"){
                   this.boucle(currentAction.start,currentAction.end, currentAction.actions)
               }
               else if (currentAction.type === "condition"){
                   this.condition(cond, currentAction.actions)
               }
               else{
                   this[currentAction](this);
                   addState();
               }
           }
       }




    }
    for (var i = 0; i < exercice.functions.length; ++i) {
        var func = exercice.functions[i];
        func.code = func.code.replace(func.name + "()", func.name+"(grid)")
        grid[func.name] = createFunction(func.code);
    }
    for (var i = 0; i < exerciceData.solution.length; ++i){
        var currentAction = exerciceData.solution[i];
        if (currentAction.type === "boucle"){
            grid.boucle(currentAction.start,currentAction.end, currentAction.actions)
        }
        else if (currentAction.type === "condition"){
            grid.condition(cond, currentAction.actions)
        }
        else{
            grid[currentAction](grid);
            addState();
        }

    }
    return res.send(exerciceSteps);
});
var escapeQuote1 = function(str){

    var find = "'";
    var re = new RegExp(find, 'g');
    str = str.replace(re, "''")
    find = '"';
    re = new RegExp(find, 'g');
    find = "\\\\";
    re = new RegExp(find, 'g');
    str = str.replace(re, "\\")
    return str.replace(re, "''")
}
function rmendOfLine (str) {
    return str.replace(/[\n\r]/g, function (char) {
        switch (char) {
            case "\n":
                return "";
            case "\r":
                return "";

        }
    });
}
router.post('/add', AUTH.VERIFYAUTH,function(request, res, next) {
    var contentOjb =JSON.parse(request.body.exercice);
    var author_id = request.decoded.id


    function insertExercice(contentOjb,author_id) {
        return new Promise(function(resolve, reject) {

            var sql = "insert into exercices(title,description,isPublic,author_id,code,blocks,columns,labels,rows,npcs,patternId,pcs,grid) values (?)"
            var values = [];
            values.push(SqlString.escape(contentOjb.title),SqlString.escape(contentOjb.text),contentOjb.public,author_id,SqlString.escape(contentOjb.code),SqlString.escape(JSON.stringify(contentOjb.blocks)), contentOjb.columns)
            values.push(SqlString.escape(JSON.stringify(contentOjb.labels)), contentOjb.lines, SqlString.escape(JSON.stringify(contentOjb.npcs)), contentOjb.patternId, SqlString.escape(JSON.stringify(contentOjb.pcs)),SqlString.escape(JSON.stringify(contentOjb.gridObject)))
            console.log(sql)
            con.query(sql, [values], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });

        });
    }

    insertExercice(contentOjb,author_id).then(function(rows){
            insertExerciceFunctions(contentOjb.functions,rows.insertId).then(function(rows1){
                insertExerciceTests(contentOjb.tests,rows.insertId).then(function(rows2){
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
function deleteExerciceTests(exo_id) {
    return new Promise(function(resolve, reject) {
        var sql = "delete from exercice_tests where exercice_id='"+exo_id+"';"
        console.log(sql)
        con.query(sql, function (err, rows, fields) {
            if (err) return reject(err);
            resolve(rows);
        });

    });
}
router.post('/deleteFromClass/:exerciceId/:classId', AUTH.VERIFYAUTH, AUTH.isProfessorOrStudentInThisClassRoom,function(request, res, next) {
    var exerciceId = request.params.exerciceId;
    var classId = request.params.classId;
    deleteExerciceFromClass(exerciceId,classId).then(function(rows){
        res.send(rows)
    }).catch(function (err) {
        return res.status(403).json(err);
    });
})
router.post('/modify/:exerciceId', AUTH.VERIFYAUTH,function(request, res, next) {
    var contentOjb =JSON.parse(request.body.exercice);
    var author_id = request.decoded.id
    var exo_id = request.params.exerciceId
    // console.log(contentOjb)


    function modifyExercice(exo_id,contentOjb,author_id) {
        return new Promise(function(resolve, reject) {
            // var values = [];
            // values.push(SqlString.escape(contentOjb.title),SqlString.escape(contentOjb.text),contentOjb.public,SqlString.escape(contentOjb.code),SqlString.escape(JSON.stringify(contentOjb.blocks)), contentOjb.columns)
            // values.push(SqlString.escape(JSON.stringify(contentOjb.labels)), contentOjb.lines, SqlString.escape(JSON.stringify(contentOjb.npcs)), contentOjb.patternId, SqlString.escape(JSON.stringify(contentOjb.pcs)))
            // var sql = "update exercices set title = ?, description = ?, isPublic = ?, code = ?, blocks = ?, columns = ?, " +
            //     "labels = ?, lines = ?, npcs = ?, patternId = ?, pcs = ? "
            // sql+="where id='"+exo_id+"' and author_id='"+author_id+"';"
            var sql = "insert into exercices(id,title,description,isPublic,author_id,code,blocks,columns,labels,rows,npcs,patternId,pcs,grid) values (?)"
            var values = [];
            values.push(exo_id,SqlString.escape(contentOjb.title),SqlString.escape(contentOjb.text),contentOjb.public,author_id,SqlString.escape(contentOjb.code),SqlString.escape(JSON.stringify(contentOjb.blocks)), contentOjb.columns)
            values.push(SqlString.escape(JSON.stringify(contentOjb.labels)), contentOjb.lines, SqlString.escape(JSON.stringify(contentOjb.npcs)), contentOjb.patternId, SqlString.escape(JSON.stringify(contentOjb.pcs)),SqlString.escape(JSON.stringify(contentOjb.gridObject)))
            // console.log(sql)
            con.query(sql, [values], function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });

        });
    }

    deleteExercice(exo_id,author_id).then(function(r){
        modifyExercice(exo_id,contentOjb,author_id).then(function(rows){

            deleteExerciceTests(exo_id).then(function(rowst) {
                deleteExerciceFunctions(exo_id).then(function (rowsf) {
                    // console.log(rows)

                    insertExerciceFunctions(contentOjb.functions, exo_id).then(function (rows1) {
                        insertExerciceTests(contentOjb.tests, exo_id).then(function (rows1) {
                            res.send(rows);
                        }).catch(function (err) {
                            return res.status(403).json(err);
                        });
                    }).catch(function (err) {
                        return res.status(403).json(err);
                    });
                }).catch(function (err) {
                    return res.status(403).json(err);
                });
            }).catch(function (err) {
                return res.status(403).json(err);
            });
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



    function deleteUserExercice(exo_id) {
        return new Promise(function(resolve, reject) {
            var sql = "delete from user_exercices where exerciceId = ?"
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
                message: 'Cet exercice ne vous appartient pas!'
            })
        deleteUserExercice(exo_id).then(function(rowsUserExercice){
            deleteClassExercice(exo_id).then(function(rowsClassExercice){
                deleteExerciceFunction(exo_id).then(function(rowsDeleteF){
                    deleteExerciceTests(exo_id).then(function(rowsDeleteT){
                        res.send(rowsExercice);
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
    }).catch(function(err){
        return res.status(403).json(err);
    });


});



module.exports = router;
