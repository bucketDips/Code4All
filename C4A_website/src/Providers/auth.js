import Axios from 'axios';

class Auth {
    login(email, password) {
        Axios.get("http://212.47.235.40:3000/users/connect/" + email + "/" + password).then(response => {
            if(response.data.success) {
                localStorage.sessionToken = response.data.token;
                window.location.href = "/";
            }
        }).catch(error => {
            alert(error.response.data.message);
        });
    }

    logout(cb) {
        localStorage.removeItem("sessionToken");
        cb();
    }

    isAuthenticated() {
        return (localStorage.sessionToken != null);
    }

    getSessionToken() {
        return localStorage.sessionToken;
    }

    inscription(user, password, mail) {
        Axios.get("http://212.47.235.40:3000/users/create/" + user + "/" + password + "/" + mail).then(response => {
            if(response.success) {
                window.location.href = "/login";
            }
            else {
                alert("Erreur lors de l'inscription : " + response.data);
            }
        });
    }
}

export default new Auth();