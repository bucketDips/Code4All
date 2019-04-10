import React, { Component } from 'react';

import styles from '../css/Parameters.css'
import CustomSlider from '../components/CustomSlider'


class ParametersGrid extends Component {

  changeLinesValue(e) {
    let params = this.props.parameters;
    params.lines = e;
    this.props.changeGridParameters(params);
  }

  changeColumnsValue(e) {
    let params = this.props.parameters;
    params.columns = e;
    this.props.changeGridParameters(params);
  }

  render() {
    return (
        <div className={styles.parametersgrid}>
            <div className="content">
                <label>Lignes : </label>
                <CustomSlider
                    changeSize={this.changeLinesValue.bind(this)} 
                    min={1} 
                    max={50} 
                    default={this.props.parameters.lines} 
                />

                <label>Colonnes : </label>
                <CustomSlider
                    changeSize={this.changeColumnsValue.bind(this)} 
                    min={1} 
                    max={50} 
                    default={this.props.parameters.columns} 
                />
            </div>
        </div>
    );
  }
}

export default ParametersGrid;
