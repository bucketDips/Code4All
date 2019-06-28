import React, { Component } from 'react';
import { Upload, message, Button, Icon, Modal } from 'antd';
import files from "../../Providers/files";
import styles from './style.css';

import Pattern from './Pattern';

const confirm = Modal.confirm;

class Patterns extends Component {
  
  constructor() {
    super();
    this.state = {
      patterns: []
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({patterns: newProps.patterns});
  }

  showConfirm(patternId, cb) {
    confirm({
        title: 'Etes-vous sûr de vouloir supprimer ce motif ? Si des exercices à vous privés ou publics l\'utilisent, il n\'y apparaitra plus.',
        onOk() {
            files.deletePattern(patternId, cb);
        },
        onCancel() {
        },
    });
  }

  reloadPatterns() {
    this.props.reloadPatterns();
  }

  handleDeletePattern(patternId) {
    this.showConfirm(patternId, this.reloadPatterns.bind(this));
  }

  onChange(info) {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.reloadPatterns();
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
    var patterns = Object.values(this.state.patterns).map(pattern => (
      <Pattern deletePattern={this.handleDeletePattern.bind(this)} id={pattern.id} key={pattern.id} name={pattern.nom} />
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
