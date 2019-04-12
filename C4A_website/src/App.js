import React, { Component } from 'react';
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
      patterns: []
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
        cases: [],
        background: null
      }
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

  render() {
    return (
      <div className={style.app}>
        <div className={style.top_panel}>
          <ToolBox 
            options={this.state.options} />
          <Grid 
            parameters={this.state.gridProperties}
            changeParametersWindow={this.onChangeParameters.bind(this)}
            changeGridPattern={this.onChangeGridPattern.bind(this)}
          />
          <Code />
        </div>
        <div className={style.bottom_panel}>
          <Parameters 
            patterns={this.state.patterns} 
            parameters={this.state.parameters}
            changeGridParameters={this.onChangeGridParameters.bind(this)} 
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

export default App;
