import React, { Component } from 'react';
import style from '../index.css';

class ErrorWindow extends Component {
  render() {
    return (
        <div className={style.error_window} style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/blackboard.jpg)", backgroundSize: "cover"}}>
            <div className={style.text}>
              <p>Erreur 404<br></br>la page demandée n'est pas disponible !</p>
            </div>
        </div>
    );
  }
}

export default ErrorWindow;
