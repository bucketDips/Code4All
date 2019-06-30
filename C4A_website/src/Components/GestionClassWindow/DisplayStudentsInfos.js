import React, { Component } from 'react';
import AddPersonWindowWrapper from './AddPersonWindowWrapper';
import style from './style.css';
import Person from './Person';
import { Modal } from 'antd';
import classes from '../../Providers/classes';

const confirm = Modal.confirm;

class DisplayStudentsInfos extends Component {

    refill() {
        this.props.refill();
    }

    showConfirm(idPerson, idClass, cb) {
        confirm({
            title: 'Etes-vous sûr de vouloir supprimer cette personne de la classe ?',
            onOk() {
                classes.deleteStudentFromClass(idPerson, idClass, cb);
            },
            onCancel() {
            },
        });
    }

    render() {
        var students = this.props.infos.map(student => {
            if(this.props.teacher) {
                return <Person key={student.id} name={student.name} id={student.id} email={student.email} delete={this.showConfirm.bind(this, student.id, this.props.idClass, this.refill.bind(this))} />
            }
            return <Person key={student.id} name={student.name} id={student.id} email={student.email} />
        })
        return (
            <div className={style.students_infos}>
                <h2><b>Elèves</b> : {this.props.count} participants 
                { 
                    this.props.teacher && 
                    <AddPersonWindowWrapper refill={this.props.refill} persons={this.props.all} teacher={false} idClass={this.props.idClass} /> 
                } 
                </h2>
                <div className={this.props.exos ? style.tiny_grid_persons : style.grid_persons}>
                    {students}
                </div>
            </div>
        );
    }
}

export default DisplayStudentsInfos;