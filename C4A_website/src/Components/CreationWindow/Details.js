import React, { Component } from 'react';

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

class Details extends Component {

  state = {
    visible: false,
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
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      var title = values.title;

      if(!this.props.details) {
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
            {this.props.details && 
            
            <Button id="delete-button" type="danger" icon="delete" size={"large"} onClick={this.showConfirm.bind(this, this.props.id)}>
              supprimer
            </Button>}

            <Button id="launch-button" type="dasher" icon="caret-right" size={"large"}>
              lancer
            </Button>

            <ExerciceCreationForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              name={this.props.name}
            />
            </div>
        </div>
    );
  }
}

export default Details;
