import React, { Component } from 'react';
import ConnectedWindowsStructure from '../ConnectedWindowsStructure/';

/**
 * The home page
 */
class HomeWindow extends Component {

  /**
   * render method
   */
  render() {
    return (
        <ConnectedWindowsStructure type="home" />
    );
  }
}

export default HomeWindow;
