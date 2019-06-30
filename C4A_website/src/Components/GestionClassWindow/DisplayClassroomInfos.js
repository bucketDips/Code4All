import React, { Component } from 'react';
import style from './style.css';

/**
* module containing classroom informations (name, count, etc)
*/
class DisplayClassroomInfos extends Component {

    /**
    * render method
    */
    render() {
        return (
            <div className={style.classroom_infos}>
                <h2><b>Classe</b> {this.props.infos.name} : {this.props.infos.profCount + this.props.infos.studentCount} participants</h2>
                <h2><b>Statut dans cette classe : </b> {this.props.teacher === true ? "professeur" : "élève"}</h2>
            </div>
        );
    }
}

export default DisplayClassroomInfos;