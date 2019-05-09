import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/snippets/javascript';

import 'brace/theme/monokai';

import "brace/ext/language_tools";
import "brace/ext/searchbox";

import styles from '../css/Code.css'

class Code extends Component {

  constructor() {
    super();
    this.state = {
      nonEditableLines: [],
      editorValue: "",
      infoText: ""
    }
  }

  buildEditorValue() {
    var grid = this.props.grid;
    var value = ("var grid = this.Grid(" + grid.lines + "," + grid.columns + "," + grid.backgroundId + ");");
    this.setState({editorValue: value});
  }

  Grid(lines, columns, backgroundId) {
    console.log("grid");
  }

  evalCode() {
    // ici les vérification
    try {
      eval(this.state.editorValue);
      this.setState({infoText: ""});
    }
    catch(error) {
      this.setState({infoText: error.message});
    }
  }

  onChange(newValue, e) {
    var value = this.state.editorValue;
    console.log(newValue);
    console.log(e);
    if(!this.state.nonEditableLines.includes(e.start.row)) {
      value = newValue;
    }
    this.setState({editorValue: value});

    //this.evalCode();
  }

  componentWillReceiveProps() {
    this.buildEditorValue();
  }

  render() {
    return (
        <div className={styles.code}>
            <h3 className="title">Ici le code</h3>
            <div className="content">
              <AceEditor
              placeholder="Placeholder Text"
              mode="javascript"
              theme="monokai"
              name="code-editor"
              onLoad={this.onLoad}
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
              showLineNumbers: true,
              tabSize: 2,
              }}/>
              <div id="info-text">{this.state.infoText}</div>
            </div>
        </div>
    );
  }
}

export default Code;
