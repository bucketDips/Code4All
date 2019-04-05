import React, { Component } from 'react';
import ToolBoxElement from './ToolBoxElement';

import styles from '../css/ToolBox.css'

class ToolBox extends Component {

  render() {
    let options;
    if(this.props.options) {
      options = this.props.options.map(option => {
        return (<ToolBoxElement key={option.title} element={option} />)
      })
    }

    return (
        <div className={styles.toolbox}>
            <h3 className="title">Ici la toolbox</h3>
            <div className="content">
              <ul id="toolbox_ul">
                  {options}
              </ul>
            </div>
        </div>
    );
  }
}

export default ToolBox;
