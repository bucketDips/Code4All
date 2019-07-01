import Axios from 'axios';
import consts from '../Providers/consts'

/**
 * correspond the requested of API for the "classes/" routes
 */
class Classes {

    /**
     * get my classes (as prof or as user)
     */
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
                consts.errorDatabaseMessage(error);
            });
        }).catch(error => {
            consts.errorDatabaseMessage(error);
        });
    }

    /**
     * get my exercices
     */
    getExercices() {
        var headers = {
            'Authorization': 'Bearer ' +  localStorage.sessionToken
        }

        return Axios.get(consts.url() + "exercices/getUserExercices", {headers: headers}).then(response => {
            return response.data.perso;
        }).catch(error => {
            consts.errorDatabaseMessage(error);
        });
    }

    /**
     * create a classroom
     */
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
            consts.errorDatabaseMessage(error);
        });
    }

    /**
     * get informations for class (student, professor, exercices)
     */
    async getClassInfo(id) {
        var headers = {
            'Authorization': 'Bearer ' +  localStorage.sessionToken
        }

        return Axios.get(consts.url() + "classes/getClassDetail/" + id, {headers: headers}).then(response => {
            return response.data;
        }).catch(error => {
            consts.errorDatabaseMessage(error);
        });
    }

    /**
     * add a student to a class
     */
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
            consts.errorDatabaseMessage(error);
        });
    }

    /**
     * add a professor to a class
     */
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
            consts.errorDatabaseMessage(error);
        });
    }

    /**
     * delete professor from a class
     */
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
            consts.errorDatabaseMessage(error);
        });
    }
    
    /**
     * delete a student from a class
     */
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
            consts.errorDatabaseMessage(error);
        });
    }

    
}

export default new Classes();