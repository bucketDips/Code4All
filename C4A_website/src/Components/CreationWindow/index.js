import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Axios from 'axios';
import _ from 'lodash';
import style from './style.css';
import ToolBox from './ToolBox';
import Grid from './Grid';
import Code from './Code';
import Details from './Details';
import Parameters from './Parameters';
import Patterns from './Patterns';

class CreateExerciseWindow extends Component {

  constructor() {
    super();
    this.state = {
      options: [],
      parameters: {},
      gridProperties: {},
      patterns: [],
      neutralElements: []
    }
  }

  componentWillMount() {
    Axios.get(process.env.PUBLIC_URL + '/patterns/files.json').then(response => {
      this.setState({patterns: response.data})
    });

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
      blocks: {}
    });
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

  onChangeBlockParameters(parameters) {
    let blocks = this.state.blocks;
    Object.values(blocks).forEach(block => {
      if(block.id === parameters.id) {
        block.rowStart = parameters.rowStart;
        block.columnStart = parameters.columnStart;
        block.width = parameters.width;
        block.height = parameters.height;
        block.background = parameters.background;
        block.backgroundId = parameters.backgroundId;
      }
    });
    this.setState({blocks: blocks});
  }

  handleDeletePattern(patternId) {
    
  }

  onChangeGridPattern(patternId) {
    Axios.get(process.env.PUBLIC_URL + '/patterns/files.json').then(response => {
      response.data.forEach(element => {
      });
    });
  }

  onDeleteBlock(id) {
    let blocks = this.state.blocks;
    let b;
    blocks.forEach(block => {
      if(block.id === id) {
        b = block;
      }
    });
    blocks.pop(b);
    this.setState({
      blocks: blocks,
      parameters: {
        type: "NONE"
      }
    });
  }

  onChangeBlocks(blocks) {
    var stateBlocks = {};

    blocks.forEach(element => {
      if(element.patternId === undefined) {
        element.patternId = null;
        var background = null;
      }
      else {
        background = process.env.PUBLIC_URL + 'patterns/' + this.state.patterns[element.patternId].nom;
      }

      stateBlocks[element.id] = {
        id: element.id,
        rowStart: element.row,
        columnStart: element.column,
        width: element.width,
        height: element.height,
        backgroundId: element.patternId,
        background: background
      };
    });

    this.setState({blocks: stateBlocks});
  }

  addBlock(rowId, columnId, width, height, background, backgroundId){
    var maxKey = _.max(Object.keys(this.state.blocks), o => this.state.blocks[o]);
    if(maxKey === undefined) {
      maxKey = -1;
    }
    
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

  onDragEnd = result => {
    if(result.destination === null) return;
    if(result.draggableId === "BLOCK") {
      let numCase = Number(result.destination.droppableId);
      let columnId = ((numCase - 1) % (this.state.gridProperties.columns)) + 1;
      let rowId = ((numCase - (columnId)) / this.state.gridProperties.columns) + 1;

      this.addBlock(rowId, columnId, 1, 1, process.env.PUBLIC_URL + '/bloc.png', null);
    }
  }

  render() {
    return (
            <div className={style.app}>
            <div className={style.top_panel}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                  <ToolBox 
                  options={this.state.options} />
                  <Grid 
                  parameters={this.state.gridProperties}
                  blocks={this.state.blocks}
                  changeParametersWindow={this.onChangeParameters.bind(this)}
                  changeGridPattern={this.onChangeGridPattern.bind(this)}
                  />
                </DragDropContext>
                <Code
                grid={this.state.gridProperties}
                blocks={this.state.blocks}
                patterns={this.state.patterns}
                modifyBlocks={this.onChangeBlocks.bind(this)}
                changeGridParameters={this.onChangeGridParameters.bind(this)}
                changeParametersWindow={this.onChangeParameters.bind(this)}
                />
            </div>
            <div className={style.bottom_panel}>
                <Parameters 
                gridProperties={this.state.gridProperties}
                patterns={this.state.patterns} 
                parameters={this.state.parameters}
                changeGridParameters={this.onChangeGridParameters.bind(this)} 
                changeBlockParameters={this.onChangeBlockParameters.bind(this)} 
                deleteBlock={this.onDeleteBlock.bind(this)}
                />
                <Patterns 
                patterns={this.state.patterns} 
                deletePattern={this.handleDeletePattern.bind(this)} />
                <Details />
            </div>
            </div>
    );
  }
}

export default CreateExerciseWindow;