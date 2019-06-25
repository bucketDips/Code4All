import Axios from 'axios';
import consts from '../Providers/consts'

class Persons {
    async getUsersForName(name) {
        var headers = {
            'Authorization': 'Bearer ' +  localStorage.sessionToken
        }

        return Axios.get(consts.url() + "users/findUser/" + name, {headers: headers}).then(users => {
            return users.data;
        }).catch(error => {
            alert(JSON.stringify(error));
        });
    }
}

export default new Persons();
