import React, { Component } from 'react';
import InscriptionForm from '../../Components/NotConnectedWindow/InscriptionForm';
// eslint-disable-next-line
import styles from './style.css';
import { Modal } from 'antd';

/**
* modal containing the sign in for new students by teacher
*/
class SignInNewStudentsForm extends Component {
    /**
    * render method 
    */
    render() {
        const { visible, onCancel } = this.props;
        return (
        <Modal
            destroyOnClose={true}
            visible={visible}
            wrapClassName="sign_in_student"
            title="Inviter un élève à s'inscrire à l'application"
            okText="Sauvegarder"
            onCancel={onCancel}
            footer={null}
        >
            <InscriptionForm fromClass={true} />
        </Modal>
        );
    }
}

export default SignInNewStudentsForm;