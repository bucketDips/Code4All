import React, { Component } from 'react';
import Grid from './Grid';
import Code from './Code';

import style from './style.css';

class RealisationExerciseWindow extends Component {

  constructor() {
    super();
    this.state = {
      gridProperties: {},
    }
  }

  componentWillMount() {
    this.setState({
      gridProperties: {
        lines: 5,
        columns: 10,
        size: 30,
        cases: [],
        background: null,
        backgroundId: null
      }
    });
  }

  render() {
    return (
        <div className={style.app}>
            <div className={style.left_panel}>
                <Grid 
                    parameters={this.state.gridProperties}
                />
                <div className={style.description}></div>
            </div>
            <div className={style.right_panel}>
                <Code />
                <div className={style.tests}></div>
            </div>
        </div>
    );
  }
}

export default RealisationExerciseWindow;