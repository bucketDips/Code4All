import React, { Component } from 'react';
import style from './style.css';
import Person from './Person';

class DisplayStudentsInfos extends Component {

    constructor() {
        super();
        this.state = {
            
        }
    }

    render() {
        var students = this.props.infos.map(student => {
            return <Person name={student.name} />
        })
        return (
            <div className={style.students_infos}>
                <h2><b>Elèves</b> : {this.props.count} participants</h2>
                <div className={style.grid_persons}>
                    {students}
                </div>
            </div>
        );
    }
}

export default DisplayStudentsInfos;