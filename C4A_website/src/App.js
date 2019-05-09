import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import HomeWindow from './Components/HomeWindow/';
import CreateExerciseWindow from './Components/CreationWindow/';
import ErrorWindow from './Components/ErrorWindow/';
import LoginWindow from './Components/LoginWindow/';
import decode from 'jwt-decode';

/*const checkAuth = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  if(!token || !refreshToken) {
    return false;
  }

  try {
    const { exp } = decode(refreshToken);
    if(exp < new Date().getTime()) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={propos => (
    checkAuth() ? (
      <Component {...propos} />
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    )
  )} />
)*/

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