import React, { Component } from 'react';
import style from './style.css';

import DisplayClassroomInfos from './DisplayClassroomInfos';
import DisplayStudentsInfos from './DisplayStudentsInfos';
import DisplayProfessorsInfos from './DisplayProfessorsInfos';

class ClassDetails extends Component {
    render() {
        console.log(this.props);
        return (
            <div className={style.class_details}>
                <h1>Détails de la classe</h1>
                <DisplayClassroomInfos infos={this.props.classRoom} />
                <DisplayProfessorsInfos infos={this.props.profs} count={this.props.classRoom.profCount} />
                <DisplayStudentsInfos infos={this.props.students} count={this.props.classRoom.studentCount} />
            </div>
        );
    }
}

export default ClassDetails;