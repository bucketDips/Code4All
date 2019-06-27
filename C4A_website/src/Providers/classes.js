import Axios from 'axios';
import consts from '../Providers/consts'

class Classes {
    async getMines() {
        var headers = {
            'Authorization': 'Bearer ' +  localStorage.sessionToken
        }

        return Axios.get(consts.url() + "classes/getProfessorClassesById", {headers: headers}).then(professorClasses => {
            return Axios.get(consts.url() + "classes/getStudentClassesById", {headers: headers}).then(studentClasses => {
                return {
                    student: studentClasses.data,
                    professor: professorClasses.data
                }
            }).catch(error => {
                alert(JSON.stringify(error));
            });
        }).catch(error => {
            alert(JSON.stringify(error));
        });
    }

    getExercices() {
        var headers = {
            'Authorization': 'Bearer ' +  localStorage.sessionToken
        }

        return Axios.get(consts.url() + "exercices/getUserExercices", {headers: headers}).then(response => {
            return response.data.perso;
        }).catch(error => {
            alert(JSON.stringify(error));
        });
    }

    deleteExerciceFrom(idClass, idExercice, cb) {
        cb();
        return "ok";
    }

    createClass(name) {
        Axios.post(consts.url() + 'classes/createClassroom/' + name, {},
        {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.sessionToken
            }
        })
        .then(function (response) {
            window.location.href = "/classes";
        })
        .catch(function (error) {
        alert(JSON.stringify(error.response));
        });
    }

    async getClassInfo(id) {
        var headers = {
            'Authorization': 'Bearer ' +  localStorage.sessionToken
        }

        return Axios.get(consts.url() + "classes/getClassDetail/" + id, {headers: headers}).then(response => {
            return response.data;
        }).catch(error => {
            alert(JSON.stringify(error));
        });
    }

    async addStudentToClass(idPerson, idClass) {
        return await Axios.post(consts.url() + 'classes/addStudentToClass/' + idPerson + '/' + idClass, {},
        {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.sessionToken
            }
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            alert(JSON.stringify(error.response));
        });
    }

    async addProfessorToClass(idPerson, idClass) {
        return await Axios.post(consts.url() + 'classes/addProfessorToClass/' + idPerson + '/' + idClass, {},
        {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.sessionToken
            }
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            alert(JSON.stringify(error.response));
        });
    }

    deleteProfessorFromClass(idPerson, idClass, cb) {
        Axios.post(consts.url() + 'classes/removeProfessorFromClass/' + idPerson + '/' + idClass, {},
        {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.sessionToken
            }
        })
        .then(function (response) {
            cb();
        })
        .catch(function (error) {
            if(error.response.data.message)
                alert(error.response.data.message);
            else
                alert("une erreur est survenue");
        });
    }

    deleteStudentFromClass(idPerson, idClass, cb) {
        Axios.post(consts.url() + 'classes/removeStudentFromClass/' + idPerson + '/' + idClass, {},
        {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.sessionToken
            }
        })
        .then(function (response) {
            cb();
        })
        .catch(function (error) {
            if(error.response.data.message)
                alert(error.response.data.message);
            else
                alert("une erreur est survenue");
        });
    }

    
}

export default new Classes();