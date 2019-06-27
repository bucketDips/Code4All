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
                <img alt="delete" onClick={this.props.delete} className={style.delete_exo_button} src={process.env.PUBLIC_URL + 'cross.png'} />
            </div>
        );
    }
}

export default ExercicesDetails;