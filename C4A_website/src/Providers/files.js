import Axios from 'axios';
import qs from 'qs';

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

        Axios.post("http://212.47.235.40:3000/fichiers/uploadToUser/" + options.file.name + "/0", data, config).then((res) => {
          options.onSuccess(res.data, options.file)
        }).catch((err) => {
          console.log(err)
        })
    }
}

export default new Files();