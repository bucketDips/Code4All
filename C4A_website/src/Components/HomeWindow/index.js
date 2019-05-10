import React, { Component } from 'react';

import auth from '../../auth';

import styles from './style.css'

class HomeWindow extends Component {

  onLogout() {
    auth.logout(() => {
      this.props.history.push("/");
    })
  }

  render() {
    return (
        <div className="home-window">
            <h3 className="title">Home</h3>
            <div className="content">
              <button onClick={this.onLogout.bind(this)}>Logout</button>
            </div>
        </div>
    );
  }
}

export default HomeWindow;
