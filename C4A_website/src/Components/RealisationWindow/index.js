import React, { Component } from 'react';
import Grid from './Grid';
import Code from './Code';
import Compilator from './Compilator';
import TestsResults from './TestsResults';

import { Input } from 'antd';
import style from './style.css';
import { Button } from 'antd/lib/radio';

const TextArea = Input.TextArea;



class RealisationExerciseWindow extends Component {

  constructor() {
    super();
    this.state = {
      gridProperties: {},
      blocks: [],
      npcs: [],
      pcs: [],
      labels: [],
      tests: [],
      code: "",
      buttonCompile: true,
      load: false
    }
  }

  getUrlForPatternId(id) {
    for(var i = 0; i < this.props.bundle.fichiers.length; i++) {
      if(this.props.bundle.fichiers[i].id === id) {
        return this.props.bundle.fichiers[i].url;
      }
    }
    throw new Error("Pas de background pour cette image");
  }

  componentWillMount() {
    this.setState({
      gridProperties: {
        lines: this.props.bundle.rows,
        columns: this.props.bundle.columns,
        size: 30,
        cases: [],
        background: this.getUrlForPatternId(this.props.bundle.patternId),
      },
      blocks: this.props.bundle.blocks,
      npcs: this.props.bundle.npcs,
      pcs: this.props.bundle.pcs,
      labels: this.props.bundle.labels,
      tests: this.props.bundle.tests
    });
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState.code === this.state.code;
  }

  changeCode(newCode) {
    this.setState({code: newCode});
    if(this.state.buttonCompile){
      this.setNewState(this.props.bundle.gridObject);
    }
  }

  setNewState(newState) {
    this.setState({
      gridProperties: {
        lines: newState.lines,
        columns: newState.columns,
        size: this.state.gridProperties.size,
        cases: this.state.gridProperties.cases,
        background: this.getUrlForPatternId(newState.patternId)
      },
      blocks: newState.blocks,
      npcs: newState.npcs,
      pcs: newState.pcs,
      labels: newState.labels
    })
  }
  
  displayResults(error, results) {
    var tests = this.state.tests;
    for(var i = 0; i < tests.length; i++) {
      if(error) {
        tests[i].result = [false, error];
      }
      else {
        tests[i].result = results[tests[i].name].result;
      }
    }
    this.setState({tests: tests});
  }

  compile() {
    this.setNewState(this.props.bundle.gridObject);
    this.setState({buttonCompile: false, load: true});
    var compilator = new Compilator(this.props.bundle.gridObject);
    compilator.compile(this.state.code);

    for(var i = 0; i < compilator.states.length; i++) {
      setTimeout(this.setNewState.bind(this, compilator.states[i]), 500 * i); 
    }
    setTimeout(() => { this.setState({buttonCompile: true, load: false});}, 500 * compilator.states.length + 1);
    setTimeout(() => { this.displayResults(compilator.error, compilator.testsResult); }, 500 * compilator.states.length + 1);
  }

  render() {
    if(this.state.buttonCompile) {
      var buttonCompile = (<Button style={{flex: 1}} onClick={this.compile.bind(this)}>compiler</Button>);
    }
    else {
      var buttonCompile = (<Button style={{flex: 1}} onClick={this.compile.bind(this)} disabled>compiler</Button>);
    }
    return (
        <div className={style.app}>
            <div className={style.left_panel}>
                <Grid 
                    parameters={this.state.gridProperties}
                    blocks={this.state.blocks}
                    npcs={this.state.npcs}
                    pcs={this.state.pcs}
                    labels={this.state.labels}
                    getUrlForPatternId={this.getUrlForPatternId.bind(this)}
                />
                <div className={style.tests}>
                  <TestsResults load={this.state.load} tests={this.state.tests} />
                </div>
            </div>
            <div className={style.right_panel}>
                <Code changeCode={this.changeCode.bind(this)} />
                <div className={style.description}>
                  <TextArea className={style.textArea} rows={4} defaultValue={this.props.bundle.description} disabled />
                  {buttonCompile}
                </div>
            </div>
        </div>
    );
  }
}

export default RealisationExerciseWindow;