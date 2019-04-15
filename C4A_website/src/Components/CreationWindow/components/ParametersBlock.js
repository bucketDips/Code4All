import React, { Component } from 'react';

import styles from '../css/Parameters.css'
import CustomSlider from '../components/CustomSlider'


class ParametersBlock extends Component {

  changeRowsValue(e) {
    let params = this.props.parameters;
    params.rowStart = e;
    this.props.changeBlockParameters(params);
  }

  changeColumnsValue(e) {
    let params = this.props.parameters;
    params.columnStart = e;
    this.props.changeBlockParameters(params);
  }

  changeWidth(e) {
    let params = this.props.parameters;
    params.width = e;
    this.props.changeBlockParameters(params);
  }

  changeHeight(e) {
    let params = this.props.parameters;
    params.height = e;
    this.props.changeBlockParameters(params);
  }

  changePatternValue(e) {
    let params = this.props.parameters;
    if(e.target.value === "0") {
      params.background = process.env.PUBLIC_URL + 'bloc.png';
      params.backgroundId = null;
    }
    else {
      params.background = process.env.PUBLIC_URL + 'patterns/' + this.props.patterns[e.target.value - 1].nom;
      params.backgroundId = Number(e.target.value);
    }
    this.props.changeBlockParameters(params);
  }

  handleDelete(e) {
      this.props.deleteBlock(this.props.parameters.id);
      e.preventDefault();
  }

  render() {
    let patterns;
    if(this.props.patterns) {
      patterns = this.props.patterns.map(pattern => {
        if(pattern.id === this.props.parameters.backgroundId) {
            return (<option selected value={pattern.id}>{pattern.id}</option>)
        }
        else {
            return (<option value={pattern.id}>{pattern.id}</option>)
        }
      });
    }

    return (
        <div className={styles.parametersblock}>
            <div className="content">
                <label>Start column : </label>
                <CustomSlider
                    min={1} 
                    max={this.props.gridProperties.columns - this.props.parameters.width + 1} 
                    default={this.props.parameters.columnStart} 
                    changeSize={this.changeColumnsValue.bind(this)}
                />

                <label>Start row : </label>
                <CustomSlider
                    min={1} 
                    max={this.props.gridProperties.lines - this.props.parameters.height + 1} 
                    default={this.props.parameters.rowStart} 
                    changeSize={this.changeRowsValue.bind(this)}
                />

                <label>Width : </label>
                <CustomSlider
                    min={1} 
                    max={this.props.gridProperties.columns - this.props.parameters.columnStart + 1} 
                    default={this.props.parameters.width} 
                    changeSize={this.changeWidth.bind(this)}
                />

                <label>Height : </label>
                <CustomSlider
                    min={1} 
                    max={this.props.gridProperties.lines - this.props.parameters.rowStart + 1}
                    default={this.props.parameters.height} 
                    changeSize={this.changeHeight.bind(this)}
                />

                <label>Pattern : </label>
                <select id="select" onChange={this.changePatternValue.bind(this)}>
                  <option value="0">none</option>
                  {patterns}
                </select>

                <form onSubmit={this.handleDelete.bind(this)}>
                    <input type="submit" value="delete" />
                </form>
            </div>
        </div>
    );
  }
}

export default ParametersBlock;
