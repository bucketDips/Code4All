import React, { Component } from 'react';

import styles from '../css/ToolBox.css'

class ToolBoxElement extends Component {
  render() {
    return (
      <li className={styles.toolboxelement}>
        <div className="name">{this.props.element.title}</div>
        <img alt={this.props.element.title} className="image" src={this.props.element.image}/>
        <span className="tooltiptext">{this.props.element.description}</span>
      </li>
    );
  }
}

export default ToolBoxElement;
