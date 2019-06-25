import React, { Component } from 'react';

import RealisationExerciseWindow from '../../Components/RealisationWindow/';

import styles from './style.css';
import { Input, Button, Modal, Form } from 'antd';
import exercices from "../../Providers/exercices";

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
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Le nom de votre exercice' }],
                initialValue: this.props.name
              })(<Input />)}
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
        >
          <RealisationExerciseWindow />
        </Modal>
      );
    }
  },
);

class Details extends Component {

  state = {
    saveModalVisible: false,
    launchModalVisible: false,
    details: ""
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
  
  showModalLaunch = () => {
    this.setState({ launchModalVisible: true });
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

      if(!this.props.id) {
        this.props.saveExercise(title, this.state.details);
      }
      else {
        this.props.modifyExercise(title, this.state.details, this.props.id);
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
    return (
        <div className={styles.details}>
            <div className="content">
            <TextArea autosize={false} rows={4} onChange={this.changeDetails.bind(this)} value={this.state.details} />
            <Button id="save-button" type="primary" icon="download" size={"large"} onClick={this.showModal}>
              {this.state.buttonValue}
            </Button>
            {this.props.id && 
            
            <Button id="delete-button" type="danger" icon="delete" size={"large"} onClick={this.showConfirm.bind(this, this.props.id)}>
              supprimer
            </Button>}

            <Button id="launch-button" type="dasher" icon="caret-right" size={"large"} onClick={this.showModalLaunch}>
              lancer
            </Button>

            <ExerciceCreationForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.saveModalVisible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              name={this.props.name}
            />

            <ExerciceLaunchModal
              visible={this.state.launchModalVisible}
              onCancel={this.handleCancelLaunch}
            />
            </div>
        </div>
    );
  }
}

export default Details;
