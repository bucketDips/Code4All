import Axios from 'axios';
import qs from 'qs';
import { Input } from 'antd';
import consts from '../Providers/consts'
import files from '../Providers/files';

const Search = Input.Search;



class Exercices {
    async getMines() {
        var headers = {
            'Authorization': 'Bearer ' +  localStorage.sessionToken
        }

        return Axios.get(consts.url() + "exercices/getUserExercices", {headers: headers}).then(response => {
            return response;
        }).catch(error => {
            alert(JSON.stringify(error));
        });
    }

    getMyExercice(id, cb) {
        var headers = {
            'Authorization': 'Bearer ' +  localStorage.sessionToken
        }

        return Axios.get(consts.url() + "exercices/getExercice/" + id, {headers: headers}).then(response => {
            if(cb) {
                return cb(response);
            }
            else {
                return response;
            }
        }).catch(error => {
            alert(JSON.stringify(error));
        });
    }

    extractPatternsFromArray(array, patterns) {
        var newElements = array.map((element) => {
            if(element.patternId !== null && element.patternId !== undefined && !patterns.includes(element.patternId)) {
                patterns.push(element.patternId);
            }
            return element;
        });
    }

    extractPatternsFromCode(code, patterns) {
        var matches = code.match(/changePattern\(\d+\)/g);
        if(matches === null) {
            return;
          }
        for(var i = 0; i < matches.length; i++) {
            var id = Number(matches[i].split("(")[1].split(")")[0]);
            if(!patterns.includes(id)) {
                patterns.push(id);
            }
        }
    }

    extractPatterns(exercice) {
        var patterns = [];
        if(exercice.patternId !== null && exercice.patternId !== undefined) {
            patterns.push(exercice.patternId);
        }
        this.extractPatternsFromArray(exercice.blocks, patterns);
        this.extractPatternsFromArray(exercice.npcs, patterns);
        this.extractPatternsFromArray(exercice.pcs, patterns);
        this.extractPatternsFromCode(exercice.code, patterns);
        return patterns;
    }

    async createExercice(exercice) {
        var patterns = this.extractPatterns(exercice);

        let data = {'exercice': JSON.stringify(exercice)};

        Axios.post(consts.url() + 'exercices/add', qs.stringify(data),
        {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.sessionToken
            }
        })
          .then(async function (response) {
            await Promise.all(patterns.map(item => files.uploadFileToExo(response.data.insertId, item)));
            window.location.href = "/exercices";
          })
          .catch(function (error) {
            alert(JSON.stringify(error.response));
          });
    }

    async modifyExercice(exercice, id) {
        var patterns = this.extractPatterns(exercice);

        let data = {'exercice': JSON.stringify(exercice)};
    
        Axios.post(consts.url() + 'exercices/modify/' + id, qs.stringify(data),
        {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.sessionToken
            }
        })
          .then(async function (response) {
            await Promise.all(patterns.map(item => files.uploadFileToExo(response.data.insertId, item)));
            window.location.href = "/exercices";
          })
          .catch(function (error) {
            alert(JSON.stringify(error.response));
          });
    }

    deleteExercice(id) {
        Axios.post(consts.url() + 'exercices/delete/' + id, {}, {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.sessionToken
            }
        })
        .then(function (response) {
            window.location.href = "/exercices";
          })
        .catch(function (error) {
            alert(JSON.stringify(error.response));
        });
    }

    async getFromStore() {
        var headers = {
            'Authorization': 'Bearer ' +  localStorage.sessionToken
        }

        return Axios.get(consts.url() + "exercices/getAllStoreExercicesNotOwned", {headers: headers}).then(response => {
            return response.data;
        }).catch(error => {
            alert(JSON.stringify(error));
        });
    }

    deleteExerciceFromClass(idClass, idExercice, cb) {
        Axios.post(consts.url() + 'exercices/deleteFromClass/' + idExercice + '/' + idClass, {},
        {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.sessionToken
            }
        })
        .then(function (response) {
            cb();
        })
        .catch(function (error) {
            alert(JSON.stringify(error.response));
        });
    }

    async addExercicesToClass(idClass, exercices, cb) {
        for(var i = 0; i < exercices.length; i++) {
            await Axios.post(consts.url() + 'exercices/addExerciceToClass/' + exercices[i].id + '/' + idClass, {},
            {
                headers: {
                    'Authorization': 'Bearer ' +  localStorage.sessionToken
                }
            })
            .then(function (response) {
            })
            .catch(function (error) {
                alert(JSON.stringify(error.response))
            });
        }
        cb();
    }

    addExercicesToUser(id, cb) {
        Axios.post(consts.url() + 'exercices/addExerciceToUser/' + id, {},
        {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.sessionToken
            }
        })
        .then(function (response) {
            cb();
        })
        .catch(function (error) {
            console.log(error);
            alert(JSON.stringify(error.response));
        });
    }

    removeExerciceFromUser(id) {
        Axios.post(consts.url() + 'exercices/removeExerciceFromUser/' + id, {},
        {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.sessionToken
            }
        })
        .then(function (response) {
            window.location.href = "/exercices";
        })
        .catch(function (error) {
            console.log(error);
            alert(JSON.stringify(error.response));
        });
    }

    setNewCodeForExercice(idExo, code){
        let data = {'solution': code};

        Axios.post(consts.url() + 'exercices/saveUserExerciceSolutionWeb/' + idExo, qs.stringify(data),
        {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.sessionToken
            }
        })
        .then(function (response) {
        })
        .catch(function (error) {
            alert(JSON.stringify(error.response));
        });
    }

    getCodeForExercice(idExo, cb) {
        var headers = {
            'Authorization': 'Bearer ' +  localStorage.sessionToken
        }

        Axios.get(consts.url() + "exercices/getUserExerciceSolutionWeb/" + idExo, {headers: headers}).then(response => {
            if(response.data.length > 0){
                this.getUserPassedTestsForExercice(idExo, response.data[0].solution, cb);
                return;
            }
            this.getUserPassedTestsForExercice(idExo, "", cb);
        }).catch(error => {
            alert(JSON.stringify(error));
        });
    }

    getUserPassedTestsForExercice(idExo, code, cb) {
        var headers = {
            'Authorization': 'Bearer ' +  localStorage.sessionToken
        }

        Axios.get(consts.url() + "exercices/getUserPassedTests/" + idExo, {headers: headers}).then(response => {
            if(response.data) {
                cb(code, response.data);
            }
            else {
                cb(code, null);
            }
            
        }).catch(error => {
            console.log(error);
            alert(JSON.stringify(error));
        });
    }

    uploadTestsForExercice(idExo, testArray) {
        if(testArray.length === 0) return;
        let data = {'tests': JSON.stringify(testArray)};

        Axios.post(consts.url() + 'exercices/addSuccessTest/' + idExo, qs.stringify(data),
        {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.sessionToken
            }
        })
        .then(function (response) {
        })
        .catch(function (error) {
            alert(JSON.stringify(error.response));
        });
    }
}

export default new Exercices();