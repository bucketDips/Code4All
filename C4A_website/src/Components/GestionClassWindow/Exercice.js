import React, { Component } from 'react';
import style from './style.css';
import consts from '../../Providers/consts';
import classes from '../../Providers/classes';

class ExercicesDetails extends Component {
    render() {
        return (
            <div className={style.exercice} onClick={this.props.onClick}>
                <img src={"note.png"} className={style.note} />
                <b><span className={style.exercice_infos}>Nom : {this.props.infos.title.replace(/'/g, "")}, créé par : {this.props.infos.author}</span></b>
                {
                    this.props.delete && this.props.teacher &&
                    <img alt="delete" onClick={this.props.delete} className={style.delete_exo_button} src={process.env.PUBLIC_URL + 'cross.png'} />
                }
                {
                    this.props.launch && !this.props.teacher &&
                    <img alt="launch" onClick={this.props.launch} className={style.launch_exo_button} src={process.env.PUBLIC_URL + 'play.png'} />
                }
            </div>
        );
    }
}

export default ExercicesDetails;