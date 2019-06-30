import React, { Component } from 'react';
import Exercice from './Exercice';
import style from './style.css';
import exercices from '../../Providers/exercices';

/**
 * class correspond to the store 
 */
class GestionStoreWindow extends Component {

  /**
    * constructor
    */
  constructor() {
    super();
    this.state = {
      exercices: []
    }
  }

  /**
    * set all exercices from the store
    */
  async componentWillMount() {
    var allExercices = await exercices.getFromStore();
    this.setState({exercices: allExercices});
  }

  /**
    * set all exercices from the store
    */
  async componentWillReceiveProps(props) {
    var allExercices = await exercices.getFromStore();
    this.setState({exercices: allExercices});
  }

  /**
    * called from exterior, set all
    * exercices from the store
    */
  async refill() {
    var allExercices = await exercices.getFromStore();
    this.setState({exercices: allExercices});
  }

  /**
    * render method
    */
  render() {
    var exercices = this.state.exercices.map(exercice => {
      return (<Exercice 
        key={exercice.exerciceId}
        refill={this.refill.bind(this)}
        id={exercice.exerciceId} 
        title={exercice.title} 
        author={exercice.authorName} 
        authorId={exercice.author_id} 
        description={exercice.description} />)
    });
    return (
        <div className={style.store} style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "blackboard.jpg)", backgroundSize: "cover"}}>
            {exercices}
        </div>
    );
  }
}

export default GestionStoreWindow;