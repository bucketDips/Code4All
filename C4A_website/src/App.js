import React, { Component } from 'react';
import style from './App.css';

import ToolBox from './Components/CreationWindow/components/ToolBox';
import Grid from './Components/CreationWindow/components/Grid';
import Code from './Components/CreationWindow/components/Code';
import Details from './Components/CreationWindow/components/Details';
import Parameters from './Components/CreationWindow/components/Parameters';
import Patterns from './Components/CreationWindow/components/Patterns';

import * as data from '../'

class App extends Component {

  constructor() {
    super();
    this.state = {
      options: [],
      gridProperties: {}
    }
  }

  componentWillMount() {
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
          title : 'Bloc',
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
        cases: []
      },
      patterns: []
    });
  }

  onChangeParameters(parameters) {
    this.setState({parameters: parameters});
  }

  onChangeGridParameters(parameters) {
    let properties = this.state.gridProperties;
    properties.lines = parameters.lines;
    properties.columns = parameters.columns;
    this.setState({gridProperties: properties});
  }

  render() {
    return (
      <div className={style.app}>
        <div className={style.top_panel}>
          <ToolBox options={this.state.options} />
          <Grid 
            parameters={this.state.gridProperties}
            changeParametersWindow={this.onChangeParameters.bind(this)}
          />
          <Code />
        </div>
        <div className={style.bottom_panel}>
          <Parameters 
            parameters={this.state.parameters}
            changeGridParameters={this.onChangeGridParameters.bind(this)} 
          />
          <Patterns />
          <Details />
        </div>
      </div>
    );
  }
}

export default App;
