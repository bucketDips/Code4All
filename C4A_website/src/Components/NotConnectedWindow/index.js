import React, { Component } from 'react';
import WrappedLoginWindow from '../../Components/LoginWindow/';
import WrappedRegistrationForm from '../../Components/InscriptionWindow/';

import styles from './style.css';


class NotConnectedWindow extends Component {

  constructor() {
    super();
    this.state = {
      type: "login",
      fade: false
    }
  }

  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  handleClick() {
    this.setState({
      fade: true
    });
    
    this.sleep(400).then(() => {
      this.setState({
        type: this.state.type === 'login' ? 'inscription' : 'login'
      });
      this.sleep(100).then(() => {
        this.setState({
          fade: false
        });
      });
    });
  }

  render() {
    if(this.state.type === 'login') {
      var form = (<WrappedLoginWindow />);
    }
    else if(this.state.type === 'inscription'){
      var form = (<WrappedRegistrationForm />);
    }

    return (
      <div class="flex-container">

          <div class="auto"></div>
          <div className={this.state.fade === true ? 'main-bubble fadeOut':'main-bubble fadeIn'}>
            <div class="main-bubble-content">
              <div class="main-bubble-title">
                <img className={this.state.type === "login" ? "arrow change-insc" : "arrow change-login"} src="/fleche.png" alt="logo" onClick={this.handleClick.bind(this)} />
                <h1>Code4All - {this.state.type === "login" ? "se connecter !" : "s'inscrire !"}</h1>

              </div>
              <div class="main-bubble-body-border">
                <div class="main-bubble-body">
                  {form}
                </div>
              </div>
            </div>
          </div>

          <div class="auto"></div>
      
      </div>
    );
  }
}

export default NotConnectedWindow;
