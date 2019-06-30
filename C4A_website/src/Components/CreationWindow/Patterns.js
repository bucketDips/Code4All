import React, { Component } from 'react';
import { Upload, message, Button, Icon, Modal } from 'antd';
import files from "../../Providers/files";
import styles from './style.css';
import Pattern from './Pattern';

const confirm = Modal.confirm;

/**
 * patterns module of the creationwidnow
 */
class Patterns extends Component {
  
  /**
   * constructor
   */
  constructor() {
    super();
    this.state = {
      patterns: []
    }
  }

  /**
   * change the state if new patterns (adding one)
   */
  componentWillReceiveProps(newProps) {
    this.setState({patterns: newProps.patterns});
  }

  /**
   * show the modal of deleting a pattern 
   */
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

  /**
   * recharge patterns from the props
   */
  reloadPatterns() {
    this.props.reloadPatterns();
  }

  /**
   * action when delete a pattern
   */
  handleDeletePattern(patternId) {
    this.showConfirm(patternId, this.reloadPatterns.bind(this));
  }

  /**
   * action of changing the input file of the patterns module
   */
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

  /**
   * render method
   */
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
                    <Icon type="upload" /> Cliquer pour ajouter
                  </Button>
                </Upload>  
              </div>            
            </div>
        </div>
    );
  }
}

export default Patterns;
