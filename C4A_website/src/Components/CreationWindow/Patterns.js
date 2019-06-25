import React, { Component } from 'react';
import { Upload, message, Button, Icon } from 'antd';
import Axios from 'axios';
import files from "../../Providers/files";


import styles from './style.css';

import Pattern from './Pattern';

class Patterns extends Component {
  
  constructor() {
    super();
    this.state = {
      patterns: []
    }
  }

  componentWillMount() {
    this.fillPatterns();
  }

  handleDeletePattern(patternId) {
    this.props.deletePattern(patternId);
  }

  async fillPatterns() {
    var allExercices = await files.getMines();

    this.setState({patterns: allExercices.data});
    this.props.reloadPatterns();
  }

  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.fillPatterns();
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
    var patterns = this.state.patterns.map(pattern => (
      <Pattern id={pattern.fileid} key={pattern.fileid} name={pattern.publicName} />
    ));

    return (
        <div className={styles.patterns}>
            <div className="content">
              <div className="patterns-display">
                {patterns}
              </div>
              <div className="add-button-pattern">
                <Upload name='file' accept='.jpg,.png,.jpeg,.gif' showUploadList={false}
                  customRequest={(options) => {
                    files.uploadFileToUser(options);
                  }}
                  onChange={this.onChange.bind(this)}>
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
