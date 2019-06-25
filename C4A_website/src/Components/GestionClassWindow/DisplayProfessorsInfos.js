import React, { Component } from 'react';
import AddPersonWindowWrapper from './AddPersonWindowWrapper';
import style from './style.css';

import Person from './Person';

class DisplayProfessorsInfos extends Component {
    render() {
        var profs = this.props.infos.map(prof => {
            return <Person name={prof.name} id={prof.id} />
        })
        return (
            <div className={style.professors_infos}>
                <h2><b>Professeurs</b> : {this.props.count} participants  { this.props.teacher && <AddPersonWindowWrapper persons={this.props.infos} /> }</h2>
                <div className={style.grid_persons}>
                    {profs}
                </div>
            </div>
        );
    }
}

export default DisplayProfessorsInfos;