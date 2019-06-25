import React, { Component } from 'react';

import ConnectedWindowsStructure from '../ConnectedWindowsStructure/';
import CreateExerciseWindow from '../CreationWindow/';
import GestionClassWindow from '../GestionClassWindow';

import { Input, Button, Modal, Form } from 'antd';

import classes from '../../Providers/classes';

const ClassCreationForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="Enregistrer une nouvelle classe"
            okText= {"Sauvegarder"}
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="Titre">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Le nom de votre nouvelle classe' }],
                })(<Input />)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
  );

class ClassesWindow extends Component {

    constructor() {
        super();
        this.state = {
            menus: [],
            content: null,
            visible: false
        }
    }

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

            classes.createClass(title);
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };


    presentation() {
        return new Promise((resolve, reject) => { resolve([(
            <div>
                <h1>Voici l'explication des classes</h1>
            </div>
        ), "not-collapsed"]); });
    }

    clickOnClass(id, teacher) {
        return new Promise((resolve, reject) => { resolve([(
            <GestionClassWindow id={id} teacher={teacher} />
        ), "collapsed"]); });
    }

    createClass() {
        this.showModal();
        return new Promise((resolve, reject) => { resolve(null)});
    }

    async componentWillMount() {
        var allClasses = await classes.getMines();

        var student = JSON.parse(JSON.stringify(allClasses.student));
        var professor = JSON.parse(JSON.stringify(allClasses.professor));

        student.map((c) => {
            c.action = this.clickOnClass.bind(this, c.id, false)
        });

        professor.map((c) => {
            c.action = this.clickOnClass.bind(this, c.id, true)
        });

        var menus = [];
        menus.push({
            name: "presentation",
            icon: "book",
            action: this.presentation
        });
        menus.push({
            name: "as student",
            icon: "user",
            submenus: student
        });
        menus.push({
            name: "as professor",
            icon: "team",
            submenus: professor
        });
        menus.push({
            name: "create class",
            icon: "plus",
            action: this.createClass.bind(this)
        });

        this.presentation().then(result => {
            this.setState({ 
                menus: menus,
                content: result[0]
             });
        });
    }

    render() {
        return (
            <div>
            <ConnectedWindowsStructure type="classes" menus={this.state.menus} content={this.state.content} />
            <ClassCreationForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
            />
            </div>
        );
    }
}

export default ClassesWindow;