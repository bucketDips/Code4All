import React, { Component } from 'react';

import Case from './Case'
import CustomSlider from '../components/CustomSlider'
import styles from '../css/Grid.css'

class Grid extends Component {

  constructor() {
    super();
    this.state = {
      lines: 50,
      columns: 50,
      size: 30,
      cases: []
    }
  }

  fillCases() {
    let cases = this.state.cases;

    for(var line = 0; line < this.state.lines; line++) {
      let line = [];

      for(var column = 0; column < this.state.columns; column++) {
        let size = {
          line: line,
          column: column,
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

  changeSizeValue(newSize) {
    this.setState({size: newSize});
  }

  render() {
    return (
        <div className={styles.grid}>
            <h3 className="title">Ici la grille</h3>
            <div className="content">
              <div style={{
                whiteSpace:"nowrap",
                display:"grid",
                gridGap: "1px",
                gridAutoRows: "minmax(" + this.state.size + "px," +  this.state.size + "px)",
                gridAutoColumns: "minmax(" + this.state.size + "px," +  this.state.size + "px)",
              }}>
                {this.state.cases}
              </div>
            </div>
            <CustomSlider changeSize={this.changeSizeValue.bind(this)}/>
        </div>
    );
  }
}

export default Grid;
