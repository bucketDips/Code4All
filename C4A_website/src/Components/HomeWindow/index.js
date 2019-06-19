import React, { Component } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import LeftNav from '../LeftNav/';

import auth from '../../auth';
import styles from './style.css';

class HomeWindow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  onLogout() {
    auth.logout(() => {
      this.props.history.push("/");
    })
  }

  render() {
    return (
        <div className="home-window">
            <Navbar bg="primary" variant="dark">
              <Navbar.Brand href="#home">Code4All</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link>Home</Nav.Link>
                <Nav.Link>Classes</Nav.Link>
                <Nav.Link onClick={() => this.onSetSidebarOpen(true)}>Exercices</Nav.Link>
                <Nav.Link>Store</Nav.Link>
                <Nav.Link>Tutorial</Nav.Link>
                <Nav.Link>FAQ</Nav.Link>
                <Nav.Link>Contact</Nav.Link>
                
              </Nav>
              <Form inline>
                <Button variant="outline-light">Disconnect</Button>
              </Form>
            </Navbar>
            <LeftNav />
        </div>
    );
  }
}

export default HomeWindow;
