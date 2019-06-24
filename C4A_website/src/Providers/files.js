import Axios from 'axios';
import consts from '../Providers/consts'


class Files {
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
          console.log(err)
        })
    }

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