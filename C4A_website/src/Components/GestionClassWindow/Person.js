import React, { Component } from 'react';
import ShowStudentExercices from './ShowStudentsExercices';
import style from './style.css';

/**
* class correspond to a person in the class
*/
class Person extends Component {
    
    state = {
        visible: false
    }

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
        var avatar = "https://avatars.dicebear.com/v2/jdenticon/" + this.props.name + ".svg"
        return (
            <div className={style.person} onClick={this.props.onClick}>
                <img alt="posts" className={style.posts} src={process.env.PUBLIC_URL + 'post.png'} />
                <img alt="avatar" className={style.avatar} src={avatar} />
                <div className={style.name}>{this.props.name}</div>
                <div className={style.email}>{this.props.email}</div>
                {
                    this.props.delete &&
                    <img alt="delete" onClick={this.props.delete} className={style.delete_button} src={process.env.PUBLIC_URL + 'cross.png'} />
                }
                {
                    this.props.exercices && this.props.exercices.length > 0 &&
                    <img alt="exos" onClick={this.showModal.bind(this)} className={style.exercices_button} src={process.env.PUBLIC_URL + 'rows.png'} />
                }
                {
                    this.props.exercices && this.props.exercices.length > 0 &&
                    <ShowStudentExercices
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        exercices={this.props.exercices}
                    />
                }
            </div>
        );
    }
}

export default Person;