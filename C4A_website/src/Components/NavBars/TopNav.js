import React, { Component } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';

import auth from '../../Providers/auth';

class TopNav extends Component {

  onLogout() {
    auth.logout(() => {
      this.props.history.push("/");
    })
  }

  render() {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/home">CodeInSchool</Navbar.Brand>
            <Nav className="mr-auto">
            
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/classes">Classes</Nav.Link>
                <Nav.Link href="/exercices">Exercices</Nav.Link>
                <Nav.Link href="/store">Store</Nav.Link>
                <Nav.Link href="/tutorial">Tutorial</Nav.Link>
                <Nav.Link href="/faq">FAQ</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
            
            </Nav>
            <Form inline>
            <Button variant="outline-light">Disconnect</Button>
            </Form>
        </Navbar>
    );
  }
}

export default TopNav;
