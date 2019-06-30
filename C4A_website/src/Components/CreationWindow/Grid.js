import React, { Component } from 'react';
import Case from './Case'
import CustomSlider from './CustomSlider'
import CustomToolBox from './CustomToolBox'
import Block from './Block'
import Npc from './Npc'
import Pc from './Pc'
import Label from './Label'
import styles from './style.css';

/**
 * class corresponds to the grid module in the creationwindow
 */
class Grid extends Component {

  /**
   * constructor
   */
  constructor() {
    super();
    this.state = {
      gridProperties: {}
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
        cells.push(<Case size={size} index={String(index)} key={(column) + (line * this.state.gridProperties.lines)} />);
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
  componentWillReceiveProps() {
    var size = this.state.gridProperties.size === undefined ? this.props.parameters.size : this.state.gridProperties.size;
    let properties = {
      lines: this.props.parameters.lines,
      columns: this.props.parameters.columns,
      size: size,
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

  /**
   * change the size of the cases
   */
  changeSizeValue(newSize) {
    let properties = this.state.gridProperties;
    properties.size = newSize;
    this.setState({gridProperties: properties});
  }

  /**
   * action for clicking on the grid parameters button
   */
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

  /**
   * bridge between askeditelement of the differents elements
   * and the root of creationwindow
   */
  askEditElement(parameters) {
    this.props.changeParametersWindow(parameters);
  }

  /**
   * render method
   */
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
    let npcs;
    let pcs;
    let labels;

    if(this.props.blocks) {
        blocks = Object.entries(this.props.blocks).map(block => {
          return (<Block
            key={block[1].id}
            id={block[1].id}
            rowStart={block[1].rowStart}
            columnStart={block[1].columnStart}
            width={block[1].width}
            height={block[1].height}
            background={block[1].background}
            backgroundId={block[1].backgroundId}
            changeParametersWindow={this.askEditElement.bind(this)}
          />)
        }, this);
    }
    if(this.props.npcs) {
        npcs = Object.entries(this.props.npcs).map(npc => {
          return (<Npc
            key={npc[1].id}
            id={npc[1].id}
            rowStart={npc[1].rowStart}
            columnStart={npc[1].columnStart}
            width={npc[1].width}
            height={npc[1].height}
            background={npc[1].background}
            backgroundId={npc[1].backgroundId}
            changeParametersWindow={this.askEditElement.bind(this)}
          />)
        }, this);
    }

    if(this.props.pcs) {
        pcs = Object.entries(this.props.pcs).map(pc => {
          return (<Pc
            key={pc[1].id}
            id={pc[1].id}
            rowStart={pc[1].rowStart}
            columnStart={pc[1].columnStart}
            width={pc[1].width}
            height={pc[1].height}
            background={pc[1].background}
            backgroundId={pc[1].backgroundId}
            changeParametersWindow={this.askEditElement.bind(this)}
          />)
        }, this);
    }

    if(this.props.labels) {
        labels = Object.entries(this.props.labels).map(label => {
          return (<Label
            key={label[1].id}
            id={label[1].id}
            rowStart={label[1].rowStart}
            columnStart={label[1].columnStart}
            width={label[1].width}
            height={label[1].height}
            text={label[1].text}
            changeParametersWindow={this.askEditElement.bind(this)}
            caseSize={this.state.gridProperties.size}
          />)
        }, this);
    }
    
    return (
        <div className={styles.grid}>
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
                {npcs}
                {pcs}
                {labels}
                {background}
              </div>
            </div>
            <form className="form-edit-grid" onSubmit={this.askEditGrid.bind(this)}>
                <input type="image" className="grid-edit" alt="edit button" src={process.env.PUBLIC_URL + '/edit.png'} />
            </form>
            <CustomToolBox className="custom-toolbox" elements={this.props.toolboxOptions} />
            <CustomSlider className="custom-slider" changeSize={this.changeSizeValue.bind(this)} min={5} max={100} default={this.state.gridProperties.size}/>
        </div>
    );
  }
}

export default Grid;
