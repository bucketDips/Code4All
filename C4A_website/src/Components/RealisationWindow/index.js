import React, { Component } from 'react';
import Grid from './Grid';
import Code from './Code';

import style from './style.css';

class RealisationExerciseWindow extends Component {

  constructor() {
    super();
    this.state = {
      gridProperties: {},
      blocks: [],
      npcs: [],
      pcs: [],
      labels: []
    }
  }

  getUrlForPatternId(id) {
    for(var i = 0; i < this.props.bundle.fichiers.length; i++) {
      if(this.props.bundle.fichiers[i].id === id) {
        return this.props.bundle.fichiers[i].url;
      }
    }
    throw new Error("Pas de background pour cette image");
  }

  componentWillMount() {
    this.setState({
      gridProperties: {
        lines: this.props.bundle.rows,
        columns: this.props.bundle.columns,
        size: 30,
        cases: [],
        background: this.getUrlForPatternId(this.props.bundle.patternId),
      },
      blocks: this.props.bundle.blocks,
      npcs: this.props.bundle.npcs,
      pcs: this.props.bundle.pcs,
      labels: this.props.bundle.labels
    });
  }

  render() {
    console.log(this.props.bundle);
    return (
        <div className={style.app}>
            <div className={style.left_panel}>
                <Grid 
                    parameters={this.state.gridProperties}
                    blocks={this.state.blocks}
                    npcs={this.state.npcs}
                    pcs={this.state.pcs}
                    labels={this.state.labels}
                    getUrlForPatternId={this.getUrlForPatternId.bind(this)}
                />
                <div className={style.tests}></div>
            </div>
            <div className={style.right_panel}>
                <Code />
                <div className={style.description}></div>
            </div>
        </div>
    );
  }
}

export default RealisationExerciseWindow;