var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');
var con = require('./connexionDatabase.js');
var jwt = require('jsonwebtoken');
var config = require("./config");
var AUTH = require('./AUTHENTIFICATION')
var gEval =eval;
var sEval = require('safe-eval');
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
router.get('/getExercice/:id', function(request, res, next) {
    var id = request.params.id;
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
    getExercice(id).then(function(rows){
        getFunctions(id).then(function(rows1){
            var resultJson = {
                exercice: rows[0],
                functions: rows1
            }
            res.send(resultJson);
        })
    })
});
var getFuncName = function(str){
    return str.substring(0,str.indexOf('('))
}
router.post('/executeExercice', function(request, res, next) {
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
var escapeQuote = function(str){
    return str.replace("'", "''")
}
router.post('/add/:title', function(request, res, next) {
    var title = request.params.title;
    var text = "toto"
    var public = 1;
    var author_id=1;
    // var contentOjb = {"lines":6,"columns":20,"patternId":8,"blocks":[{"id":0,"row":6,"column":1,"width":10,"height":1,"patternId":8},{"id":1,"row":6,"column":11,"width":10,"height":1,"patternId":8},{"id":2,"row":3,"column":8,"width":1,"height":1,"patternId":4},{"id":3,"row":3,"column":9,"width":1,"height":1,"patternId":3},{"id":4,"row":3,"column":10,"width":1,"height":1,"patternId":4},{"id":5,"row":3,"column":11,"width":1,"height":1,"patternId":3}],"npcs":[{"id":0,"row":5,"column":15,"width":1,"height":1,"patternId":6}],"pcs":[{"id":0,"row":5,"column":5,"width":1,"height":1,"patternId":2,"functions":[{"name":"i","code":"function oki() {\r\n  return \"A\";\r\n}","description":"o"}]}],"labels":[]}
    // var contentOjb = {"lines":6,"columns":20,"patternId":8,"blocks":[{"id":0,"row":6,"column":1,"width":10,"height":1,"patternId":8},{"id":1,"row":6,"column":11,"width":10,"height":1,"patternId":8},{"id":2,"row":3,"column":8,"width":1,"height":1,"patternId":4},{"id":3,"row":3,"column":9,"width":1,"height":1,"patternId":3},{"id":4,"row":3,"column":10,"width":1,"height":1,"patternId":4},{"id":5,"row":3,"column":11,"width":1,"height":1,"patternId":3}],"npcs":[{"id":0,"row":5,"column":15,"width":1,"height":1,"patternId":6}],"pcs":[{"id":0,"row":5,"column":5,"width":1,"height":1,"patternId":2,"functions":[{"name":"couille","code":"function couille() {\r\n  console.log(\"c'est une belle couille\");\r\n}","description":"ma couille"}]}],"labels":[]}
    var contentOjb =JSON.parse(request.body.exercice);
    // console.log(request)
    var content = JSON.stringify(contentOjb)
    console.log("contentOjb")
    console.log(contentOjb.pcs)
    console.log("contentOjb")
    // console.log(content)
    // console.log("content")
    function insertExercice(title,text,public,content, author_id) {
        return new Promise(function(resolve, reject) {
            title = escapeQuote(title)
            text = escapeQuote(text)
            content = escapeQuote(content)
            var sql = "insert into exercices(title,text,isPublic,content, author_id)"
            sql += "values('"+title+"','"+text+"','"+public+"','"+content+"','"+author_id+"')"+";";
            console.log(sql)
            con.query(sql, function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });

        });
    }
    function insertExerciceFunctions(functions, exercice_id) {
        return new Promise(function(resolve, reject) {
            var reccords = [];
            for (var i = 0; i < functions.length; ++i){
                reccords.push([exercice_id, functions[i].code,functions[i].name + "()"])
            }
            console.log(reccords)
            var sql = "INSERT INTO exercice_functions (exercice_id, code, name) VALUES ?"
            con.query(sql, [reccords],function (err, rows, fields) {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    insertExercice(title,text,public,content, author_id).then(function(rows){
        insertExerciceFunctions(contentOjb.pcs[0].functions,rows.insertId).then(function(rows){
            res.send(rows);
        });
    });


});



module.exports = router;