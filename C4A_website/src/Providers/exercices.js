import Axios from 'axios';
import qs from 'qs';

class Exercices {
    async getMines() {
        var headers = {
            'Authorization': 'Bearer ' +  localStorage.sessionToken
        }

        return Axios.get("http://212.47.235.40:3000/exercices/getUserExercices", {headers: headers}).then(response => {
            return response;
        }).catch(error => {
            alert(JSON.stringify(error));
        });
    }

    createExercice(exercice) {
        let data = {'exercice': JSON.stringify(exercice)};
    
        Axios.post('http://212.47.235.40:3000/exercices/add', qs.stringify(data),
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
}

export default new Exercices();