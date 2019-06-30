import React, { Component } from 'react';
import ParametersGrid from './ParametersGrid';
import ParametersElement from './ParametersElement'
import styles from './style.css';

/**
 * parameters module of the creationwindow
 */
class Parameters extends Component { 

  /**
   * when changing a variable of the grid
   */
  changeGridParameters(parameters) {
    this.props.changeGridParameters(parameters);
  }

  /**
   * when changing a variable of an element
   */
  changeElementParameters(parameters, type) {
    this.props.changeElementParameters(parameters, type);
  }

  /**
   * when deleting an element
   */
  onDeleteElement(id, type) {
    this.props.deleteElement(id, type);
  }

  /**
   * render the view differently if the user
   * want to modify the grid or an element
   */
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

  /**
   * render method
   */
  render() {
    return (
        <div className={styles.parameters}>
            <div className="content">
              {this.renderSwitch(this.props.parameters)}
            </div>
        </div>
    );
  }
}

export default Parameters;
