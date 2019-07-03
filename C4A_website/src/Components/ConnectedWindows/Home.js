import React, { Component } from 'react';
import ConnectedWindowsStructure from '../ConnectedWindowsStructure/';
import style from './style.css';
import bigpages from '../../Providers/bigpages';

/**
 * The home page
 */
class HomeWindow extends Component {

  /**
   * render method
   */
  render() {
    return (
        <ConnectedWindowsStructure type="home" singleContent={bigpages.home(style)} />
    );
  }
}

export default HomeWindow;
