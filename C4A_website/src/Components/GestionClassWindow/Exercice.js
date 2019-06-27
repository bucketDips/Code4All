import React, { Component } from 'react';
import style from './style.css';
import consts from '../../Providers/consts';
import classes from '../../Providers/classes';

class ExercicesDetails extends Component {
    render() {
        return (
            <div className={style.exercice}>
                <img src={"note.png"} className={style.note} />
                <b><span className={style.exercice_infos}>Nom : {this.props.infos.title} Créé par : {this.props.infos.author}</span></b>
            </div>
        );
    }
}

export default ExercicesDetails;