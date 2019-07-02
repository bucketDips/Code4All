import Axios from 'axios';
import consts from '../Providers/consts'

/**
 * correspond the requested of API for the "users/" routes
 */
class Auth {

    /**
     * login user
     */
    login(email, password) {
        Axios.get(consts.url() + "users/connect/" + email + "/" + password).then(response => {
            if(response.data.success) {
                localStorage.sessionToken = response.data.token;
                window.location.href = "/";
            }
        }).catch(error => {
            consts.errorDatabaseMessage(error);
        });
    }

    /**
     * logout user
     */
    logout(cb) {
        localStorage.removeItem("sessionToken");
        cb();
    }

    /**
     * true if logged, otherwise false
     */
    isAuthenticated() {
        return (localStorage.sessionToken != null);
    }

    /**
     * get token of session
     */
    getSessionToken() {
        return localStorage.sessionToken;
    }

    /**
     * sign in user
     */
    inscription(user, password, mail) {
        Axios.get(consts.url() + "users/create/" + user + "/" + password + "/" + mail).then(response => {
            if(response && response.data && response.data.success) {
                window.location.href = "/";
            }
            else {
                consts.errorDatabaseMessage("Erreur lors de l'inscription : " + JSON.stringify(response.data));
            }
        }).catch(error => {
            consts.errorDatabaseMessage(error);
        });
    }
}

export default new Auth();