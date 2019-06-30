import React, { Component } from 'react';
import style from './style.css';
import classes from '../../Providers/classes';
import ClassDetails from './ClassDetails';
import ExercicesDetails from './ExercicesDetails';

/**
* window of gestion class, called when accessing
* to a class from the menu
*/
class GestionClassWindow extends Component {

  /**
    * constructor
    */
  constructor() {
    super();
    this.state = {
        classRoom: {},
        studentList: [],
        profList: [],
        exosList: [],
        exercicesDetailsVisible: false
    }
  }

  /**
    * reload all of the class informations
    */
  async refill() {
    var classInfo = await classes.getClassInfo(this.props.id);
    this.setState({
      classRoom: classInfo.classRoom,
      studentList: classInfo.studentList,
      profList: classInfo.profList,
      exosList: classInfo.exerciceList
    });
  }

  /**
    * action when the user click on show exercices 
    */
  showExosPanel() {
    this.setState({exercicesDetailsVisible: this.state.exercicesDetailsVisible ? false : true});
  }

  /**
    * auto refill when component start
    */
  componentWillMount() {
    this.refill();
  }

  /**
    * render method
    */
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
                exos={this.state.exosList}
                refill={this.refill.bind(this)}
                teacher={this.props.teacher}
              />
            }
        </div>
    );
  }
}

export default GestionClassWindow;