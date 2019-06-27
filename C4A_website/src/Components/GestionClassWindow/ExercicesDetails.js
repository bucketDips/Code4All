import React, { Component } from 'react';
import style from './style.css';
import classes from '../../Providers/classes';

import AddExerciceWindowWrapper from './AddExerciceWindowWrapper';

import Exercice from './Exercice';

import { Modal } from 'antd';

const confirm = Modal.confirm;

class ExercicesDetails extends Component {
    constructor() {
        super();
        this.state = {
            exercices: []
        }
    }

    showConfirm(classId, exerciceId, cb) {
        confirm({
            title: 'Etes-vous sûr de vouloir supprimer cet exercice de la classe ?',
            onOk() {
                classes.deleteExerciceFrom(classId, exerciceId, cb);
            },
            onCancel() {
            },
        });
    }

    async refill() {
        var exercices = await classes.getExercices();
        this.setState({exercices: exercices});
        console.log("refill");
    }

    async componentWillMount() {
        this.refill();
    }

    deleteExerciceFromClass(id) {
        this.showConfirm(this.props.classRoom.id, id, this.refill.bind(this));
    }

    render() {
        var exercices = this.state.exercices.map(exercice => {
            exercice.author = "jesus";
            return (<Exercice infos={exercice} delete={this.deleteExerciceFromClass.bind(this, exercice.id)} />);
        });

        return (
            <div className={style.exercices_details}>
                <h1>Détail des exercices
                    <AddExerciceWindowWrapper refill={this.props.refill} idClass={this.props.classRoom.id} />
                </h1>
                <div className={style.exercice_detail}>
                    {exercices}
                </div>
                <div className={style.empty}></div>
            </div>
        );
    }
}

export default ExercicesDetails;