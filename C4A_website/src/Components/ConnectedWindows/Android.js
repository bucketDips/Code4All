import React, { Component } from 'react';
import ConnectedWindowsStructure from '../ConnectedWindowsStructure/';
import style from './style.css';

/**
 * The android page
 */
class AndroidWindow extends Component {

  /**
   * render method
   */
  render() {
    var content = (
        <div className={style.bodyRoot} >
            <h1>Présentation de l'application android</h1>
                <h2>1. Spécificités techniques requises</h2>

                <p className={style.centeredParagraph}>
                Codinschool est une application compatible android 4 jusqu'à android 9. 
                Cette dernière est disponible uniquement sur tablette.
                Il faudra également avoir accès à internet depuis cette dernière pour pouvoir accéder à l'application 
                et ses fonctionnalités.
                </p>

                <h2>2. Comment utiliser Codinschool ? </h2>

                  <h3>Connexion</h3>
                  <img className={style.appImage} src={process.env.PUBLIC_URL + "screen1.png"} ></img>
                
                  <p className={style.centeredParagraph}>
                  Pour se connecter il suffit de renseigner un mail et un mot de passe valable puis cliquer sur le bouton de connection.
                  Pour avoir un compte il suffit d'accéder à la page d'inscription du site web codinschool.fr.
                  </p>

                  <h3>Navigation</h3>
                  <img className={style.appImage} src={process.env.PUBLIC_URL + "screen2.png"} ></img>

                  <p className={style.centeredParagraph}>
                  Pour naviguer entre les différents menu de l'application, il suffit de cliquer sur l'un des boutons situés verticalement au milieu de l'écran.
                  </p>

                  <h3>Classes</h3>	
                  <img className={style.appImage} src={process.env.PUBLIC_URL + "screen3.png"} ></img>
                  
                  <p className={style.centeredParagraph}>
                  Pour créer une classe il suffit de cliquer sur le bouton "+"
                  </p>
                  
                  <img className={style.appImage} src={process.env.PUBLIC_URL + "screen6.png"} ></img>
                  <p className={style.centeredParagraph}>
                  Puis cliquer sur le bouton bleu pour valider.
                  </p>

                  <img className={style.appImage} src={process.env.PUBLIC_URL + "screen4.png"} ></img>
                  <p className={style.centeredParagraph}>
                  En cliquant sur la ligne de classe, vous avez accès au détail de l'exercice.
                  </p>
                  
                  
                  <img className={style.appImage} src={process.env.PUBLIC_URL + "screen5.png"} ></img>
                  <p className={style.centeredParagraph}>
                  Vous pouvez saisir un email pour ajouter l'utilisateur dans la classe, par défaut il sera ajouté en tant qu'élève, mais en cochant "en tant que professeur" en haut à droite <br />
                  Vous pouvez en ajouter plusieurs d'un coup avant de cliquer sur le bouton ajouter en bas de la fenêtre.
                  </p>

                  <h3>Exercice</h3>
                  <img className={style.appImage} src={process.env.PUBLIC_URL + "screen7.png"} ></img>
                  <p className={style.centeredParagraph}>
                  Pour jouer un exercice il suffit de cliquer sur un élément dans la liste pour afficher son détail et cliquer sur le bouton jouer.
                  </p>
                  
                  
                  <img className={style.appImage} src={process.env.PUBLIC_URL + "screen8.png"} ></img>
                  <p className={style.centeredParagraph}>
                  Une fois sur le menu vous avez accès à l'exercice sur la gauche, vous pouvez cliquer sur le bouton "Fonctions" pour dérouler la liste de fonctions.
                  Vous pouvez afficher la liste des objectifs de l'exercice en cliquant sur le petit bouton information bleue.
                  </p>

                  <img className={style.appImage} src={process.env.PUBLIC_URL + "screen10.png"} ></img>
                  <p className={style.centeredParagraph}>
                  Dans Codinschool, résoudre un exercice consiste à placer des blocs en chaine pour éxecuter une suite d'actions.
                  Une fois la solution prête, vous pouvez éxecuter votre solution en cliquant sur le bouton play.
                  </p>

                  <img className={style.appImage} src={process.env.PUBLIC_URL + "screen9.png"} ></img>
                  
                  
                  
                  <h3>Store</h3>
                  <img className={style.appImage} src={process.env.PUBLIC_URL + "screen11.png"} ></img>
                  <p className={style.centeredParagraph}>
                  Ici vous pouvez rechercher un exercice en tapant dans la barre de recherche son titre, puis cliquer sur ajouter pour l'ajouter à votre liste d'exercices personnel.
                  </p>

                  <img className={style.background} src={process.env.PUBLIC_URL + "blackboard.jpg"} />
        </div>
    )
    return (
        <ConnectedWindowsStructure type="android" singleContent={content} />
    );
  }
}

export default AndroidWindow;
