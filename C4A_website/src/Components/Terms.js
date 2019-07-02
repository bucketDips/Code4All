import React, { Component } from 'react';
import style from '../index.css';

/**
 * correspond to the terms window
 */
class TermsWindow extends Component {

  /**
   * render method 
   */
  render() {
    return (
        <div className={style.error_window} style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/blackboard.jpg)", backgroundSize: "cover"}}>
            <div className={style.text}>
              <p>Ici les termes</p>
            </div>
        </div>
    );
  }
}

export default TermsWindow;
