import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/snippets/javascript';

import 'brace/theme/monokai';

import "brace/ext/language_tools";
import "brace/ext/searchbox";

import styles from './style.css';
import { Grid, Block } from './CodeClasses';

class Code extends Component {

  constructor() {
    super();
    this.state = {
      timeout: null,
      nonEditableLines: [],
      editorValue: "",
      infoText: "",
      fromProps: false,
      fromEdit: false
    }
  }

  displayGrid(props) {
    var str = this.state.editorValue;
    var regex = /var\s+grid\s+=\s+createGrid\(.*\);{0,1}/g;
    var matching = str.match(regex);
    if(matching != null) {
      var splitted = matching[0].split("(");
      var newStr = "" + splitted[0] + "(" + props.grid.lines + ", " + props.grid.columns + ", " + (props.grid.backgroundId) + ");";
      newStr = this.state.editorValue.replace(matching, newStr);
    }
    else {
      newStr = "var grid = createGrid(" + props.grid.lines + ", " + props.grid.columns + ", " + (props.grid.backgroundId) + ");\n" 
        + this.state.editorValue;
    }

    return newStr;
  }

  getNameForANewBlock(newStr) {
    for(var i = 0; i < 10000000; i++) {
      if(newStr.match("block" + i)) {
        continue;
      }
      else {
        return "block" + i;
      }
    }
  }

  displayBlock(block, newStr) {
    console.log(block);
    var regexCreation = new RegExp("var\\s+.+\\s+=\\s+createBlock\\(\\s*" + block.id + "\\s*,\\s*.*\\s*\\);{0,1}", "g");
    var regexAdding = /grid.addBlock();{0,1}/g;

    var matching = newStr.match(regexCreation);

    if(matching != null) {
      var nameBlock =  matching[0].split(/\s+|=/)[1];
      var realBuiltStr = ("var " + nameBlock + " = createBlock(" 
        + block.id + ", " 
        + block.rowStart + ", " 
        + block.columnStart + ", " 
        + block.width + ", " 
        + block.height + ", " 
        + (block.backgroundId) 
        + ");");
      return newStr.replace(matching[0], realBuiltStr);
    }
    else {
      var nameBlock = this.getNameForANewBlock(newStr);
      var realBuiltStr = ("var " + nameBlock + " = createBlock(" 
        + block.id + ", " 
        + block.rowStart + ", " 
        + block.columnStart + ", " 
        + block.width + ", " 
        + block.height + ", " 
        + (block.backgroundId) 
        + ");");
      return newStr + "\n" + realBuiltStr;
    }

    return newStr;
  }

  displayBlocks(props, newStr) {
    for (var key in props.blocks) {
      newStr = this.displayBlock(props.blocks[key], newStr);
    }
    return newStr;
  }

  componentWillReceiveProps(props){
    if(this.state.fromEdit === true || this.state.editorValue === undefined) {
      return;
    }

    this.setState({fromProps: true});
    
    var newStr = this.displayGrid(props);
    newStr = this.displayBlocks(props, newStr);

    this.setState(
      {
        fromProps: false,
        editorValue: newStr
      }
    );
  }

  getBackground(patternId) {
    try {
      return process.env.PUBLIC_URL + 'patterns/' + this.props.patterns[patternId - 1].nom;
    }
    catch(error) {
      return null;
    }
  }

  createGrid(lines, columns, patternId) {
    if(lines > 50 || columns > 50) {
      throw new Error("Max 50 for lines and columns.");
    }

    var background = this.getBackground(patternId);

    let parameters = {
      type: "GRID",
      lines: lines,
      columns: columns,
      background: background,
      backgroundId: patternId
    }

    this.props.changeGridParameters(parameters);

    return new Grid(lines, columns, patternId);
  }

  createBlock(id, row, column, width, height, patternId) {
    return new Block(id, row, column, width, height, patternId);
  }

  getDisplayBlockCode() {
    return `
      var blocks = grid.getBlocks();
      this.props.modifyBlocks(blocks);
    `;
  }

  evalCode() {
    var createGrid = (lines, columns, backgroundId) => this.createGrid(lines, columns, backgroundId);
    var createBlock = (id, row, column, width, height, patternId) => this.createBlock(id, row, column, width, height, patternId);
    // ici les vérification

    try {
      eval(this.state.editorValue + "\ngrid;" + this.getDisplayBlockCode());
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
    this.setState({editorValue: newValue});
    clearTimeout(this.state.timeout);
    this.setState({timeout: setTimeout(() => {
      this.setState(
        { 
          fromEdit: true,
        }
      );
  
      this.props.changeParametersWindow({
        type: "NONE"
      });
      
      this.evalCode();
      this.setState({ fromEdit: false });
    }, 1000)})
    if(this.state.fromProps === true) {
      return;
    }
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
