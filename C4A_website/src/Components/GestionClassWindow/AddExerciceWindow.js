import React, { Component } from 'react';

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
          wrapClassName="add_persons_modal"
          title="Ajouter des élèves ou professeurs"
          okText= "Sauvegarder"
          onCancel={onCancel}
          onOk={onSave.bind(this, this.state.toAdd)}
        >
          
        </Modal>
      );
    }
  },
);

export default AddExerciceWindow;