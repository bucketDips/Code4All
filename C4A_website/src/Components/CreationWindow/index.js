import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import _ from 'lodash';
import style from './style.css';
import Grid from './Grid';
import Code from './Code';
import Details from './Details';
import Parameters from './Parameters';
import Patterns from './Patterns';

import exercices from '../../Providers/exercices';

import files from '../../Providers/files';

import consts from '../../Providers/consts';

class CreateExerciseWindow extends Component {

  constructor() {
    super();
    this.state = {
      options: [],
      parameters: {},
      gridProperties: {},
      patterns: [],
      neutralElements: [],
      gridObject: null,
      delete: null
    }
  }

  async setPatterns() {
    var patterns = await files.getMines();
    var newPatterns = {};
    var tempPat = patterns.data.map(element => {
      newPatterns[element.fileid] = {
        id: element.fileid,
        nom: element.publicName
      }
      return element;
    });

    this.setState({patterns: newPatterns});
  }

  componentWillMount() {
    this.setPatterns();

    this.setState({
      options: [
        {
          title : 'PC',
          description : 'Un personnage jouable par l\'utilisateur',
          image: process.env.PUBLIC_URL + '/stickman.png'
        },
        {
          title : 'NPC',
          description : 'Un personnage non jouable par l\'utilisateur',
          image: process.env.PUBLIC_URL + '/fighting_stickman.png'
        },
        {
          title : 'BLOCK',
          description : 'Un bloc',
          image: process.env.PUBLIC_URL + '/bloc.png'
        },
        {
          title : 'LABEL',
          description : 'Du texte',
          image: process.env.PUBLIC_URL + '/txt.png'
        }
      ],
      parameters: {
        type: "NONE"
      },
      gridProperties: {
        lines: 5,
        columns: 10,
        size: 30,
        cases: [],
        background: null,
        backgroundId: null
      },
      blocks: {},
      npc: {},
      pc: {},
      labels: {},
      functions: [],
      tests: [],
      editorValue: "",
      gridObject: null
    });
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.editorValue !== this.state.editorValue || nextState.gridObject !== this.state.gridObject) {
      return false;
    }
    return true;
  }

  onChangeParameters(parameters) {
    this.setState({parameters: parameters});
  }

  onChangeGridParameters(parameters) {
    let properties = this.state.gridProperties;
    properties.lines = parameters.lines;
    properties.columns = parameters.columns;
    properties.background = parameters.background;
    properties.backgroundId = parameters.backgroundId;
    this.setState({gridProperties: properties});
  }

  formatElements(elements, parameters) {
    // à voir différence lorsque label
    Object.values(elements).forEach(element => {
      if(element.id === parameters.id) {
        element.rowStart = parameters.rowStart;
        element.columnStart = parameters.columnStart;
        element.width = parameters.width;
        element.height = parameters.height;
        if(parameters.text) {
          element.text = parameters.text 
        }
        else {
          element.background = parameters.background;
          element.backgroundId = parameters.backgroundId;
        }
      }
    });
    return elements;
  }

  onChangeEditorValue(newValue) {
    this.setState({editorValue: newValue});
  }

  onChangeGridObject(newValue) {
    this.setState({gridObject: newValue});
  }

  onChangeElementParameters(parameters, type) {
    let elements = null;
    switch(type) {
      case 'BLOCK':
        elements = this.state.blocks;
        this.setState({blocks: this.formatElements(elements, parameters)});
        break;
      case 'NPC':
        elements = this.state.npc;
        this.setState({npc: this.formatElements(elements, parameters)});
        break;
      case 'PC':
        elements = this.state.pc;
        this.setState({pc: this.formatElements(elements, parameters)});
        break;
      case 'LABEL':
        elements = this.state.labels;
        this.setState({labels: this.formatElements(elements, parameters)});
        break;
      default:
        throw new Error("Element type not recognized");

    }
  }

  handleDeletePattern(patternId) {
    
  }

  deleteElementFromElements(elements, id) {
    let b;
    for(var key in elements) {
      if(elements[key].id === id) {
        b = key;
      }
    }
    delete elements[b];
    return elements;
  }

  onDeleteElement(id, type) {
    let elements = null;
    switch(type) {
      case 'BLOCK':
        elements = this.state.blocks;
        this.setState({blocks: this.deleteElementFromElements(elements, id)});
        break;
      case 'NPC':
        elements = this.state.npc;
        this.setState({npc: this.deleteElementFromElements(elements, id)});
        break;
      case 'PC':
        elements = this.state.pc;
        this.setState({pc: this.deleteElementFromElements(elements, id)});
        break;
      case 'LABEL':
        elements = this.state.labels;
        this.setState({labels: this.deleteElementFromElements(elements, id)});
        break;
      default:
        throw new Error("Element type not recognized");
    }
    
    this.setState({
      parameters: {
        type: "NONE"
      },
      delete: { id, type }
    });
  }

  resetDelete() {
    this.setState({delete: null});
  }

  synchroniseFunctions(functions, tests) {
    this.setState({functions: functions, tests: tests});
  }

  synchroniseForOneTypeOfElements(elements, type) {
    var newElements = {};

    Object.values(elements).forEach(element => {
      if(type !== "LABEL") {
        if(element.patternId === undefined || element.patternId === null || element.patternId === -1) {
          element.patternId = null;
          var background = this.state.options.find(function(element) {
            return element.title === type;
          }).image;
        }
        else {
          background = consts.url() + this.state.patterns[element.patternId].nom;
        }
  
        newElements[element.id] = {
          id: element.id,
          rowStart: element.row,
          columnStart: element.column,
          width: element.width,
          height: element.height,
          backgroundId: element.patternId,
          background: background
        };
      }
      else {
        newElements[element.id] = {
          id: element.id,
          rowStart: element.row,
          columnStart: element.column,
          width: element.width,
          height: element.height,
          text: element.text
        };
      }
    });
    switch(type) {
      case 'BLOCK':
        this.setState({blocks: newElements});
        break;
      case 'NPC':
        this.setState({npc: newElements});
        break;
      case 'PC':
        this.setState({pc: newElements});
        break;
      case 'LABEL':
        this.setState({labels: newElements});
        break;
      default:
        throw new Error("Element type not recognized");
    }
  }

  synchroniseElements(blocks, npcs, pcs, labels, functions, tests) {
    this.synchroniseForOneTypeOfElements(blocks, "BLOCK");
    this.synchroniseForOneTypeOfElements(npcs, "NPC");
    this.synchroniseForOneTypeOfElements(pcs, "PC");
    this.synchroniseForOneTypeOfElements(labels, "LABEL");
    this.synchroniseFunctions(functions, tests);
  }

  getMaxKeyOf(dictionary) {
    var maxKey = _.max(Object.keys(dictionary).map(function(item) {
      return Number(item);
    }));
    if(maxKey === undefined) {
      maxKey = -1;
    }
    return maxKey;
  }

  addBlock(rowId, columnId, width, height, background, backgroundId){
    var maxKey = this.getMaxKeyOf(this.state.blocks);
    
    let block = {
      id: Number(maxKey) + 1,
      rowStart: rowId,
      columnStart: columnId,
      width: width,
      height: height,
      background: background,
      backgroundId: backgroundId
    }

    let blocks = this.state.blocks;
    blocks[Number(maxKey) + 1] = block;
    this.setState({blocks: blocks});
  }

  addNPC(rowId, columnId, width, height, background, backgroundId) {
    var maxKey = this.getMaxKeyOf(this.state.npc);

    let npc = {
      id: Number(maxKey) + 1,
      rowStart: rowId,
      columnStart: columnId,
      width: width,
      height: height,
      background: background,
      backgroundId: backgroundId
    }

    let npcs = this.state.npc;
    npcs[Number(maxKey) + 1] = npc;
    this.setState({npc: npcs});
  }

  addPC(rowId, columnId, width, height, background, backgroundId) {
    var maxKey = this.getMaxKeyOf(this.state.pc);

    let pc = {
      id: Number(maxKey) + 1,
      rowStart: rowId,
      columnStart: columnId,
      width: width,
      height: height,
      background: background,
      backgroundId: backgroundId
    }

    let pcs = this.state.pc;
    pcs[Number(maxKey) + 1] = pc;
    this.setState({pc: pcs});
  }

  addLabel(rowId, columnId, width, height, text) {
    var maxKey = this.getMaxKeyOf(this.state.labels);

    let label = {
      id: Number(maxKey) + 1,
      rowStart: rowId,
      columnStart: columnId,
      width: width,
      height: height,
      text: text
    }

    let labels = this.state.labels;
    labels[Number(maxKey) + 1] = label;
    this.setState({labels: labels});
  }

  onDragEnd = result => {
    if(result.destination === null) return;

    let numCase = Number(result.destination.droppableId);
    let columnId = ((numCase - 1) % (this.state.gridProperties.columns)) + 1;
    let rowId = ((numCase - (columnId)) / this.state.gridProperties.columns) + 1;

    if(result.draggableId === "BLOCK") {
      this.addBlock(rowId, columnId, 1, 1, process.env.PUBLIC_URL + '/bloc.png', null);
    }
    else if(result.draggableId === "NPC") {
      this.addNPC(rowId, columnId, 1, 1, process.env.PUBLIC_URL + '/fighting_stickman.png', null);
    }
    else if(result.draggableId === "PC") {
      this.addPC(rowId, columnId, 1, 1, process.env.PUBLIC_URL + '/stickman.png', null);
    }
    else if(result.draggableId === "LABEL") {
      this.addLabel(rowId, columnId, 1, 1, "label");
    }
  }

  saveExercice(title, description, store) {
    var buildedExercice = {
      title: title,
      text: description,
      public: store,
      code: this.state.editorValue,
      gridObject: this.state.gridObject,
      lines: this.state.gridProperties.lines,
      columns: this.state.gridProperties.columns,
      patternId: this.state.gridProperties.backgroundId,
      blocks: Object.values(this.state.gridObject.blocks),
      npcs: Object.values(this.state.gridObject.npcs),
      pcs: Object.values(this.state.gridObject.pcs),
      labels: Object.values(this.state.gridObject.labels),
      functions: this.state.functions,
      tests: this.state.tests
    }
    
    exercices.createExercice(buildedExercice);
  }

  modifyExercise(title, description, id, store) {
    var buildedExercice = {
      title: title,
      text: description,
      public: store,
      code: this.state.editorValue,
      gridObject: this.state.gridObject,
      lines: this.state.gridProperties.lines,
      columns: this.state.gridProperties.columns,
      patternId: this.state.gridProperties.backgroundId,
      blocks: Object.values(this.state.gridObject.blocks),
      npcs: Object.values(this.state.gridObject.npcs),
      pcs: Object.values(this.state.gridObject.pcs),
      labels: Object.values(this.state.gridObject.labels),
      functions: this.state.functions,
      tests: this.state.tests
    }
  
    exercices.modifyExercice(buildedExercice, id);
  }

  render() {
    return (
            <div className={style.app}>
              <div className={style.top_panel}>
                  <DragDropContext onDragEnd={this.onDragEnd}>
                    <Grid 
                    parameters={this.state.gridProperties}
                    blocks={this.state.blocks}
                    pcs={this.state.pc}
                    npcs={this.state.npc}
                    labels={this.state.labels}
                    changeParametersWindow={this.onChangeParameters.bind(this)}
                    toolboxOptions={this.state.options}
                    />
                  </DragDropContext>
                  <Code
                  code={this.props.code}
                  grid={this.state.gridProperties}
                  blocks={this.state.blocks}
                  pcs={this.state.pc}
                  npcs={this.state.npc}
                  labels={this.state.labels}
                  patterns={this.state.patterns}                    
                  delete={this.state.delete}
                  resetDelete={this.resetDelete.bind(this)}
                  synchroniseElements={this.synchroniseElements.bind(this)}
                  changeGridParameters={this.onChangeGridParameters.bind(this)}
                  changeParametersWindow={this.onChangeParameters.bind(this)}
                  changeEditorValue={this.onChangeEditorValue.bind(this)}
                  changeGridObject={this.onChangeGridObject.bind(this)}
                  />
              </div>
              <div className={style.bottom_panel}>
                  <Parameters 
                  gridProperties={this.state.gridProperties}
                  patterns={this.state.patterns} 
                  parameters={this.state.parameters}
                  changeGridParameters={this.onChangeGridParameters.bind(this)} 
                  changeElementParameters={this.onChangeElementParameters.bind(this)} 
                  deleteElement={this.onDeleteElement.bind(this)}
                  />
                  <Patterns 
                  patterns={this.state.patterns} 
                  deletePattern={this.handleDeletePattern.bind(this)} 
                  reloadPatterns={this.setPatterns.bind(this)}
                  />
                  <Details 
                  saveExercise={this.saveExercice.bind(this)}
                  modifyExercise={this.modifyExercise.bind(this)}
                  id={this.props.id}
                  name={this.props.name}
                  details={this.props.details}
                  store={this.props.store}
                  />
              </div>
            </div>
    );
  }
}

export default CreateExerciseWindow;