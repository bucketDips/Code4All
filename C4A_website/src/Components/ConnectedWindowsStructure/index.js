import React, { Component } from 'react';
import LeftNav from '../NavBars/LeftNav';
import TopNav from '../NavBars/TopNav';
// eslint-disable-next-line
import styles from './style.css';

/**
 * structure of all the connected windows,
 * contains the navigations modules (bridge
 * between connectedwindows and leftnav)
 */
class ConnectedWindow extends Component {

  /**
   * render method
   */
  render() {
    var leftNav = this.props.type === "home" || this.props.type === "android" ? "" : (<LeftNav menus={this.props.menus} content={this.props.content} />);
    return (
        <div className="connected-window">
            <TopNav />
            {leftNav}
            {this.props.singleContent}
        </div>
    );
  }
}

export default ConnectedWindow;
