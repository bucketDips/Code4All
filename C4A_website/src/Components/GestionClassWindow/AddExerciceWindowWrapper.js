import React, { Component } from 'react';
import AddExerciceWindow from './AddExerciceWindow';
import styles from './style.css';
import classes from '../../Providers/classes';

class AddExerciceWindowWrapper extends Component {
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
      console.log(props);
    };

    saveFormRef = formRef => {
      this.formRef = formRef;
    };

    render() {
        return (
          <div className={styles.wrapper}>
            <img className={styles.button_wrapper} src={process.env.PUBLIC_URL + "plus.png"} onClick={this.showModal}/>
            <AddExerciceWindow
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onSave={this.handleSave.bind(this)}
              
            />
          </div>
        );
    }
}

export default AddExerciceWindowWrapper;
