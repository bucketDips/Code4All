import React, { Component } from 'react';

import ParametersGrid from './ParametersGrid';

import styles from '../css/Parameters.css'

class Parameters extends Component { 

  changeGridParameters(parameters) {
    this.props.changeGridParameters(parameters);
  }

  renderSwitch(parameters) {
      switch(parameters.type) {
        case 'GRID':
          return <ParametersGrid
                    patterns={this.props.patterns}
                    parameters={parameters} 
                    changeGridParameters={this.changeGridParameters.bind(this)} 
                  />
        case 'NONE':
          return <div></div>;
        default:
          return <div>An error has occured</div>;
      }
  }

  render() {
    return (
        <div className={styles.parameters}>
            <h3 className="title">Ici les paramètres</h3>
            <div className="content">
              {this.renderSwitch(this.props.parameters)}
            </div>
        </div>
    );
  }
}

export default Parameters;
