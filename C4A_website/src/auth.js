class Auth {
    login(cb) {
        // ici call de l'api, récupération token
        localStorage.sessionToken = "temporary";
        cb();
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
}

export default new Auth();