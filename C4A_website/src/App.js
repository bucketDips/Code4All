import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeWindow from './Components/HomeWindow/';
import CreateExerciseWindow from './Components/CreationWindow/';
import ErrorWindow from './Components/ErrorWindow/';
import LoginWindow from './Components/LoginWindow/';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { NotConnectedRoute } from './Components/NotConnectedRoute';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <ProtectedRoute exact path="/" component={HomeWindow} />
          <ProtectedRoute exact path="/create" component={CreateExerciseWindow} />
          <NotConnectedRoute exact path="/login" component={LoginWindow} />
          <Route component={ErrorWindow} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;