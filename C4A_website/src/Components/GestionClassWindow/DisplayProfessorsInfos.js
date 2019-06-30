import React, { Component } from 'react';
import AddPersonWindowWrapper from './AddPersonWindowWrapper';
import style from './style.css';
import Person from './Person';
import { Modal } from 'antd';
import classes from '../../Providers/classes';

const confirm = Modal.confirm;

/**
* module containing all the professors of the class
*/
class DisplayProfessorsInfos extends Component {

    /**
    * reload the professors in class details
    */
    refill() {
        this.props.refill();
    }

    /**
    * show the modal of person suppression in the class
    */
    showConfirm(idPerson, idClass, cb) {
        confirm({
            title: 'Etes-vous sûr de vouloir supprimer cette personne de la classe ?',
            onOk() {
                classes.deleteProfessorFromClass(idPerson, idClass, cb);
            },
            onCancel() {
            },
        });
    }

    /**
    * render method
    */
    render() {
        var profs = this.props.infos.map(prof => {
            if(this.props.teacher) {
                return <Person key={prof.id} name={prof.name} id={prof.id} email={prof.email} delete={this.showConfirm.bind(this, prof.id, this.props.idClass, this.refill.bind(this))} />
            }
            return <Person key={prof.id} name={prof.name} id={prof.id} email={prof.email} />
        });

        return (
            <div className={style.professors_infos}>
                <h2><b>Professeurs</b> : {this.props.count} participants
                { 
                    this.props.teacher && 
                    <AddPersonWindowWrapper refill={this.props.refill} persons={this.props.all} teacher={true} idClass={this.props.idClass} /> 
                }
                </h2>
                <div className={this.props.exos ? style.tiny_grid_persons : style.grid_persons}>
                    {profs}
                </div>
            </div>
        );
    }
}

export default DisplayProfessorsInfos;