import React, { Component } from 'react';

import ParametersGrid from './ParametersGrid';
import ParametersElement from './ParametersElement'


import styles from './style.css';

class Parameters extends Component { 
  changeGridParameters(parameters) {
    this.props.changeGridParameters(parameters);
  }

  changeElementParameters(parameters, type) {
    this.props.changeElementParameters(parameters, type);
  }

  onDeleteElement(id, type) {
    this.props.deleteElement(id, type);
  }

  renderSwitch(parameters) {
      switch(parameters.type) {
        case 'GRID':
          return <ParametersGrid
                    patterns={this.props.patterns}
                    parameters={parameters} 
                    changeGridParameters={this.changeGridParameters.bind(this)} 
                  />
        case 'BLOCK':
        case 'NPC':
        case 'PC':
        case 'LABEL':
          return <ParametersElement
                    type={parameters.type}
                    patterns={this.props.patterns}
                    gridProperties={this.props.gridProperties}
                    parameters={parameters}
                    changeElementParameters={this.changeElementParameters.bind(this)}
                    deleteElement={this.onDeleteElement.bind(this)}
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
