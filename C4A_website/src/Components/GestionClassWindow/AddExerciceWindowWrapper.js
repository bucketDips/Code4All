import React, { Component } from 'react';
import AddExerciceWindow from './AddExerciceWindow';
import styles from './style.css';
import exercices from '../../Providers/exercices';

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

    refill() {
      this.props.refill();
    }

    async handleSave(props){
      await exercices.addExercicesToClass(this.props.classRoom, props, this.refill.bind(this));
      this.props.refill();
      this.setState({ visible: false });
    };

    saveFormRef = formRef => {
      this.formRef = formRef;
    };

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
