import React, { Component } from 'react';

import RealisationExerciseWindow from '../../Components/RealisationWindow/';

import styles from './style.css';
import { Input, Button, Radio, Modal, Form } from 'antd';
import exercices from "../../Providers/exercices";

import consts from '../../Providers/consts';

const confirm = Modal.confirm;
const TextArea = Input.TextArea;

const ExerciceCreationForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Enregistrer ou modifier un exercice"
          okText= {this.props.name === undefined ? "Sauvegarder" : "Modifier"}
          onCancel={onCancel}
          onOk={onCreate}
          destroyOnClose={true}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Le nom de votre exercice' }],
                initialValue: this.props.name
              })(<Input />)}
            </Form.Item>
            <Form.Item className="collection-create-form_last-form-item">
              {getFieldDecorator('modifier', {
                initialValue: (this.props.store === undefined || this.props.store === 0) ? 'private' : 'public',
              })(
                <Radio.Group>
                  <Radio value="public">Public</Radio>
                  <Radio value="private">Private</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

const ExerciceLaunchModal = Form.create({ name: 'launch_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel } = this.props;
      return (
        <Modal
          wrapClassName="launch_modal"
          visible={visible}
          footer={null}
          onCancel={onCancel}
          title="Lancement exercice"
          destroyOnClose={true}
        >
          <RealisationExerciseWindow bundle={this.props.launchBundle} />
        </Modal>
      );
    }
  },
);

class Details extends Component {

  state = {
    saveModalVisible: false,
    launchModalVisible: false,
    details: "",
    launchBundle: null
  };

  componentWillMount() {
    if(this.props.details) {
      this.setState({details: this.props.details, buttonValue: "modifier"});
    }
    else {
      this.setState({buttonValue: "sauvegarder"});
    }
  }

  changeDetails(details) {
    this.setState({details: details.target.value});
  };

  showModal = () => {
    this.setState({ saveModalVisible: true });
  };

  handleCancel = () => {
    this.setState({ saveModalVisible: false });
  };

  isIn(patterns, id) {
    for(var i = 0; i < patterns.length; i++) {
      if (patterns[i].id === id) {
          return true;
      }
    }
    return false;
  }

  extractPatternsFromArray(array, patterns) {
    Object.values(array).map((element) => {
        if(element.backgroundId !== null && element.backgroundId !== undefined && !this.isIn(patterns, element.backgroundId)) {
          patterns.push({
            id: element.backgroundId,
            file_id: element.backgroundId,
            url: element.background
          });
        }
        return element;
    });
  }

  extractPatternsFromCode(code, patterns) {
    var matches = code.match(/changePattern\(\d+\)/g);
    if(matches === null) {
      return;
    }
    for(var i = 0; i < matches.length; i++) {
        var id = Number(matches[i].split("(")[1].split(")")[0]);
        if(!patterns.includes(id)) {
          patterns.push({
            id: id,
            file_id: id,
            url: consts.url() + this.props.patterns[id].nom
          });
        }
    }
  }

  extractPatterns(exercice) {
      var patterns = [];
      if(exercice.gridProperties.backgroundId !== undefined && exercice.gridProperties.backgroundId !== null) {
          patterns.push({
            id: exercice.gridProperties.backgroundId,
            file_id: exercice.gridProperties.backgroundId,
            url: exercice.gridProperties.background
          });
      }
      this.extractPatternsFromArray(exercice.blocks, patterns);
      this.extractPatternsFromArray(exercice.npc, patterns);
      this.extractPatternsFromArray(exercice.pc, patterns)
      this.extractPatternsFromCode(exercice.editorValue, patterns);
      return patterns;
  }
  
  showModalLaunch = () => {
    var state = this.props.getParentState();
    var fichiers = this.extractPatterns(state);

    var launchBundle = {
      title: "temporaire",
      description: "description temporaire",
      code: state.editorValue,
      gridObject: state.gridObject,
      blocks: Object.values(state.blocks).map(block => {
        return {
          id: block.id,
          row: block.rowStart,
          column: block.columnStart,
          width: block.width,
          height: block.height,
          patternId: block.backgroundId
        }
      }),
      columns: state.gridProperties.columns,
      labels: Object.values(state.labels).map(label => {
        return {
          id: label.id,
          row: label.rowStart,
          column: label.columnStart,
          width: label.width,
          height: label.height,
          text: label.text
        }
      }),
      rows: state.gridProperties.lines,
      npcs: Object.values(state.npc).map(n => {
        return {
          id: n.id,
          row: n.rowStart,
          column: n.columnStart,
          width: n.width,
          height: n.height,
          patternId: n.backgroundId
        }
      }),
      patternId: state.gridProperties.backgroundId,
      pcs: Object.values(state.pc).map(n => {
        return {
          id: n.id,
          row: n.rowStart,
          column: n.columnStart,
          width: n.width,
          height: n.height,
          patternId: n.backgroundId
        }
      }),
      functions: Object.values(state.functions),
      tests: Object.values(state.tests),
      fichiers: fichiers
    }

    this.setState({ launchModalVisible: true, launchBundle: launchBundle });
  };

  handleCancelLaunch = () => {
    this.setState({ launchModalVisible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      var title = values.title;
      var store = values.modifier === "public" ? 1 : 0;

      if(!this.props.id) {
        this.props.saveExercise(title, this.state.details, store);
      }
      else {
        this.props.modifyExercise(title, this.state.details, this.props.id, store);
      }
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  showConfirm(id) {
    confirm({
      title: 'Etes-vous sûr de vouloir supprimer cet exercice ?',
      onOk() {
        exercices.deleteExercice(id);
      },
      onCancel() {
      },
    });
  }

  render() {
    var saveB = this.props.info === null ? (
      <Button id="save-button" type="primary" icon="download" size={"large"} onClick={this.showModal}>
        {this.state.buttonValue}
      </Button>
    ) :
    (
      <Button id="save-button" type="primary" icon="download" size={"large"} onClick={this.showModal} disabled>
        {this.state.buttonValue}
      </Button>
    );

    var launchB = this.props.info === null ? (
      <Button id="launch-button" type="dasher" icon="caret-right" size={"large"} onClick={this.showModalLaunch}>
        lancer
      </Button>
    ) :
    (
      <Button id="launch-button" type="dasher" icon="caret-right" size={"large"} onClick={this.showModalLaunch} disabled>
        lancer
      </Button>
    );

    return (
        <div className={styles.details}>
            <div className="content">
            <TextArea autosize={false} rows={4} onChange={this.changeDetails.bind(this)} value={this.state.details} />
            {saveB}
            {this.props.id && 
            
            <Button id="delete-button" type="danger" icon="delete" size={"large"} onClick={this.showConfirm.bind(this, this.props.id)}>
              supprimer
            </Button>}

            {launchB}

            <ExerciceCreationForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.saveModalVisible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              name={this.props.name}
              store={this.props.store}
            />

            <ExerciceLaunchModal
              visible={this.state.launchModalVisible}
              onCancel={this.handleCancelLaunch}
              launchBundle={this.state.launchBundle}
            />
            </div>
        </div>
    );
  }
}

export default Details;
