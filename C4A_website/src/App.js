import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeWindow from './Components/HomeWindow/';
import CreateExerciseWindow from './Components/CreationWindow/';
import ErrorWindow from './Components/ErrorWindow/';
import LoginWindow from './Components/LoginWindow/';
import WrappedRegistrationForm from './Components/InscriptionWindow/';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { NotConnectedRoute } from './Components/NotConnectedRoute';

class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute exact path="/" component={HomeWindow} />
            <ProtectedRoute exact path="/create" component={CreateExerciseWindow} />
            <NotConnectedRoute exact path="/login" component={LoginWindow} />
            <NotConnectedRoute exact path="/inscription" component={WrappedRegistrationForm} />
            <Route component={ErrorWindow} />
          </Switch>
        </BrowserRouter>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      </div>
    );
  }
}

export default App;