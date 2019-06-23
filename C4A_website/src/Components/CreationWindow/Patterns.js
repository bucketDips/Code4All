import React, { Component } from 'react';
import { Upload, message, Button, Icon } from 'antd';
import Axios from 'axios';
import files from "../../Providers/files";


import styles from './style.css';

import Pattern from './Pattern';

class Patterns extends Component {
  
  handleDeletePattern(patternId) {
    this.props.deletePattern(patternId);
  }

  render() {
    const props = {
      name: 'file',
      accept: '.jpg,.png,.jpeg,.gif',
      showUploadList: false,
      customRequest: (options) => {
        files.uploadFileToUser(options);
        
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
        <div className={styles.patterns}>
            <div className="content">
              <div className="patterns-content">
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
              </div>
            </div>
        </div>
    );
  }
}

export default Patterns;
