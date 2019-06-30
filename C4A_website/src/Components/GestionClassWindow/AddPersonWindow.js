import React from 'react';
// eslint-disable-next-line
import styles from './style.css';
import { Modal, Form } from 'antd';
import SearchAndAddForm from './SearchAndAddForm';

const AddPersonWindow = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    state={
      toAdd: []
    }

    setToAdd(toAdd) {
      this.setState({toAdd: toAdd});
    }

    render() {
      const { visible, onCancel, onSave } = this.props;
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
          <SearchAndAddForm persons={this.props.persons} setToAdd={this.setToAdd.bind(this)} />
        </Modal>
      );
    }
  },
);

export default AddPersonWindow;