import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/snippets/javascript';

import 'brace/theme/monokai';

import "brace/ext/language_tools";
import "brace/ext/searchbox";

import styles from './style.css';
import { Grid, Block, Npc, Pc, Label } from './CodeClasses';
import CustomSlider from './CustomSlider';

class Code extends Component {

  constructor() {
    super();
    this.state = {
      timeout: null,
      nonEditableLines: [],
      editorValue: "",
      infoText: "",
      fromProps: false,
      fromEdit: false,
      fontSize: 14,
      gridObject: null
    }
  }

  changeSizeValue(newSize) {
    this.setState({fontSize: newSize});
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

  getNameForANewElement(newStr, type) {
    for(var i = 0; i < 10000000; i++) {
      var lowered = type.toLowerCase();
      if(newStr.match("\\s" + lowered + i)) {
        continue;
      }
      else {
        return lowered + i;
      }
    }
  }

  getRealBuiltStringForElement(nameElement, element, type) {
    return ("var " + nameElement + " = create" + type + "(" 
    + element.id + ", " 
    + element.rowStart + ", " 
    + element.columnStart + ", " 
    + element.width + ", " 
    + element.height + ", " 
    + (type !== "Label" ? element.backgroundId : "'" + element.text + "'") 
    + ");");
  }

  displayElement(element, newStr, type) {
    var nameElement = "";
    var regexCreation = new RegExp("var\\s+.+\\s+=\\s+create" + type + "\\(\\s*" + element.id + "\\s*,\\s*.*\\s*\\);{0,1}", "g");
    var creationMatching = newStr.match(regexCreation);

    // creation treatment
    if(creationMatching != null) {
      nameElement =  creationMatching[0].split(/\s+|=/)[1];
      var realBuiltStr = this.getRealBuiltStringForElement(nameElement, element, type);
      newStr = newStr.replace(creationMatching[0], realBuiltStr);
    }
    else {
      nameElement = this.getNameForANewElement(newStr, type)
      realBuiltStr = this.getRealBuiltStringForElement(nameElement, element, type);
      newStr = newStr + "\n" + realBuiltStr;
    }

    var regexAdding = new RegExp("grid.add" + type + "\\(\\s*" + nameElement + "\\s*\\);{0,1}", "g");
    var addingMatching = newStr.match(regexAdding);

    // adding treatment
    if(addingMatching != null) {
      return newStr;
    }
    else {
      creationMatching = newStr.match(regexCreation)[0];
      return newStr.replace(creationMatching, creationMatching + ("\ngrid.add" + type + "(" + nameElement + ");\n"));
    }
  }

  displayElements(props, newStr) {
    for (var keyBlock in props.blocks) {
      newStr = this.displayElement(props.blocks[keyBlock], newStr, "Block");
    }
    for (var keyNpc in props.npcs) {
      newStr = this.displayElement(props.npcs[keyNpc], newStr, "Npc");
    }
    for (var keyPc in props.pcs) {
      newStr = this.displayElement(props.pcs[keyPc], newStr, "Pc");
    }
    for (var keyLabel in props.labels) {
      newStr = this.displayElement(props.labels[keyLabel], newStr, "Label");
    }
    return newStr;
  }

  componentWillReceiveProps(props){
    if(props.delete){
      this.delete(props.delete.id, props.delete.type);
      props.resetDelete();
      return;
    }

    if(this.state.fromEdit === true || this.state.editorValue === undefined) {
      return;
    }

    this.setState({fromProps: true});

    if(this.props.delete) {
      this.delete(this.props.delete.id, this.props.delete.type);
      this.props.resetDelete();
    }
    
    var newStr = this.displayGrid(props);
    newStr = this.displayElements(props, newStr);

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

  createNpc(id, row, column, width, height, patternId) {
    return new Npc(id, row, column, width, height, patternId);
  }

  createPc(id, row, column, width, height, patternId) {
    return new Pc(id, row, column, width, height, patternId);
  }

  createLabel(id, row, column, width, height, text) {
    return new Label(id, row, column, width, height, text);
  }

  synchronise(grid) {
      this.setState(
        {
          fromEdit: true,
          gridObject: grid
        });
      var blocks = grid.getBlocks();
      var npcs = grid.getNpcs();
      var pcs = grid.getPcs();
      var labels = grid.getLabels();
      this.props.synchroniseElements(blocks, npcs, pcs, labels);
      this.setState({fromEdit: false});

      console.log(this.state.gridObject);
  }

  evalCode() {
    // eslint-disable-next-line
    var createGrid = (lines, columns, backgroundId) => this.createGrid(lines, columns, backgroundId);
    // eslint-disable-next-line
    var createBlock = (id, row, column, width, height, patternId) => this.createBlock(id, row, column, width, height, patternId);
    // eslint-disable-next-line
    var createNpc = (id, row, column, width, height, patternId) => this.createNpc(id, row, column, width, height, patternId);
    // eslint-disable-next-line
    var createPc = (id, row, column, width, height, patternId) => this.createPc(id, row, column, width, height, patternId);
    // eslint-disable-next-line
    var createLabel = (id, row, column, width, height, text) => this.createLabel(id, row, column, width, height, text);
    // eslint-disable-next-line
    var synchronise = (grid) => this.synchronise(grid);
    // ici les vérification

    try {
      // eslint-disable-next-line
      eval(this.state.editorValue + "\ngrid; synchronise(grid);");
      this.setState({infoText: ""});
    }
    catch(error) {
      this.setState({infoText: error.message});
    }

    console.log(JSON.stringify(this.state.gridObject));
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

  delete(id, type) {
    var nameElement = "";
    var val = this.state.editorValue;
    var formattedType = type.toLowerCase();
    formattedType = formattedType.charAt(0).toUpperCase() + formattedType.slice(1);

    var regexCreation = new RegExp("var\\s+.+\\s+=\\s+create" + formattedType + "\\(\\s*" + id + "\\s*,\\s*.*\\s*\\);{0,1}[\n\r]*", "g");
    var creationMatching = val.match(regexCreation);

    if(creationMatching != null) {
      nameElement =  creationMatching[0].split(/\s+|=/)[1];
      val = val.replace(creationMatching[0], "");
    }

    var regexAdding = new RegExp("grid.add" + formattedType + "\\(\\s*" + nameElement + "\\s*\\);{0,1}[\n\r]*", "g");
    var addingMatching = val.match(regexAdding);

    if(addingMatching != null) {
      val = val.replace(addingMatching[0], "");
    }

    this.setState({editorValue: val});
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
              fontSize={this.state.fontSize}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={this.state.editorValue}
              editorProps={{
                $blockScrolling: Infinity
              }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                tabSize: 2
              }}/>
              <div id="info-text">{this.state.infoText}</div>
            </div>
            <CustomSlider className="custom-slider-code" changeSize={this.changeSizeValue.bind(this)} min={5} max={100} default={this.state.fontSize}/>
        </div>
    );
  }
}

export default Code;
