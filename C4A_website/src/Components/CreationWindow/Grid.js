import React, { Component } from 'react';

import Case from './Case'
import CustomSlider from './CustomSlider'
import Block from './Block'
import styles from './style.css';

class Grid extends Component {

  constructor() {
    super();
    this.state = {
      gridProperties: {}
    }
  }

  fillCases() {
    let cases = [];
    let index = 1;

    for(var line = 0; line < this.state.gridProperties.lines; line++) {
      let cells = [];

      for(var column = 0; column < this.state.gridProperties.columns; column++) {
        let size = {
          line: line,
          column: column,
        }
        cells.push(<Case size={size} index={String(index)} />);
        index += 1;
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
      background: this.props.parameters.background,
      backgroundId: this.props.parameters.backgroundId
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
      cases: this.props.parameters.cases,
      background: this.props.parameters.background,
      backgroundId: this.props.parameters.backgroundId
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

  askEditGrid(e) {
    let parameters = {
      type: "GRID",
      lines: this.state.gridProperties.lines,
      columns: this.state.gridProperties.columns,
      background: this.state.gridProperties.background,
      backgroundId: this.state.gridProperties.backgroundId
    }
    this.props.changeParametersWindow(parameters);
    e.preventDefault();
  }

  askEditBlock(parameters) {
    this.props.changeParametersWindow(parameters);
  }

  render() {
    let background = this.state.gridProperties.background == null ? "" : 
    (<div style={{
      gridColumnStart: 1,
      gridRowStart: 1,
      zIndex: 2,
      gridColumnEnd: this.state.gridProperties.columns + 1,
      gridRowEnd: this.state.gridProperties.lines + 1,
      backgroundImage: `url(${this.state.gridProperties.background})`,
      backgroundSize: "100% 100%"
    }} />)

    let blocks;

    if(this.props.blocks) {
        blocks = Object.entries(this.props.blocks).map(block => {
          return (<Block
            id={block[1].id}
            rowStart={block[1].rowStart}
            columnStart={block[1].columnStart}
            width={block[1].width}
            height={block[1].height}
            background={block[1].background}
            backgroundId={block[1].backgroundId}
            changeParametersWindow={this.askEditBlock.bind(this)}
          />)
        }, this);

    }

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
                {blocks}
                {background}
              </div>
            </div>
            <CustomSlider className="custom-slider" changeSize={this.changeSizeValue.bind(this)} min={5} max={100} default={30}/>
        </div>
    );
  }
}

export default Grid;
