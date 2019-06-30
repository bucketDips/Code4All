import React, { Component } from 'react';
import WrappedLoginWindow from './LoginForm';
import WrappedRegistrationForm from './InscriptionForm';
// eslint-disable-next-line
import styles from './style.css';

/**
* correspond to the login and inscription window 
*/
class NotConnectedWindow extends Component {

  /**
  * constructor
  */
  constructor() {
    super();
    this.state = {
      type: "login",
      fade: false
    }
  }

  /**
  * delay like in the thread sleep in c#
  */
  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  /**
  * action when clicking on an arrow (changing from inscription to login)
  */
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

  /**
  * render method
  */
  render() {
    if(this.state.type === 'login') {
      var form = (<WrappedLoginWindow />);
    }
    else if(this.state.type === 'inscription'){
      form = (<WrappedRegistrationForm />);
    }

    return (
      <div class="flex-container">
          <div class="auto"></div>

          <div className={this.state.fade === true ? 'main-bubble fadeOut':'main-bubble fadeIn'}>
            <div class="main-bubble-content">
              <div class="main-bubble-title">
                <img className={this.state.type === "login" ? "arrow change-insc" : "arrow change-login"} src="/fleche.png" alt="logo" onClick={this.handleClick.bind(this)} />
                <h1>CodeInSchool - {this.state.type === "login" ? "se connecter !" : "s'inscrire !"}</h1>
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
