import React, { Component } from 'react';

import styles from './style.css';
import CustomSlider from './CustomSlider'


class ParametersElement extends Component {

  changeRowsValue(e) {
    let params = this.props.parameters;
    params.rowStart = e;
    this.props.changeElementParameters(params, this.props.type);
  }

  changeColumnsValue(e) {
    let params = this.props.parameters;
    params.columnStart = e;
    this.props.changeElementParameters(params, this.props.type);
  }

  changeWidth(e) {
    let params = this.props.parameters;
    params.width = e;
    this.props.changeElementParameters(params, this.props.type);
  }

  changeHeight(e) {
    let params = this.props.parameters;
    params.height = e;
    this.props.changeElementParameters(params, this.props.type);
  }

  changePatternValue(e) {
    switch(this.props.type) {
      case 'BLOCK':
        var img = "bloc.png";
        break;
      case 'NPC':
        img = "fighting_stickman.png";
        break;
      case 'PC':
        img = "stickman.png";
        break;
      default:
          throw new Error("Element type not recognized");
    }
    let params = this.props.parameters;
    if(e.target.value === "0") {
      params.background = process.env.PUBLIC_URL + img;
      params.backgroundId = null;
    }
    else {
      params.background = process.env.PUBLIC_URL + 'patterns/' + this.props.patterns[e.target.value - 1].nom;
      params.backgroundId = Number(e.target.value);
    }
    this.props.changeElementParameters(params, this.props.type);
  }

  changeTextValue(e) {
    let params = this.props.parameters;
    params.text = (e.target.value === null ? "" : e.target.value);
    this.props.changeElementParameters(params, this.props.type);
  }

  handleDelete(e) {
      e.preventDefault();
      this.props.deleteElement(this.props.parameters.id, this.props.type);
  }

  getPatterns() {
    if(this.props.type === "LABEL") {
      return (<div></div>);
    }
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
    <div>
      <label>Pattern : </label>
      <select id="select" onChange={this.changePatternValue.bind(this)}>
        <option value="0">none</option>
        {patterns}
      </select>
    </div>
    );
  }

  getText() {
    if(this.props.type !== "LABEL") {
      return (<div></div>);
    }
    return (<input type="text" onChange={this.changeTextValue.bind(this)} value={this.props.parameters.text}></input>);
  }

  render() {

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

                { this.getPatterns() }
                { this.getText() }

                <form onSubmit={this.handleDelete.bind(this)}>
                    <input type="submit" value="delete" />
                </form>
            </div>
        </div>
    );
  }
}

export default ParametersElement;
