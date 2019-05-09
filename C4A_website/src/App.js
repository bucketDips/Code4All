import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeWindow from './Components/HomeWindow/';
import CreateExerciseWindow from './Components/CreationWindow/';
import ErrorWindow from './Components/ErrorWindow/';



class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomeWindow} exact />
          <Route path="/create" component={CreateExerciseWindow} />
          <Route component={ErrorWindow} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;