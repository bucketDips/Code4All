import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeWindow from './Components/HomeWindow/';
import CreateExerciseWindow from './Components/CreationWindow/';
import ErrorWindow from './Components/ErrorWindow/';
import LoginWindow from './Components/LoginWindow/';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeWindow} />
          <Route exact path="/create" component={CreateExerciseWindow} />
          <Route exact path="/login" component={LoginWindow} />
          <Route exact path="/home" component={HomeWindow} />
          <Route component={ErrorWindow} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;