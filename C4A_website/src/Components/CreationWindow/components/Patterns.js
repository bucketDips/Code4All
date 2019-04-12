import React, { Component } from 'react';
import styles from '../css/Patterns.css'

import Pattern from './Pattern';

class Patterns extends Component {

  handleDeletePattern(patternId) {
    this.props.deletePattern(patternId);
  }

  render() {
    let patterns;
    if(this.props.patterns) {
        patterns = this.props.patterns.map(pattern => {
            return (<Pattern key={pattern.id} id={pattern.id} image={pattern.nom} deletePattern={this.handleDeletePattern.bind(this)}/>)
        });
    }

    
    return (
        <div className={styles.patterns}>
            <h3 className="title">Ici les patterns</h3>
            <div className="content">
              <div className="patterns-content">
                {patterns}
              </div>
            </div>
        </div>
    );
  }
}

export default Patterns;
