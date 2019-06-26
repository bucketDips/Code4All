import React, { Component } from 'react';
import style from './style.css';

class GestionStoreWindow extends Component {

  constructor() {
    super();
    this.state = {
        
    }
  }

  render() {
      console.log(this.props.exercices);
    return (
        <div className={style.store} style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "blackboard.jpg)", backgroundSize: "cover"}}>
            coucou
        </div>
    );
  }
}

export default GestionStoreWindow;