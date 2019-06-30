import React, { Component } from 'react';
import Grid from './Grid';
import Code from './Code';
import Compilator from './Compilator';
import TestsResults from './TestsResults';

import { Input, notification, Modal } from 'antd';
import style from './style.css';
import { Button } from 'antd/lib/radio';
import exercices from '../../Providers/exercices';

const TextArea = Input.TextArea;
const confirm = Modal.confirm;


class RealisationExerciseWindow extends Component {

  constructor() {
    super();
    this.state = {
      gridProperties: {size: 30},
      blocks: [],
      npcs: [],
      pcs: [],
      labels: [],
      tests: [],
      files: {},
      code: "",
      buttonCompile: true,
      load: false
    }
  }

  getUrlForPatternId(id) {
    return this.state.files[id];
  }

  initFiles() {
    var files = {};

    for(var i = 0; i < this.props.bundle.fichiers.length; i++) {
      if(!this.props.bundle.id){
        files[this.props.bundle.fichiers[i].id] = this.props.bundle.fichiers[i].url;
      }
      else {
        files[this.props.bundle.fichiers[i].id] = "http://" + this.props.bundle.fichiers[i].url;
      }
    }
    return files;
  }

  init(code, tests) {
    var initedTests = JSON.parse(JSON.stringify(this.props.bundle.tests));
    if(tests !== null) {
      for(var i = 0; i < initedTests.length; i++) {
        for(var j = 0; j < tests.length; j++) {
          if(tests[j].name === initedTests[i].name) {
            initedTests[i].result = [true, ""];
          }
        }
        if(initedTests[i].result === undefined) {
          initedTests[i].result = [false, ""];
        }
      }
    }

    var initedFiles = this.initFiles();
    this.setState({
        files: initedFiles,
        gridProperties: {
          lines: this.props.bundle.rows,
          columns: this.props.bundle.columns,
          size: 30,
          cases: [],
          background: initedFiles[this.props.bundle.patternId],
        },
        blocks: this.props.bundle.blocks,
        npcs: this.props.bundle.npcs,
        pcs: this.props.bundle.pcs,
        labels: this.props.bundle.labels,
        tests: initedTests,
        code: code,
    });
  }

  componentWillMount() {
    if(this.props.bundle === null || this.props.bundle === undefined) {
      return;
    }

    if(this.props.bundle.id) {
      exercices.getCodeForExercice(this.props.bundle.id, this.init.bind(this));  
    }
    else {
      this.init("", null);
    }
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

    if(tests.length === 0) {
      if(error) {
        notification["error"]({
          message: 'Résultats des tests',
          description: 'Aucun tests de programmé, mais une erreur est survenue pendant le jeu !\nErreur : ' + error,
        });
      }
      else {
        notification["warning"]({
          message: 'Résultats des tests',
          description: 'Aucun tests de programmé !',
        });
      }
    }
    else {
      if(error) {
        notification["error"]({
          message: 'Résultats des tests',
          description: 'Plusieurs tests de programmé, mais une erreur est survenue pendant le jeu !\nErreur : ' + error,
        });
        return;
      }
      var errors = 0;
      for(var i = 0; i < tests.length; i++) {
        if(tests[i].result[0] === false) {
          errors += 1;
        }
      }
      if(errors > 0) {
        notification["error"]({
          message: 'Résultats des tests',
          description: 'Seulement ' + (tests.length - errors) + ' tests passés sur ' + tests.length,
        });
      }
      else {
        notification["success"]({
          message: 'Résultats des tests',
          description: 'Tous les tests sont passés !',
        });
      }
    }
  }

  unfork(element) {
    confirm({
      title: 'Etes-vous sûr de vouloir supprimer cet exercice ? Il ne sera plus utilisable dans vos classes.',
      onOk() {
        exercices.deleteExercice(element.props.bundle.id);
      },
      onCancel() {
      },
    });
  }

  compile() {
    this.setNewState(this.props.bundle.gridObject);
    this.setState({buttonCompile: false, load: true});
    var compilator = new Compilator(this.props.bundle.gridObject);
    compilator.compile(this.state.code);

    for(var i = 0; i < compilator.states.length; i++) {
      setTimeout(this.setNewState.bind(this, compilator.states[i]), 350 * i); 
    }
    setTimeout(() => { this.setState({buttonCompile: true, load: false});}, 350 * compilator.states.length + 1);
    setTimeout(() => { this.displayResults(compilator.error, compilator.testsResult); }, 350 * compilator.states.length + 1);

    if(this.props.bundle.id) {
      exercices.setNewCodeForExercice(this.props.bundle.id, this.state.code);
      var keys = Object.keys(compilator.testsResult);
      var winnedTests = [];
      for(var i = 0; i < keys.length; i++) {
        if(compilator.testsResult[keys[i]].result[0]) {
          winnedTests.push(keys[i]);
        }
      }
      exercices.uploadTestsForExercice(this.props.bundle.id, winnedTests);
    }
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
                <Code changeCode={this.changeCode.bind(this)} code={this.state.code} />
                <div className={style.description}>
                  <TextArea className={style.textArea} rows={4} defaultValue={this.props.bundle.description} disabled />
                  <div style={{flex: 1, display: "flex", flexDirection: "row"}}>
                    {buttonCompile}
                    {this.props.fork && 
                      <Button style={{flex: 1}} onClick={this.unfork.bind(this, this)}>unfork</Button>
                    }
                  </div>
                </div>
            </div>
        </div>
    );
  }
}

export default RealisationExerciseWindow;