import React, { Component } from 'react';
import styles from './style.css';
import CustomSlider from './CustomSlider'
import consts from '../../Providers/consts';

/**
 * one element of parameters displayed in the parameters
 * module of the creation window 
 */
class ParametersElement extends Component {

  /**
   * action when changing row slider value
   */
  changeRowsValue(e) {
    let params = this.props.parameters;
    params.rowStart = e;
    this.props.changeElementParameters(params, this.props.type);
  }

  /**
   * action when changing column slider value
   */
  changeColumnsValue(e) {
    let params = this.props.parameters;
    params.columnStart = e;
    this.props.changeElementParameters(params, this.props.type);
  }

  /**
   * action when changing the width slider value
   */
  changeWidth(e) {
    let params = this.props.parameters;
    params.width = e;
    this.props.changeElementParameters(params, this.props.type);
  }

  /**
   * action when changing the heigth slider value
   */
  changeHeight(e) {
    let params = this.props.parameters;
    params.height = e;
    this.props.changeElementParameters(params, this.props.type);
  }

  /**
   * action when changing the pattern id dropdown value
   */
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
      params.background = consts.url() + this.props.patterns[e.target.value].nom;
      params.backgroundId = Number(e.target.value);
    }
    this.props.changeElementParameters(params, this.props.type);
  }

  /**
   * action when changing the text input value
   */
  changeTextValue(e) {
    let params = this.props.parameters;
    params.text = (e.target.value === null ? "" : e.target.value);
    this.props.changeElementParameters(params, this.props.type);
  }

  /**
   * action when clicking on delete
   */
  handleDelete(e) {
      e.preventDefault();
      this.props.deleteElement(this.props.parameters.id, this.props.type);
  }

  /**
   * get all the patterns retrieved from the bdd in props
   */
  getPatterns() {
    if(this.props.type === "LABEL") {
      return (<div></div>);
    }
    let patterns = [];
    if(this.props.patterns) {
      Object.values(this.props.patterns).forEach(pattern => {
        if(pattern.id === this.props.parameters.backgroundId) {
          patterns.push(<option selected value={pattern.id}>{pattern.id}</option>)
        }
        else {
          patterns.push(<option value={pattern.id}>{pattern.id}</option>)
        }
      });
    }
    return (
    <div>
      <label>Motif : </label>
      <select id="select" onChange={this.changePatternValue.bind(this)}>
        <option value="0">none</option>
        {patterns}
      </select>
    </div>
    );
  }

  /**
   * get text if the element is a label, otherwise an empty div
   */
  getText() {
    if(this.props.type !== "LABEL") {
      return (<div></div>);
    }
    return (<input type="text" onChange={this.changeTextValue.bind(this)} value={this.props.parameters.text}></input>);
  }

  /**
   * render method
   */
  render() {
    return (
        <div className={styles.parametersblock}>
            <div className="content">
                <label>Colonne : </label>
                <CustomSlider
                    min={1} 
                    max={this.props.gridProperties.columns - this.props.parameters.width + 1} 
                    default={this.props.parameters.columnStart} 
                    changeSize={this.changeColumnsValue.bind(this)}
                />

                <label>Ligne : </label>
                <CustomSlider
                    min={1} 
                    max={this.props.gridProperties.lines - this.props.parameters.height + 1} 
                    default={this.props.parameters.rowStart} 
                    changeSize={this.changeRowsValue.bind(this)}
                />

                <label>Largeur : </label>
                <CustomSlider
                    min={1} 
                    max={this.props.gridProperties.columns - this.props.parameters.columnStart + 1} 
                    default={this.props.parameters.width} 
                    changeSize={this.changeWidth.bind(this)}
                />

                <label>Hauteur : </label>
                <CustomSlider
                    min={1} 
                    max={this.props.gridProperties.lines - this.props.parameters.rowStart + 1}
                    default={this.props.parameters.height} 
                    changeSize={this.changeHeight.bind(this)}
                />

                { this.getPatterns() }
                { this.getText() }

                <form onSubmit={this.handleDelete.bind(this)}>
                    <input type="submit" value="supprimer" />
                </form>
            </div>
        </div>
    );
  }
}

export default ParametersElement;
