import Axios from 'axios';
import qs from 'qs';
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
}

export default new Classes();