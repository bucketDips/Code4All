import React, { Component } from 'react';
import style from './style.css';
import classes from '../../Providers/classes';

import Exercice from './Exercice';

class ExercicesDetails extends Component {
    constructor() {
        super();
        this.state = {
            exercices: []
        }
      }

    async refill() {
        var exercices = await classes.getExercices();
        this.setState({exercices: exercices});
    }

    async componentWillMount() {
        this.refill();
    }

    render() {
        var exercices = this.state.exercices.map(exercice => {
            exercice.author = "jesus";
            return (<Exercice infos={exercice} />)
        });

        return (
            <div className={style.exercices_details}>
                <h1>Détail des exercices</h1>
                <div className={style.exercice_detail}>
                    {exercices}
                </div>
                <div className={style.empty}></div>
            </div>
        );
    }
}

export default ExercicesDetails;