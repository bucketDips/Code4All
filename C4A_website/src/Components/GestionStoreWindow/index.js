import React, { Component } from 'react';
import Exercice from './Exercice';
import style from './style.css';
import exercices from '../../Providers/exercices';

class GestionStoreWindow extends Component {

  constructor() {
    super();
    this.state = {
      exercices: []
    }
  }
  async componentWillMount() {
    var allExercices = await exercices.getFromStore();
    this.setState({exercices: allExercices});
  }

  async componentWillReceiveProps(props) {
    var allExercices = await exercices.getFromStore();
    this.setState({exercices: allExercices});
  }

  async refill() {
    var allExercices = await exercices.getFromStore();
    this.setState({exercices: allExercices});
  }

  render() {
    var exercices = this.state.exercices.map(exercice => {
      return (<Exercice 
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