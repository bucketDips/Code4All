import React, { Component } from 'react';
import style from './style.css';

import DisplayClassroomInfos from './DisplayClassroomInfos';
import DisplayStudentsInfos from './DisplayStudentsInfos';
import DisplayProfessorsInfos from './DisplayProfessorsInfos';

class ClassDetails extends Component {
    render() {
        if(this.props.teacher) {
            var exoButton = (<h2 style={{cursor: "pointer", width: "30%", flex: 1}} onClick={this.props.showExosPanel}>Gérer les exercices ></h2>)
        } 
        else {
            var exoButton = (<h2 style={{cursor: "pointer", width: "30%", flex: 1}} onClick={this.props.showExosPanel}>Exercices de la classe ></h2>)
        }
        return (
            <div className={style.class_details}>
                <h1>Détails de la classe</h1>
                <DisplayClassroomInfos infos={this.props.classRoom} teacher={this.props.teacher} />
                <DisplayProfessorsInfos
                    exos={this.props.exos}
                    refill={this.props.refill}
                    infos={this.props.profs} 
                    idClass={this.props.classRoom.id} 
                    all={this.props.profs.concat(this.props.students)} 
                    count={this.props.classRoom.profCount} 
                    teacher={this.props.teacher} />
                <DisplayStudentsInfos 
                    exos={this.props.exos}
                    refill={this.props.refill}
                    infos={this.props.students} 
                    idClass={this.props.classRoom.id} 
                    all={this.props.profs.concat(this.props.students)} 
                    count={this.props.classRoom.studentCount} 
                    teacher={this.props.teacher} />
                {exoButton}
            </div>
        );
    }
}

export default ClassDetails;