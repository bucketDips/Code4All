import { Grid, Block, Npc, Pc, Label, Func } from '../CreationWindow/CodeClasses';
import { func } from 'prop-types';

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

    compile(code) {
      var grid = this.gridObject;
      var functions = this.buildStringOf(grid.functions);
      var tests = this.buildStringOf(grid.tests);
      var testsCalls = this.buildTestsCall(grid.tests);

      var saveState = () => { this.states.push(JSON.parse(JSON.stringify(grid))); }
      var end = (message) => {
        throw new Error(message);
      }
      var setTestResult = (name, description, result) => { this.testsResult[name] = { description: description, result: result }; }

      this.customEvalOfCode(grid, saveState, end, functions + "\n\n" + code);
      this.customEvalOfTests(grid, setTestResult, tests + "\n" + testsCalls);

      console.log(this.testsResult);
    }
    
    customEvalOfCode(grid, saveState, end, buildedCode) {
      try {
        // eslint-disable-next-line
        eval(buildedCode);
      }
      catch(error) {
        if(error.message !== undefined && error.message !== "" && error.message !== null) {
          this.error = error.message;
        }
      }
    }

    customEvalOfTests(grid, setTestResult, buildedCode) {
      console.log(buildedCode);
      if(this.error) return;
      try {
        // eslint-disable-next-line
        eval(buildedCode);
      }
      catch(error) {
        console.log(error);
        if(error.message !== undefined && error.message !== "" && error.message !== null) {
          this.error = error.message;
        }
      }
    }
}