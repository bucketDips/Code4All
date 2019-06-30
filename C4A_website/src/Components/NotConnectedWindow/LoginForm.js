import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import auth from '../../Providers/auth';

/**
* correspond to the login form present in the same window 
*/
class LoginWindow extends Component {

  state = {
    confirmDirty: false,
  };

  /**
  * action when clicking on login button
  */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        auth.login(values.email, values.password);
      }
    });
  };

  /**
  * render method
  */
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 8,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'Ce n\'est pas un email valide !',
              },
              {
                required: true,
                message: 'Entrez votre email svp !',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Mot de passe" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Entrez votre mot de passe svp !',
              }
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Se connecter
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedLoginWindow = Form.create({ name: 'login' })(LoginWindow);

export default WrappedLoginWindow;
