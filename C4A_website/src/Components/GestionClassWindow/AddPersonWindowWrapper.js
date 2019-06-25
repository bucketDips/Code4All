import React, { Component } from 'react';
import AddPersonWindow from './AddPersonWindow';
import styles from './style.css';

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

    handleCreate = () => {
      const { form } = this.formRef.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
  
        var title = values.title;
  
        console.log(title);
      });
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
              onCreate={this.handleCreate}
            />
          </div>
        );
    }
}

export default AddPersonWindowWrapper;
