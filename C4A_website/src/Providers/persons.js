import Axios from 'axios';
import consts from '../Providers/consts'

/**
 * correspond the requested of API for the "users/" routes but not auth
 */
class Persons {
    
    /**
     * get users that email or name correspond to the name
     */
    async getUsersForName(name) {
        var headers = {
            'Authorization': 'Bearer ' +  localStorage.sessionToken
        }

        return Axios.get(consts.url() + "users/findUser/" + name, {headers: headers}).then(users => {
            return users.data;
        }).catch(error => {
            consts.errorDatabaseMessage(error);
        });
    }
}

export default new Persons();
