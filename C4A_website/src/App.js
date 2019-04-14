import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import Axios from 'axios';
import style from './App.css';
import ToolBox from './Components/CreationWindow/components/ToolBox';
import Grid from './Components/CreationWindow/components/Grid';
import Code from './Components/CreationWindow/components/Code';
import Details from './Components/CreationWindow/components/Details';
import Parameters from './Components/CreationWindow/components/Parameters';
import Patterns from './Components/CreationWindow/components/Patterns';

class App extends Component {

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
        {
          id: 1,
          rowStart: 1,
          columnStart: 1,
          width: 1,
          height: 1,
          background: process.env.PUBLIC_URL + 'patterns/mario.png',
          backgroundId: 3
        }
      ]
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

  onDragEnd = result => {
    if(result.draggableId === "BLOCK") {
      
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
            <Code />
          </div>
          <div className={style.bottom_panel}>
            <Parameters 
              gridProperties={this.state.gridProperties}
              patterns={this.state.patterns} 
              parameters={this.state.parameters}
              changeGridParameters={this.onChangeGridParameters.bind(this)} 
              changeBlockParameters={this.onChangeBlockParameters.bind(this)} 
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

export default App;
