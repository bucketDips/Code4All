import React, { Component } from 'react';
import CustomSlider from './CustomSlider';
import Case from './Case'
import Block from './Block'
import Npc from './Npc'
import Pc from './Pc'
import Label from './Label'
import styles from './style.css';

/**
 * class corresponds to the grid module in the realisationwindow
 */
class Grid extends Component {

  /**
   * constructor
   */
  constructor() {
    super();
    this.state = {
      gridProperties: {},
    }
  }

  /**
   * fill the cases of the grid with the values
   * of the state (with size, lines, columns)
   */
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
        cells.push(<Case key={line * this.state.gridProperties.lines + column} size={size} index={String(index)} />);
        index += 1;
      }
      cases.push(cells);
    }

    let properties = this.state.gridProperties;

    properties.cases = cases;

    this.setState({gridProperties: properties});
  }

  /**
   * change the grid state with the props (size, lines, columns),
   * fillcases will be called again
   */
  componentWillMount() {
    let properties = {
      lines: this.props.parameters.lines,
      columns: this.props.parameters.columns,
      cases: this.props.parameters.cases,
      size: this.props.parameters.size,
      background: this.props.parameters.background,
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

  /**
   * change the grid state with the props (size, lines, columns),
   * fillcases will be called again
   */
  componentWillReceiveProps(newProps) {
    let properties = {
      lines: newProps.parameters.lines,
      columns: newProps.parameters.columns,
      cases: newProps.parameters.cases,
      size: this.state.gridProperties.size,
      background: newProps.parameters.background,
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

  /**
   * change the size of the cases
   */
  changeSizeValue(newSize) {
    let properties = this.state.gridProperties;
    properties.size = newSize;
    this.setState({gridProperties: properties});
  }

  /**
   * return the props of the element to forward
   * it to the differents elements in the grid
   */
  getPropsForElement(element, text) {
    if(text) {
      return {
        id: element.id,
        rowStart: element.row,
        columnStart: element.column,
        width: element.width,
        height: element.height,
        text: element.text
      }
    }
    else {
      return {
        id: element.id,
        rowStart: element.row,
        columnStart: element.column,
        width: element.width,
        height: element.height,
        background: this.props.getUrlForPatternId(element.patternId),
      }
    }
    
  }

  /**
   * render method
   */
  render() {
    let background = (
    <div style={{
      gridColumnStart: 1,
      gridRowStart: 1,
      zIndex: 2,
      gridColumnEnd: this.state.gridProperties.columns + 1,
      gridRowEnd: this.state.gridProperties.lines + 1,
      backgroundImage: `url(${this.state.gridProperties.background})`,
      backgroundSize: "100% 100%"
    }} />)

    let blocks = Object.entries(this.props.blocks).map(block => {
      return (<Block key={block.id} {... this.getPropsForElement(block[1], false)} />)
    }, this);
    
    let npcs = Object.entries(this.props.npcs).map(npc => {
      return (<Npc key={npc.id} {... this.getPropsForElement(npc[1], false)} />)
    }, this);

    let pcs = Object.entries(this.props.pcs).map(pc => {
      return (<Pc key={pc.id} {... this.getPropsForElement(pc[1], false)} />)
    }, this);

    let labels = Object.entries(this.props.labels).map(label => {
      return (<Label key={label.id} {... this.getPropsForElement(label[1], true)} />)
    }, this);
    
    return (
        <div className={styles.grid}>
            <div className={styles.grid_content}>
              <div style={{
                whiteSpace:"nowrap",
                display:"grid",
                gridGap: "0.1px",
                gridAutoRows: this.state.gridProperties.size + "px",
                gridAutoColumns: this.state.gridProperties.size + "px",
              }}>
                {this.state.gridProperties.cases}
                {blocks}
                {npcs}
                {pcs}
                {labels}
                {background}
              </div>
            </div>
            <CustomSlider className="custom-slider-grid" changeSize={this.changeSizeValue.bind(this)} min={5} max={100} default={this.state.gridProperties.size}/>
        </div>
    );
  }
}

export default Grid;
