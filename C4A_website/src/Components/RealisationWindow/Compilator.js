import { Grid, Block, Npc, Pc, Label, Func } from '../CreationWindow/CodeClasses';
import { func } from 'prop-types';
import consts from '../../Providers/consts';

export default class Compilator {
  
    constructor(gridObject) {
      this.gridObject = gridObject.copy();
      this.states = [];
      this.testsResult = {};
      this.error = null;
    }

    iterationCopy(src) {
      let target = {};
      for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
          target[prop] = src[prop];
        }
      }
      return target;
    }

    buildStringOf(functions) {
      var buildedString = "";
      for(var i = 0; i < functions.length; i++) {
        buildedString += functions[i].code + "\n\n";
      }
      return buildedString;
    }

    buildTestsCall(tests) {
      var buildedString = "";
      for(var i = 0; i < tests.length; i++) {
        var str = '\nsetTestResult("' + tests[i].name + '", "' + tests[i].description + '", ' + tests[i].name + '());\n';
        buildedString += str;
      }
      return buildedString;
    }

    saveState() {
      this.states.push(JSON.parse(JSON.stringify(this.gridObject)));
    }

    setTestResult(name, description, result){
      this.testsResult[name] = { description: description, result: result };
    }

    compile(code) {
      var grid = this.gridObject;
      var functions = this.buildStringOf(grid.functions);
      var tests = this.buildStringOf(grid.tests);
      var testsCalls = this.buildTestsCall(grid.tests);

      var end = (message) => {
        throw new Error(message);
      }

      this.customEvalOfCode(grid, this.saveState.bind(this), end, functions + "\n\n" + code);
      this.customEvalOfTests(grid, this.setTestResult.bind(this), tests + "\n" + testsCalls);
    }
    
    customEvalOfCode(grid, saveState, end, buildedCode) {
      try {
        consts.customEvalOfCode(grid, saveState, end, buildedCode);
      }
      catch(error) {
        if(error.message !== undefined && error.message !== "" && error.message !== null) {
          this.error = error.message + error.stack;
        }
      }
    }

    customEvalOfTests(grid, setTestResult, buildedCode) {
      if(this.error) return;
      try {
        consts.customEvalOfTests(grid, setTestResult, buildedCode);
      }
      catch(error) {
        if(this.error === null && error.message !== undefined && error.message !== "" && error.message !== null) {
          this.error = error.message + error.stack;
        }
      }
    }
}