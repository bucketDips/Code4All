import React, { Component } from 'react';
import style from './style.css';

import DisplayClassroomInfos from './DisplayClassroomInfos';
import DisplayStudentsInfos from './DisplayStudentsInfos';
import DisplayProfessorsInfos from './DisplayProfessorsInfos';
import SignInNewStudentsForm from './SignInNewStudentsForm';

/**
* module containing all of the class details (person, exercices)
*/
class ClassDetails extends Component {

    state = {
        visible: false
    };

    /**
    * show modal 
    */
   showModal = () => {
    this.setState({ visible: true });
    };

    /**
    * hide modal 
    */
    handleCancel = () => {
        this.setState({ visible: false });
    };

    /**
    * save modal ref here 
    */
    saveFormRef = formRef => {
    this.formRef = formRef;
    };

    /**
    * render method
    */
    render() {
        if(this.props.teacher) {
            var exoButton = (<h2 style={{cursor: "pointer", width: "30%", flex: 0.5}} onClick={this.props.showExosPanel}>Gérer les exercices ></h2>)
            var signInButton = (<h2 style={{cursor: "pointer", width: "30%", flex: 0.5}} onClick={this.showModal.bind(this)}>Ajouter des élèves à l'application ></h2>)
        } 
        else {
            exoButton = (<h2 style={{cursor: "pointer", width: "30%", flex: 1}} onClick={this.props.showExosPanel}>Exercices de la classe ></h2>)
            signInButton = (<div></div>)
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
                <SignInNewStudentsForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                />
                {exoButton}
                {signInButton}
            </div>
        );
    }
}

export default ClassDetails;