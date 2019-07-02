import React, { Component } from 'react';
import ConnectedWindowsStructure from '../ConnectedWindowsStructure/';
import style from './style.css';
import bigpages from '../../Providers/bigpages';

/**
 * The android page
 */
class AndroidWindow extends Component {

  /**
   * render method
   */
  render() {
    var content = bigpages.android(style);
    
    return (
        <ConnectedWindowsStructure type="android" singleContent={content} />
    );
  }
}

export default AndroidWindow;
