import React, { Component } from 'react';
import AddExerciceForm from './AddExerciceForm';
import styles from './style.css';
import { Input, Button, Modal, Form } from 'antd';

const confirm = Modal.confirm;
const TextArea = Input.TextArea;

const AddExerciceWindow = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    state={
      toAdd: []
    }

    setToAdd(toAdd) {
      this.setState({toAdd: toAdd});
    }

    render() {
      const { visible, onCancel, onSave, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          destroyOnClose={true}
          visible={visible}
          wrapClassName="add_exercices_modal"
          title="Ajouter des exercices à la classe"
          okText= "Sauvegarder"
          onCancel={onCancel}
          onOk={this.props.onSave.bind(this, this.state.toAdd)}
        >
          <AddExerciceForm updateToAdd={this.setToAdd.bind(this)} exercices={this.props.exos} />
        </Modal>
      );
    }
  },
);

export default AddExerciceWindow;