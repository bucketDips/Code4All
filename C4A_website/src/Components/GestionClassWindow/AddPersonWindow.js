import React, { Component } from 'react';

import styles from './style.css';
import { Input, Button, Modal, Form } from 'antd';
import SearchAndAddForm from './SearchAndAddForm';

const confirm = Modal.confirm;
const TextArea = Input.TextArea;

const AddPersonWindow = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          destroyOnClose={true}
          visible={visible}
          wrapClassName="add_persons_modal"
          title="Ajouter des élèves ou professeurs"
          okText= "Sauvegarder"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <SearchAndAddForm persons={this.props.persons} />
        </Modal>
      );
    }
  },
);

export default AddPersonWindow;