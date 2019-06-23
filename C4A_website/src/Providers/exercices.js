import Axios from 'axios';
import qs from 'qs';
import consts from '../Providers/consts'


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

    createExercice(exercice) {
        let data = {'exercice': JSON.stringify(exercice)};
    
        Axios.post(consts.url() + 'exercices/add', qs.stringify(data),
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