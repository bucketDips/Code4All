import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeWindow from './Components/ConnectedWindows/Home';
import ExercicesWindow from './Components/ConnectedWindows/Exercices';
import NotConnectedWindow from './Components/NotConnectedWindow/';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { NotConnectedRoute } from './Components/NotConnectedRoute';

class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute exact path="/home" component={HomeWindow} />
            <ProtectedRoute exact path="/exercices" component={ExercicesWindow} />
            <NotConnectedRoute exact path="/" component={NotConnectedWindow} />
            {/*<Route component={ErrorWindow} />*/}
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