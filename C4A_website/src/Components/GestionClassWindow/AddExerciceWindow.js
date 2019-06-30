import React from 'react';
import AddExerciceForm from './AddExerciceForm';
// eslint-disable-next-line
import styles from './style.css';
import { Modal, Form } from 'antd';

/**
* modal containing the add exercice form 
*/
const AddExerciceWindow = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {

    state={
      toAdd: []
    }

    /**
    * changing the value of ids of exercices to add
    * to the class 
    */
    setToAdd(toAdd) {
      this.setState({toAdd: toAdd});
    }

    /**
    * render method 
    */
    render() {
      const { visible, onCancel } = this.props;
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