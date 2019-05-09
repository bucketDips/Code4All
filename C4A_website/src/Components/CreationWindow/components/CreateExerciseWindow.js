import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Axios from 'axios';
import style from '../css/CreateExerciseWindow.css';
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
      blocks: [
      ],
      blockMaxId: 0
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
    blocks.forEach(block => {
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
    console.log(patternId);
  }

  onChangeGridPattern(patternId) {
    console.log(patternId);
    Axios.get(process.env.PUBLIC_URL + '/patterns/files.json').then(response => {
      response.data.forEach(element => {
        console.log(element);
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

  onDragEnd = result => {
    if(result.destination === null) return;
    if(result.draggableId === "BLOCK") {
      let numCase = Number(result.destination.droppableId);
      let columnId = ((numCase - 1) % (this.state.gridProperties.columns)) + 1;
      let rowId = ((numCase - (columnId)) / this.state.gridProperties.columns) + 1;
      this.setState({blockMaxId: this.state.blockMaxId + 1});

      let block = {
        id: this.state.blockMaxId,
        rowStart: rowId,
        columnStart: columnId,
        width: 1,
        height: 1,
        background: process.env.PUBLIC_URL + '/bloc.png',
        backgroundId: null
      }

      let blocks = this.state.blocks;
      blocks.push(block);
      this.setState({blocks: blocks});
    }
  }

  render() {
    return (
        <DragDropContext onDragEnd={this.onDragEnd}>
            <div className={style.app}>
            <div className={style.top_panel}>
                <ToolBox 
                options={this.state.options} />
                <Grid 
                parameters={this.state.gridProperties}
                blocks={this.state.blocks}
                changeParametersWindow={this.onChangeParameters.bind(this)}
                changeGridPattern={this.onChangeGridPattern.bind(this)}
                />
                <Code
                grid={this.state.gridProperties}
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
        </DragDropContext>
    );
  }
}

export default CreateExerciseWindow;