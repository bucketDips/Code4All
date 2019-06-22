import Axios from 'axios';

class Exercices {
    async getMines() {
        var headers = {
            'Authorization': 'Bearer ' +  localStorage.sessionToken
        }

        return Axios.get("http://212.47.235.40:3000/exercices/getUserExercices", {headers: headers}).then(response => {
            return response;
        }).catch(error => {
            console.log(JSON.stringify(error));
        });
    }
}

export default new Exercices();