import consts from '../../Providers/consts';

/**
 * module that compile the code of the student
 * from the editor value
 */
export default class Compilator {
  
  /**
   * constructor
   */
    constructor(gridObject) {
      this.gridObject = gridObject.copy();
      this.states = [];
      this.testsResult = {};
      this.error = null;
    }

    /**
     * build the string of functions definitions
     */
    buildStringOf(functions) {
      var buildedString = "";
      for(var i = 0; i < functions.length; i++) {
        buildedString += functions[i].code + "\n\n";
      }
      return buildedString;
    }

    /**
     * build the string of functions auto calls
     */
    buildTestsCall(tests) {
      var buildedString = "";
      for(var i = 0; i < tests.length; i++) {
        var str = '\nsetTestResult("' + tests[i].name + '", "' + tests[i].description + '", ' + tests[i].name + '());\n';
        buildedString += str;
      }
      return buildedString;
    }

    /**
     * after calling one test, push the result in the state array testResult
     */
    setTestResult(name, description, result){
      this.testsResult[name] = { description: description, result: result };
    }

    /**
     * callable method from the realisation window root
     */
    compile(code) {
      var grid = this.gridObject;
      var functions = this.buildStringOf(grid.functions);
      var tests = this.buildStringOf(grid.tests);
      var testsCalls = this.buildTestsCall(grid.tests);

      this.customEvalOfCode(grid, functions + "\n\n" + code);
      this.customEvalOfTests(grid, this.setTestResult.bind(this), tests + "\n" + testsCalls);

      this.states = grid.states;
    }
    
    /**
     * eval the student code
     */
    customEvalOfCode(grid, buildedCode) {
      try {
        consts.customEvalOfCode(grid, buildedCode);
      }
      catch(error) {
        if(error.message !== undefined && error.message !== "" && error.message !== null) {
          this.error = error.message;
        }
      }
    }

    /**
     * auto eval of the founded tests
     */
    customEvalOfTests(grid, setTestResult, buildedCode) {
      if(this.error) return;
      try {
        consts.customEvalOfTests(grid, setTestResult, buildedCode);
      }
      catch(error) {
        if(this.error === null && error.message !== undefined && error.message !== "" && error.message !== null) {
          this.error = error.message;
        }
      }
    }
}