import React, { Component } from 'react';

import styles from './style.css';
import { Input, Button, Radio, Icon, Modal, Form } from 'antd';

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
          title="Enregistrer un nouvel exercice"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Le nom de votre exercice' }],
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

      this.props.saveExercise(title, this.state.details);
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    if(this.props.details) {
      var details = this.props.details;
      var buttonValue = "modifier";
    }
    else {
      var buttonValue = "sauvegarder";
    }

    return (
        <div className={styles.details}>
            <div className="content">
            <TextArea autosize={false} rows={4} onChange={this.changeDetails.bind(this)} value={details} />
            <Button id="save-button" type="primary" icon="download" size={"large"} onClick={this.showModal}>
              {buttonValue}
            </Button>
            <ExerciceCreationForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
            />
            </div>
        </div>
    );
  }
}

export default Details;
