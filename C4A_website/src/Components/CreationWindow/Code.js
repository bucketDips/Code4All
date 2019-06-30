import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/snippets/javascript';
import 'brace/theme/monokai';
import "brace/ext/language_tools";
import "brace/ext/searchbox";
import styles from './style.css';
import { Grid, Block, Npc, Pc, Label, Func } from './CodeClasses';
import CustomSlider from './CustomSlider';
// eslint-disable-next-line
import consts from '../../Providers/consts';

/**
 * class correspond to the ace editor in the creationwindow
 */
class Code extends Component {

  /**
   * constructor
   */
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

  /**
   * action called by the customslider,
   * modify the size of the code
   */
  changeSizeValue(newSize) {
    this.setState({fontSize: newSize});
  }

  /**
   * find the "var grid = etc.." in the grid and
   * modify it with the configuration of the grid from
   * props, if not found create it with this configuration
   */
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
      newStr = "var grid = createGrid(" + props.grid.lines + ", " + props.grid.columns + ", " + (props.grid.backgroundId) + ");\r\n" 
        + this.state.editorValue;
    }
    return newStr;
  }

  /**
   * find a new name for an element (block, npc, etc),
   * by regexing names + i in the editor values and
   * incrementing i
   */
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

  /**
   * return the string representing the
   * creation of an element in the editor value,
   * depending of the name of the element and
   * the configuration of it
   */
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

  /**
   * full display of an element from the props
   * in the editor value (finding it, change it, or
   * if not found creating it)
   */
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
      newStr = newStr + "\r\n" + realBuiltStr;
    }

    var regexAdding = new RegExp("grid.add" + type + "\\(\\s*" + nameElement + "\\s*\\);{0,1}", "g");
    var addingMatching = newStr.match(regexAdding);

    // adding treatment
    if(addingMatching != null) {
      return newStr;
    }
    else {
      creationMatching = newStr.match(regexCreation)[0];
      return newStr.replace(creationMatching, creationMatching + ("\r\ngrid.add" + type + "(" + nameElement + ");\r\n"));
    }
  }

  /**
   * display of differents elements from props
   */
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

  /**
   * if code from props, it's an exercice
   * retrieved from the database, so the
   * editor value change for this code and
   * auto compile
   */
  componentWillMount() {
    if(this.props.code) {
      var newCode = this.props.code;

      this.props.changeEditorValue(this.props.code);
      this.setState({editorValue: newCode}, () => {
        this.evalCode(true);
        this.onChange(newCode, null);
      });
    }
  }

  /**
   * new props from the parameters module of this window or
   * from the toolbox, displaying it in this module 
   */
  componentWillReceiveProps(props){
    // if error, don't display
    if(this.state.infoText) {
      return;
    }

    // if delete, deleting the element and don't display
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

    if(newStr !== this.state.editorValue) {
      this.props.changeEditorValue(newStr);
    }

    this.setState(
      {
        fromProps: false,
        editorValue: newStr
      }, () => {
        this.evalCode(true);
      }
    );

    
  }

  /**
   * get the background name with the pattern id, of a pattern
   * retrieved from the database
   */
  getBackground(patternId) {
    try {
      return consts.url() + this.props.patterns[patternId].nom;
    }
    catch(error) {
      return null;
    }
  }

  /**
   * method called from the teacher code to create the grid object
   */
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

  /**
   * method called from the teacher code to create a block object
   */
  createBlock(id, row, column, width, height, patternId) {
    return new Block(id, row, column, width, height, patternId);
  }

  /**
   * method called from the teacher code to create a npc object
   */
  createNpc(id, row, column, width, height, patternId) {
    return new Npc(id, row, column, width, height, patternId);
  }

  /**
   * method called from the teacher code to create a pc object
   */
  createPc(id, row, column, width, height, patternId) {
    return new Pc(id, row, column, width, height, patternId);
  }

  /**
   * method called from the teacher code to create a label object
   */
  createLabel(id, row, column, width, height, text) {
    return new Label(id, row, column, width, height, text);
  }

  /**
   * method called from the teacher code to create a function object
   */
  createFunction(name, code, description) {
    return new Func(name, String(code), description);
  }

  /**
   * synchronise the grid object from the code with the grid module
   * of the window
   */
  synchronise(grid) {
      this.setState(
      {
        fromEdit: true,
        gridObject: grid
      });
      this.props.changeGridObject(grid);
      var blocks = grid.getBlocks();
      var npcs = grid.getNpcs();
      var pcs = grid.getPcs();
      var labels = grid.getLabels();
      var functions = grid.getFunctions();
      var tests = grid.getTests();
      this.props.synchroniseElements(blocks, npcs, pcs, labels, functions, tests);
      this.setState({fromEdit: false});
  }

  /**
   * eval the code in this module with passing
   * methods of elements creation and synchronise
   */
  evalCode(fromProps) {
    try {
      var toEval = this.state.editorValue + (fromProps ? "\ngrid; changeGridObject(grid);" : "\ngrid; synchronise(grid);");
      
      consts.customEval(
        toEval,
        this.createGrid.bind(this),
        this.createBlock.bind(this),
        this.createNpc.bind(this),
        this.createPc.bind(this),
        this.createLabel.bind(this),
        this.createFunction.bind(this),
        this.synchronise.bind(this),
        this.props.changeGridObject.bind(this)
      )

      if(fromProps) { return }

      this.setState({infoText: ""});
      this.props.changeInfoText("");
    }
    catch(error) {
      this.setState({infoText: error.message});
      this.props.changeInfoText(error.message);
    }
  }

  /**
   * action for the teacher changing the editor value
   */
  onChange(newValue, e) {
    if(this.state.fromProps === true) {
      return;
    }

    if(newValue !== this.state.editorValue) {
      this.props.changeEditorValue(newValue);
    }

    this.setState({editorValue: newValue});

    // using a timeout to not compile and slow down the editor
    clearTimeout(this.state.timeout);
    this.setState({timeout: setTimeout(() => {
      this.setState(
        { 
          fromEdit: true,
        }
      );

      this.evalCode(false);

      // reload the parameters module of the window
      this.props.changeParametersWindow({
        type: "NONE"
      });
    
      this.setState({ fromEdit: false });

    }, 1000)})
    if(this.state.fromProps === true) {
      return;
    }
  }

  /**
   * deleting an element from the props (creation and adding method
   * to delete)
   */
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

    if(val !== this.state.editorValue) {
      this.props.changeEditorValue(val);
    }

    this.setState({editorValue: val});
  }

  /**
   * render method
   */
  render() {
    return (
        <div className={styles.code}>
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
            <CustomSlider className="custom-slider-code" changeSize={this.changeSizeValue.bind(this)} min={5} max={30} default={this.state.fontSize}/>
        </div>
    );
  }
}

export default Code;
