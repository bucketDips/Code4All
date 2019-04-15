import React, { Component } from 'react';

import ParametersGrid from './ParametersGrid';
import ParametersBlock from './ParametersBlock';

import styles from '../css/Parameters.css'

class Parameters extends Component { 

  changeGridParameters(parameters) {
    this.props.changeGridParameters(parameters);
  }

  changeBlockParameters(parameters) {
    this.props.changeBlockParameters(parameters);
  }

  onDeleteBlock(id) {
    this.props.deleteBlock(id);
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
          return <ParametersBlock
                    patterns={this.props.patterns}
                    gridProperties={this.props.gridProperties}
                    parameters={parameters}
                    changeBlockParameters={this.changeBlockParameters.bind(this)}
                    deleteBlock={this.onDeleteBlock.bind(this)}
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
