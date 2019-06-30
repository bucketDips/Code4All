import React, { Component } from 'react';
import AddPersonWindow from './AddPersonWindow';
import styles from './style.css';
import classes from '../../Providers/classes';

/**
* button that contain the modal of adding person
* to class form
*/
class AddPersonWindowWrapper extends Component {
    state = {
      visible: false
    };

    /**
     * show the modal
     */
    showModal = () => {
        this.setState({ visible: true });
    };

    /**
     * hide the modal
     */
    handleCancel = () => {
        this.setState({ visible: false });
    };

    /**
     * action when saving all of the persons to the class
     */
    async handleSave(props){
      await Promise.all(props.map(id => {
        if(this.props.teacher) {
          classes.addProfessorToClass(id, this.props.idClass);
        }
        else {
          classes.addStudentToClass(id, this.props.idClass);
        }
        return id;
      }));
      this.props.refill();
      this.setState({ visible: false });
    };

    /**
     * save modal refs
     */
    saveFormRef = formRef => {
      this.formRef = formRef;
    };

    /**
     * render method
     */
    render() {
        return (
          <div className={styles.wrapper}>
            <img alt='plus' className={styles.button_wrapper} src={process.env.PUBLIC_URL + "plus.png"} onClick={this.showModal}/>
            <AddPersonWindow
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onSave={this.handleSave.bind(this)}
              persons={this.props.persons}
            />
          </div>
        );
    }
}

export default AddPersonWindowWrapper;
