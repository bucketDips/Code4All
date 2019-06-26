import React, { Component } from 'react';
import style from './style.css';

import DisplayClassroomInfos from './DisplayClassroomInfos';
import DisplayStudentsInfos from './DisplayStudentsInfos';
import DisplayProfessorsInfos from './DisplayProfessorsInfos';

class ClassDetails extends Component {
    render() {
        return (
            <div className={style.class_details}>
                <h1>Détails de la classe</h1>
                <DisplayClassroomInfos infos={this.props.classRoom} teacher={this.props.teacher} />
                <DisplayProfessorsInfos 
                    refill={this.props.refill}
                    infos={this.props.profs} 
                    idClass={this.props.classRoom.id} 
                    all={this.props.profs.concat(this.props.students)} 
                    count={this.props.classRoom.profCount} 
                    teacher={this.props.teacher} />
                <DisplayStudentsInfos 
                    refill={this.props.refill}
                    infos={this.props.students} 
                    idClass={this.props.classRoom.id} 
                    all={this.props.profs.concat(this.props.students)} 
                    count={this.props.classRoom.studentCount} 
                    teacher={this.props.teacher} />
            </div>
        );
    }
}

export default ClassDetails;