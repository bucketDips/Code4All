import React, { Component } from 'react';

import ConnectedWindowsStructure from '../ConnectedWindowsStructure/';

class HomeWindow extends Component {

  render() {
    alert("robin est un con");
    return (
        <ConnectedWindowsStructure type="home" />
    );
  }
}

export default HomeWindow;
