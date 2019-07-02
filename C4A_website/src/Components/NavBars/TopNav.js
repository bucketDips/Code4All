import React, { Component } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import  { Redirect } from 'react-router-dom'
import auth from '../../Providers/auth';
import style from './style.css'

/**
* correspond to the top navigation that contains the
* differents windows of the website (classes/exercices/store/home)
*/
class TopNav extends Component {

  /**
  * constructor
  */
  constructor() {
    super();
    this.state = {
      redirectToLogin: false
    }
  }
  
  /**
  * action with clicking on disconnect
  */
  onLogout() {
    auth.logout(() => {
      this.setState({redirectToLogin: true});
    })
  }

  /**
  * render method
  */
  render() {
    if (this.state.redirectToLogin){
      return (<Redirect to='/'  />);
    }
    else {
      return (
          <Navbar style={{zIndex: 20}} bg="primary" variant="dark">
              <Navbar.Brand href="/accueil">CodeInSchool</Navbar.Brand>
              <Nav className="mr-auto">
              
                  <Nav.Link href="/accueil">Accueil</Nav.Link>
                  <Nav.Link href="/classes">Classes</Nav.Link>
                  <Nav.Link href="/exercices">Exercices</Nav.Link>
                  <Nav.Link href="/magasin">Magasin</Nav.Link>
                  <Nav.Link href="/android">Android</Nav.Link>
              </Nav>
              <Form inline>
              <Button variant="outline-light" onClick={this.onLogout.bind(this)}>Se déconnecter</Button>
              </Form>
          </Navbar>
      );
    }
  }
}

export default TopNav;
