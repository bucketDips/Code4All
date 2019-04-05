import React, { Component } from 'react';
import { Stage, Container } from '@inlet/react-pixi'

import Case from './Case'
import styles from '../css/Grid.css'

class Grid extends Component {

  constructor() {
    super();
    this.state = {
      lines: 100,
      columns: 30,
      defaultWidth: 100,
      defaultHeight: 100,
      defaultSpace: 2,
      cases: []
    }
  }

  componentWillMount() {
    let cases = this.state.cases;
    var i = 0;

    for(var line = 0; line < this.state.lines; line++) {
      for(var column = 0; column < this.state.columns; column++) {
        let size = {
          height: this.state.defaultHeight,
          width: this.state.defaultWidth,
          y: this.state.defaultHeight * line + this.state.defaultSpace * (1 + line),
          x: this.state.defaultWidth * column + this.state.defaultSpace * (1 + column)
        }
        i++;
        cases.push(<Case key={i} size={size} />);
      }
    }

    this.setState({cases: cases});
  }

  render() {
    return (
        <div className={styles.grid}>
            <h3 className="title">Ici la grille</h3>
            <div className="content">
            <Stage height={655} width={1100} options={{ backgroundColor: 0x01262a }}>
              <Container>
                {this.state.cases}
              </Container>
            </Stage>
            </div>
        </div>
    );
  }
}

export default Grid;
