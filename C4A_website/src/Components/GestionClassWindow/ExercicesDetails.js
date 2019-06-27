import React, { Component } from 'react';
import style from './style.css';

class ExercicesDetails extends Component {
    render() {
        return (
            <div className={style.exercices_details}>
                <h1>Détail des exercices</h1>
                <div className={style.exercice_detail}>ici le reste</div>
                <div className={style.empty}></div>
            </div>
        );
    }
}

export default ExercicesDetails;