import React, { Component } from 'react';
import style from './style.css';
import exercices from '../../Providers/exercices';

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
                exercices.deleteExerciceFromClass(classId, exerciceId, cb);
            },
            onCancel() {
            },
        });
    }

    refill() {
        this.props.refill();
    }

    deleteExerciceFromClass(id) {
        this.showConfirm(this.props.classRoom.id, id, this.refill.bind(this));
    }

    render() {
        var exercices = this.props.exos.map(exercice => {
            return (<Exercice infos={exercice} delete={this.deleteExerciceFromClass.bind(this, exercice.exercice_id)} />);
        });

        return (
            <div className={style.exercices_details}>
                <h1>Détail des exercices
                    <AddExerciceWindowWrapper refill={this.props.refill} exos={this.props.exos} classRoom={this.props.classRoom.id} />
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