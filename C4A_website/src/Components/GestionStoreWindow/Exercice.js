import React, { Component } from 'react';
import { Card, Icon, Modal } from 'antd';
// eslint-disable-next-line
import style from './style.css';
import exercices from '../../Providers/exercices';

const confirm = Modal.confirm;

/**
 * correspond to an exercice in the store window 
 */
class Exercice extends Component {

    /**
    * refill the store exercices
    */
    refill(element){
        element.props.refill();
    }

    /**
    * show the fork modal
    */
    showConfirm(element) {
        confirm({
          title: 'Etes-vous sûr de vouloir forker cet exercice ? Il sera ajouté à votre propres exercies.',
          onOk() {
            exercices.addExercicesToUser(element.props.id, element.refill.bind(this, element));
          },
          onCancel() {
          },
        });
      }

    /**
    * action when clicking on the button fork 
    */
    fork() {
        this.showConfirm(this);
    }

    /**
    * render method
    */
    render() {
        return (
            <Card 
                title={this.props.title} 
                bodyStyle={{height: "17vh", overflow: "auto", padding: "10px" }} 
                extra={<Icon type="star" theme="twoTone" twoToneColor="#ff9816" style={{cursor: "pointer"}} onClick={this.fork.bind(this)} />} 
                style={{ width: "20%" }}
            >
                <p><b>Créé par : </b>{this.props.author}</p>
                <p><b>Description : </b><br />{this.props.description}</p>
            </Card>
        );
    }
}

export default Exercice;