import React, { Component } from 'react';
import style from './style.css';
import classes from '../../Providers/classes';
import ClassDetails from './ClassDetails';
import ExercicesDetails from './ExercicesDetails';
import { Modal } from 'antd';

const confirm = Modal.confirm;

class GestionClassWindow extends Component {

  constructor() {
    super();
    this.state = {
        classRoom: {},
        studentList: [],
        profList: [],
        exercicesDetailsVisible: false
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

  showExosPanel() {
    this.setState({exercicesDetailsVisible: this.state.exercicesDetailsVisible ? false : true});
  }

  componentWillMount() {
    this.refill();
  }

  render() {
    return (
        <div className={style.class} style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "blackboard.jpg)", backgroundSize: "cover"}}>
            <ClassDetails 
              showExosPanel={this.showExosPanel.bind(this)} 
              exos={this.state.exercicesDetailsVisible} 
              refill={this.refill.bind(this)} 
              classRoom={this.state.classRoom} 
              students={this.state.studentList} 
              profs={this.state.profList} 
              teacher={this.props.teacher} />
            {this.state.exercicesDetailsVisible &&
              <ExercicesDetails
                classRoom={this.state.classRoom} 
              />
            }
        </div>
    );
  }
}

export default GestionClassWindow;