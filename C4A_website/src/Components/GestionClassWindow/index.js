import React, { Component } from 'react';
import style from './style.css';
import classes from '../../Providers/classes';
import ClassDetails from './ClassDetails';

class GestionClassWindow extends Component {

  constructor() {
    super();
    this.state = {
        classRoom: {},
        studentList: [],
        profList: []
    }
  }

  async refill() {
    var classInfo = await classes.getClassInfo(this.props.id);
    this.setState({
      classRoom: classInfo.classRoom,
      studentList: classInfo.studentList,
      profList: classInfo.profList,
    });
  }

  componentWillMount() {
    this.refill();
  }

  render() {
    return (
        <div className={style.class} style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "blackboard.jpg)", backgroundSize: "cover"}}>
            <ClassDetails classRoom={this.state.classRoom} students={this.state.studentList} profs={this.state.profList} />
        </div>
    );
  }
}

export default GestionClassWindow;