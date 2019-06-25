import React, { Component } from 'react';
import style from './style.css';

import Person from './Person';

class DisplayProfessorsInfos extends Component {

    constructor() {
        super();
        this.state = {
            
        }
    }

    render() {
        var profs = this.props.infos.map(prof => {
            return <Person name={prof.name} />
        })
        return (
            <div className={style.professors_infos}>
                <h2><b>Professeurs</b> : {this.props.count} participants</h2>
                <div className={style.grid_persons}>
                    {profs}
                </div>
            </div>
        );
    }
}

export default DisplayProfessorsInfos;