import React, { Component } from 'react';

import Case from './Case'
import CustomSlider from '../components/CustomSlider'
import styles from '../css/Grid.css'

class Grid extends Component {

  constructor() {
    super();
    this.state = {
      gridProperties: {}
    }
  }

  fillCases() {
    let cases = [];

    for(var line = 0; line < this.state.gridProperties.lines; line++) {
      let cells = [];

      for(var column = 0; column < this.state.gridProperties.columns; column++) {
        let size = {
          line: line,
          column: column,
        }
        cells.push(<Case size={size} />);
      }
      cases.push(cells);
    }

    let properties = this.state.gridProperties;

    properties.cases = cases;

    this.setState({gridProperties: properties});
  }

  componentWillMount() {
    let properties = {
      lines: this.props.parameters.lines,
      columns: this.props.parameters.columns,
      size: this.props.parameters.size,
      cases: this.props.parameters.cases,
    };
    this.setState(
      {
        gridProperties: properties
      },
      function() {
        this.fillCases();
      }
    );
  }

  componentWillReceiveProps() {
    let properties = {
      lines: this.props.parameters.lines,
      columns: this.props.parameters.columns,
      size: this.state.gridProperties.size,
      cases: this.props.parameters.cases
    };
    this.setState(
      {
        gridProperties: properties
      },
      function() {
        this.fillCases();
      }
    );
  }

  changeSizeValue(newSize) {
    let properties = this.state.gridProperties;
    properties.size = newSize;
    this.setState({gridProperties: properties});
  }

  askEditGrid(e){
    let parameters = {
      type: "GRID",
      lines: this.state.gridProperties.lines,
      columns: this.state.gridProperties.columns,
    }
    this.props.changeParametersWindow(parameters);
    e.preventDefault();
  }

  render() {
    return (
        <div className={styles.grid}>
            <h3 className="title">Ici la grille
              <form className="form-edit-grid" onSubmit={this.askEditGrid.bind(this)}>
                <input type="image" className="grid-edit" alt="edit button" src={process.env.PUBLIC_URL + '/edit.png'} />
              </form>
            </h3>
            <div className="content">
              <div style={{
                whiteSpace:"nowrap",
                display:"grid",
                gridGap: "1px",
                gridAutoRows: this.state.gridProperties.size + "px",
                gridAutoColumns: this.state.gridProperties.size + "px",
              }}>
                {this.state.gridProperties.cases}
                <img alt="grid img" style={{
                  gridColumnStart: 1,
                  gridRowStart: 1,
                  zIndex: 2,
                  width: this.state.gridProperties.columns * (this.state.gridProperties.size + 1),
                  height: this.state.gridProperties.lines * (this.state.gridProperties.size + 1),
                  objectFit: "cover"
                }} src={process.env.PUBLIC_URL + '/patterns/nature.jpg'} />
              </div>
            </div>
            <CustomSlider className="custom-slider" changeSize={this.changeSizeValue.bind(this)} min={5} max={100} default={30}/>
        </div>
    );
  }
}

export default Grid;
