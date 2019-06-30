import React, { Component } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import  { Redirect } from 'react-router-dom'
import auth from '../../Providers/auth';

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
          <Navbar bg="primary" variant="dark">
              <Navbar.Brand href="/home">CodeInSchool</Navbar.Brand>
              <Nav className="mr-auto">
              
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/classes">Classes</Nav.Link>
                  <Nav.Link href="/exercices">Exercices</Nav.Link>
                  <Nav.Link href="/store">Store</Nav.Link>
              
              </Nav>
              <Form inline>
              <Button variant="outline-light" onClick={this.onLogout.bind(this)}>Disconnect</Button>
              </Form>
          </Navbar>
      );
    }
  }
}

export default TopNav;
