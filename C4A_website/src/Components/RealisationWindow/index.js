import React, { Component } from 'react';
import Grid from './Grid';

import consts from '../../Providers/consts';
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
                <div className={style.description}>coucou</div>
            </div>
            <div className={style.right_panel}>
            
            </div>
        </div>
    );
  }
}

export default RealisationExerciseWindow;