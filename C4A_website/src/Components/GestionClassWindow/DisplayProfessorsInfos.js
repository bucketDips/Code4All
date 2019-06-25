import React, { Component } from 'react';
import AddPersonWindowWrapper from './AddPersonWindowWrapper';
import style from './style.css';

import Person from './Person';

class DisplayProfessorsInfos extends Component {
    render() {
        var profs = this.props.infos.map(prof => {
            return <Person name={prof.name} id={prof.id} email={prof.email} />
        })
        return (
            <div className={style.professors_infos}>
                <h2><b>Professeurs</b> : {this.props.count} participants
                { 
                    this.props.teacher && 
                    <AddPersonWindowWrapper refill={this.props.refill} persons={this.props.all} teacher={true} idClass={this.props.idClass} /> 
                }
                </h2>
                <div className={style.grid_persons}>
                    {profs}
                </div>
            </div>
        );
    }
}

export default DisplayProfessorsInfos;