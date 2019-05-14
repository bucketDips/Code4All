import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/snippets/javascript';

import 'brace/theme/monokai';

import "brace/ext/language_tools";
import "brace/ext/searchbox";

import styles from './style.css';

class Grid {
  constructor(lines, columns, patternId) {
    this.lines = lines;
    this.columns = columns;
    this.patternId = patternId;
  }

  changePattern(patternId){};
  addElement(element){};

}

class Code extends Component {

  constructor() {
    super();
    this.state = {
      nonEditableLines: [],
      editorValue: "",
      infoText: "",
      fromProps: false,
      fromEdit: false
    }
  }

  componentWillReceiveProps(props){
    if(this.state.fromEdit === true) {
      return;
    }

    this.setState({fromProps: true});
    var str = this.state.editorValue;
    var regex = /var\s+grid\s+=\s+createGrid\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\);{0,1}/g;
    var matching = str.match(regex);
    if(matching != null) {
      var splitted = matching[0].split("(");
      var newStr = "" + splitted[0] + "(" + props.grid.lines + ", " + props.grid.columns + ", " + (props.grid.backgroundId) + ");";
      newStr = this.state.editorValue.replace(matching, newStr);
    }
    else {
      var newStr = this.state.editorValue + 
        "var grid = createGrid(" + props.grid.lines + ", " + props.grid.columns + ", " + (props.grid.backgroundId) + ");";
    }
    this.setState(
      {
        fromProps: false,
        editorValue: newStr
      }
    );
  }

  createGrid(lines, columns, patternId) {
    if(lines > 50 || columns > 50) {
      throw new Error("Max 50 for lines and columns.");
    }

    try {
      var background = process.env.PUBLIC_URL + 'patterns/' + this.props.patterns[patternId - 1].nom;
    }
    catch(error) {}

    let parameters = {
      type: "GRID",
      lines: lines,
      columns: columns,
      background: background,
      backgroundId: patternId
    }

    this.props.changeGridParameters(parameters);
    this.props.changeParametersWindow(parameters);

    return new Grid(lines, columns, patternId);
  }

  evalCode() {
    var createGrid = (lines, columns, backgroundId) => this.createGrid(lines, columns, backgroundId);
    // ici les vérification

    try {
      eval(this.state.editorValue + "\ngrid;");
      this.setState({infoText: ""});
    }
    catch(error) {
      this.setState({infoText: error.message});
    }
  }

  onChange(newValue, e) {
    if(this.state.fromProps === true) {
      return;
    }

    this.setState(
      { 
        fromEdit: true,
        editorValue: newValue 
      }
    );
    
    this.evalCode();
    this.setState({ fromEdit: false });
  }

  render() {
    return (
        <div className={styles.code}>
            <h3 className="title">Ici le code</h3>
            <div className="content">
              <AceEditor
              mode="javascript"
              theme="monokai"
              name="code-editor"
              onChange={this.onChange.bind(this)}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={this.state.editorValue}
              setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              tabSize: 2,
              }}/>
              <div id="info-text">{this.state.infoText}</div>
            </div>
        </div>
    );
  }
}

export default Code;
