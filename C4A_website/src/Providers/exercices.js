import Axios from 'axios';
import qs from 'qs';
import consts from '../Providers/consts'
import files from '../Providers/files';


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
            return cb(response);
        }).catch(error => {
            alert(JSON.stringify(error));
        });
    }

    extractPatternsFromArray(array, patterns) {
        array.map((element) => {
            if(element.patternId != null && element.patternId != undefined && !patterns.includes(element.patternId)) {
                patterns.push(element.patternId);
            }
        });
    }

    extractPatterns(exercice) {
        var patterns = [];
        if(exercice.patternId != null && exercice.patternId != undefined) {
            patterns.push(exercice.patternId);
        }
        this.extractPatternsFromArray(exercice.blocks, patterns);
        this.extractPatternsFromArray(exercice.npcs, patterns);
        this.extractPatternsFromArray(exercice.pcs, patterns)
        return patterns;
    }

    createExercice(exercice) {
        var patterns = this.extractPatterns(exercice);

        let data = {'exercice': JSON.stringify(exercice)};

        console.log(data);
    
        Axios.post(consts.url() + 'exercices/add', qs.stringify(data),
        {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.sessionToken
            }
        })
          .then(function (response) {
            patterns.list.map((pattern) => {
                files.uploadFileToUser(response.insertId, pattern);
            });
            window.location.href = "/exercices";
          })
          .catch(function (error) {
            console.log(error);
            alert(JSON.stringify(error.response));
          });
    }

    modifyExercice(exercice, id) {
        let data = {'exercice': JSON.stringify(exercice)};
    
        Axios.post(consts.url() + 'exercices/modify/' + id, qs.stringify(data),
        {
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
}

export default new Exercices();