import React, { Component } from 'react';
import { Card, Icon, Modal } from 'antd';
import style from './style.css';

const confirm = Modal.confirm;

class Exercice extends Component {

    constructor() {
        super();
        this.state = {
          visible: true
        }
    }

    showConfirm(element) {
        confirm({
          title: 'Etes-vous sûr de vouloir forker cet exercice ? Il sera ajouté à votre propres exercies.',
          onOk() {
            element.setState({visible: false});
          },
          onCancel() {
          },
        });
      }

    fork() {
        this.showConfirm(this);
    }

    render() {
        return (
            <Card 
                title={this.props.title} 
                bodyStyle={{height: "17vh", overflow: "auto", padding: "10px" }} 
                extra={<Icon type="star" theme="twoTone" twoToneColor="#ff9816" style={{cursor: "pointer"}} onClick={this.fork.bind(this)} />} 
                style={{ width: "20%", display: (this.state.visible ? "block" : "none") }}
            >
                <p><b>Créé par : </b>{this.props.author}</p>
                <p><b>Description : </b><br />{this.props.description}</p>
            </Card>
        );
    }
}

export default Exercice;