import React, { Component } from 'react';
import Exercice from './Exercice';
import style from './style.css';

class GestionStoreWindow extends Component {

  componentWillMount() {
    this.setState({exercices: this.props.exercices});
  }

  render() {
    var exercices = this.state.exercices.map(exercice => {
      return (<Exercice 
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