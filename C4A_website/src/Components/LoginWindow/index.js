import React, { Component } from 'react';

import auth from '../../auth';

import styles from './style.css'

class LoginWindow extends Component {

  onLogin(e) {
    auth.login(() => {
      this.props.history.push("/");
    });
  }

  render() {
    return (
        <div className="login-window">
            <h3 className="title">log</h3>
            <div className="content">
              <button onClick={this.onLogin.bind(this)}>Login</button>
            </div>
        </div>
    );
  }
}

export default LoginWindow;
