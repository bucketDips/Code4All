import React, { Component } from 'react';
import style from './style.css';

class DisplayClassroomInfos extends Component {
    render() {
        return (
            <div className={style.classroom_infos}>
                <h2><b>Classe</b> {this.props.infos.name} : {this.props.infos.profCount + this.props.infos.studentCount} participants</h2>
            </div>
        );
    }
}

export default DisplayClassroomInfos;