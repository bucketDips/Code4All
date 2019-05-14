import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import auth from '../../auth';

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
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Nom d'utilisateur</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Mot de passe</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </div>
        </div>
    );
  }
}

export default LoginWindow;
