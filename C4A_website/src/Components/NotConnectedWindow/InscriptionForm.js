import React, { Component } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Checkbox,
  Button,
} from 'antd';
import { Link } from 'react-router-dom';
import auth from '../../Providers/auth';
// eslint-disable-next-line
import styles from './style.css';

/**
* inscription to the website form (contained in the same window)
*/
class RegistrationForm extends Component {

  state = {
    confirmDirty: false,
  };

  /**
  * action when clicking on the save button
  */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        auth.inscription(values.pseudo, values.password, values.email);
      }
    });
  };

  /**
  * action for confirm the password
  */
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  /**
  * comparing the two passwords
  */
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Les deux mots de passe ne correspondent pas!');
    } else {
      callback();
    }
  };

  /**
  * action for validating the password
  */
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
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
        <Form.Item
          label={
            <span>
              Pseudo&nbsp;
              <Tooltip title="Comment voulez-vous être appellé ?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('pseudo', {
            rules: [{ required: true, message: 'Entrez votre pseudo svp !', whitespace: true }],
          })(<Input />)}
        </Form.Item>
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
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirmation mot de passe" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Confirmez votre mot de passe svp !',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            rules: [
              {
                required: true,
                message: 'Vous devez valider les termes !',
              }
            ],
            valuePropName: 'checked',
          })(
            <Checkbox>
              J'ai bien lu les <Link to="/terms">termes</Link>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            S'enregistrer
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm;
