import React, { Component } from 'react';
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
      options: []
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
      ]
    });
  }

  render() {
    return (
      <div className={style.app}>
        <div className={style.top_panel}>
          <ToolBox options={this.state.options} />
          <Grid />
          <Code />
        </div>
        <div className={style.bottom_panel}>
          <Parameters />
          <Patterns />
          <Details />
        </div>
      </div>
    );
  }
}

export default App;
