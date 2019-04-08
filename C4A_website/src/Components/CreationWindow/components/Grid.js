import React, { Component } from 'react';

import Case from './Case'
import styles from '../css/Grid.css'

class Grid extends Component {

  constructor() {
    super();
    this.state = {
      lines: 10,
      columns: 10,
      defaultWidth: 20,
      defaultHeight: 20,
      defaultSpace: 1,
      cases: []
    }
  }

  fillCases() {
    let cases = this.state.cases;

    for(var line = 0; line < this.state.lines; line++) {

      let line = [];

      for(var column = 0; column < this.state.columns; column++) {
        let size = {
          height: this.state.defaultHeight,
          width: this.state.defaultWidth,
          line: line,
          column: column,
          defaultSpace: this.state.defaultSpace
        }

        line.push(<Case size={size} />);
      }

      cases.push(line);
    }

    this.setState({cases: cases});
  }

  componentWillMount() {
    this.fillCases();
  }

  render() {
    return (
        <div className={styles.grid}>
            <h3 className="title">Ici la grille</h3>
            <div className="content">
              <ul className="grid-list">
                {this.state.cases}
              </ul>
            </div>
        </div>
    );
  }
}

export default Grid;
