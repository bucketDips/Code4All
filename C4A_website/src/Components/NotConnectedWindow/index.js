import React, { Component } from 'react';
import WrappedLoginWindow from '../../Components/LoginWindow/';
import WrappedRegistrationForm from '../../Components/InscriptionWindow/';


class NotConnectedWindow extends Component {

  render() {
    
    if(this.props.type === "login") {
      var form = (<WrappedLoginWindow />);
    } 
    else if(this.props.type === "inscription") {
      var form = (<WrappedRegistrationForm />);
    }

    return (
        <div className="not-connected-window">
            {form}
        </div>
    );
  }
}

export default NotConnectedWindow;
