import React, { Component } from 'react';
import AddExerciceWindow from './AddExerciceWindow';
import styles from './style.css';
import exercices from '../../Providers/exercices';

/**
* button that contain the modal of adding exercice
* to class form
*/
class AddExerciceWindowWrapper extends Component {

    state = {
      visible: false
    };

    /**
    * show modal 
    */
    showModal = () => {
        this.setState({ visible: true });
    };

    /**
    * hide modal 
    */
    handleCancel = () => {
        this.setState({ visible: false });
    };

    /**
    * called when add exercices, refill
    * the exercices in parent window 
    */
    refill() {
      this.props.refill();
    }

    /**
    * action when saving the new exercices for class 
    */
    async handleSave(props){
      await exercices.addExercicesToClass(this.props.classRoom, props, this.refill.bind(this));
      this.props.refill();
      this.setState({ visible: false });
    };

    /**
    * save modal ref here 
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
            <AddExerciceWindow
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onSave={this.handleSave.bind(this)}
              exos={this.props.exos}
            />
          </div>
        );
    }
}

export default AddExerciceWindowWrapper;
