import React, { Component } from 'react';
import AddPersonWindowWrapper from './AddPersonWindowWrapper';
import style from './style.css';
import Person from './Person';

class DisplayStudentsInfos extends Component {
    render() {
        var students = this.props.infos.map(student => {
            return <Person name={student.name} id={student.id} email={student.email} />
        })
        return (
            <div className={style.students_infos}>
                <h2><b>Elèves</b> : {this.props.count} participants 
                { 
                    this.props.teacher && 
                    <AddPersonWindowWrapper refill={this.props.refill} persons={this.props.all} teacher={false} idClass={this.props.idClass} /> 
                } 
                </h2>
                <div className={style.grid_persons}>
                    {students}
                </div>
            </div>
        );
    }
}

export default DisplayStudentsInfos;