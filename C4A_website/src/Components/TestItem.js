import React, { Component } from 'react';

class TestItem extends Component {
  render() {
    return (
      <li className="TestItem">
        {this.props.project.title} - {this.props.project.category}
      </li>
    );
  }
}

export default TestItem;
