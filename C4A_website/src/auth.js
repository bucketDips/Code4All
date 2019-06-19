import Axios from 'axios';

class Auth {
    login(email, password) {
        console.log(email);
        Axios.get("http://212.47.235.40:3000/users/connect/" + email + "/" + password).then(response => {
            if(response.data.success) {
                console.log("pipou");
                localStorage.sessionToken = response.data.token;
                alert(response.data.message);
                window.location.href = "/";
            }
        }).catch(error => {
            console.log(error);
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