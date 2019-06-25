import React, { Component } from 'react';
import style from './style.css';
import classes from '../../Providers/classes';
import ClassDetails from './ClassDetails';
import { Modal } from 'antd';

const confirm = Modal.confirm;

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
      console.log(this.props);
    return (
        <div className={style.class} style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "blackboard.jpg)", backgroundSize: "cover"}}>
            <ClassDetails refill={this.refill.bind(this)} classRoom={this.state.classRoom} students={this.state.studentList} profs={this.state.profList} teacher={this.props.teacher} />
        </div>
    );
  }
}

export default GestionClassWindow;