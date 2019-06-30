import Axios from 'axios';
import consts from '../Providers/consts'

/**
 * correspond the requested of API for the "fichiers/" routes
 */
class Files {

    /**
     * upload file for me (only pattern for now on)
     */
    uploadFileToUser(options) {
        const data= new FormData()
        data.append('file', options.file)
        
        const config= {
            "headers": {
              'Authorization': 'Bearer ' +  localStorage.sessionToken,
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
          }

        Axios.post(consts.url() + "fichiers/uploadToUser/" + options.file.name + "/-1", data, config).then((res) => {
          options.onSuccess(res.data, options.file)
        }).catch((err) => {
        })
    }

    /**
     * delete image for me by id
     */
    deletePattern(id, cb) {
      Axios.post(consts.url() + 'fichiers/deleteFile/' +  id, {},
      {
          headers: {
              'Authorization': 'Bearer ' +  localStorage.sessionToken
          }
      })
      .then(function (response) {
        cb();
      })
      .catch(function (error) {
        alert(error);
      });
    }

    /**
     * upload a file to exercice
     */
    async uploadFileToExo(idFile, idExo) {
      return await Axios.post(consts.url() + 'fichiers/uploadToExercice/' + idExo + "/" + idFile, {},
      {
          headers: {
              'Authorization': 'Bearer ' +  localStorage.sessionToken
          }
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        if(error.response.data.code === "ER_DUP_ENTRY") return;
        alert(JSON.stringify(error.response));
      });
  }

    /**
     * get my images
     */
    async getMines() {
      var headers = {
          'Authorization': 'Bearer ' +  localStorage.sessionToken
      }

      return Axios.get(consts.url() + "fichiers/getAllUserImages", {headers: headers}).then(response => {
          return response;
      }).catch(error => {
          alert(JSON.stringify(error));
      });
  }
}

export default new Files();