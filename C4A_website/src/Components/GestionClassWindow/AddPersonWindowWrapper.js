import React, { Component } from 'react';
import AddPersonWindow from './AddPersonWindow';
import styles from './style.css';
import classes from '../../Providers/classes';

class AddPersonWindowWrapper extends Component {
    state = {
      visible: false
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    async handleSave(props){
      var ids = await props.map(async id => {
        if(this.props.teacher) {
          var res = await classes.addProfessorToClass(id, this.props.idClass);
          return res;
        }
        else {
          var res = await classes.addStudentToClass(id, this.props.idClass);
          return res;
        }
      });
      this.props.refill();
      this.setState({ visible: false });
    };

    saveFormRef = formRef => {
      this.formRef = formRef;
    };

    render() {
        return (
          <div className={styles.wrapper}>
            <img className={styles.button_wrapper} src={process.env.PUBLIC_URL + "plus.png"} onClick={this.showModal}/>
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
