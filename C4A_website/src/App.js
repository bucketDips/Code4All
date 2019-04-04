import React, { Component } from 'react';
import './App.css';

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
      
    }
  }

  componentWillMount() {
    this.setState({
      
    });
  }

  render() {
    return (
      <div className="App">
        <ToolBox />
        <Grid />
        <Code />
        <Details />
        <Parameters />
        <Patterns />
      </div>
    );
  }
}

export default App;
