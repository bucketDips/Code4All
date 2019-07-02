import React, { Component } from 'react';

/**
 * correspond the html big pages of the application
 */
class BigPages {
    android(style) {
        return (
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
        );
    }

    exercice(style) {
        return (
            <div className={style.bodyRoot} style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "blackboard.jpg" + ")", backgroundAttachment: "fixed", backgroundSize: "cover"}} >
            <h1>Manuel de création d'un exercice</h1>
                <h2>Rôle de la fenêtre</h2>

                    <img className={style.webImage} src={process.env.PUBLIC_URL + "screen.png"} ></img> 

                    <p className={style.centeredParagraph}>
                    Cette fenêtre va vous permettre de créer un nouvel exercice, ou d'en modifier un que vous avez déjà sauvegardé.
                    Elle est composée de plusieurs parties qui vont être décrites plus bas. Une fois l'exercice créé, il vous sera
                    possible de le sauvegarder et de le lancer pour pouvoir le tester.
                    </p>

                <h2>Différentes parties</h2>
                
                    <h3>La grille</h3>
                        <img className={style.appImage} src={process.env.PUBLIC_URL + "grid.png"} ></img>
                        <p className={style.centeredParagraph}>
                        Ce module correspond au mini-jeu que vous êtes en train de créer. Il contiendra tous la grille correspondant à celui-ci,
                        ainsi que tous les éléments contenus à l'intérieur. Ces éléments peuvent être de quatre type et sont matérialisés par la
                        toolbox (deuxième module en partant du haut à droite, il suffit de faire glisser un élément sur la grille pour l'y voir
                        apparaitre), dans l'ordre : <br /><br />
                        <ul>
                            <li><b>Block : </b>un block peut être utilisé comme récompense à atteindre, comme mur à ne pas franchir, etc</li>
                            <li><b>Npc : </b>un npc est un ennemi, définir un élément comme npc permet de plus tard le récupérer pour faire perdre le joueur s'il touche un élément de la liste de npc</li>
                            <li><b>Pc : </b>un npc est un personnage jouable par l'utilisateur</li>
                            <li><b>Label : </b>un label est un élément contenant du texte, et pas de background comme les trois autres, utilisé pour afficher un score par exemple</li>
                        </ul>
                        Il vous sera possible d'interagir dans le code de la même manière avec les quatre éléments (sauf le label qui ne possède pas de
                        background mais un text), l'intérêt d'en utiliser un plus qu'un autre est de ne pas se perdre dans le code, et de pouvoir parcourir
                        des lists d'éléments pour effectuer des traitements génériques.<br /><br />

                        Le bouton tout en haut à droite dans la grille permettra de modifier ses paramètres, et le slider tout en bas à droite permettra quant à lui
                        de modifier la taille de la grille. Enfin, il sera possible de cliquer sur n'importe quel élément qui a été déposé dans la grille pour modifier
                        ses paramètres.
                        </p>
                    <h3>Le code</h3>
                        <img className={style.appImage} src={process.env.PUBLIC_URL + "code.png"} ></img>
                        <p className={style.centeredParagraph}>
                        Le module code est le plus important de cette fenêtre. Il est interactif avec la grille et les paramètres, c'est à dire que 
                        faire glisser un élément ou en supprimer un sur la grille le fera apparaître/disparaitre dans le code, et réciproquement. De même, modifier
                        certaines des caractéristique d'un élément (taille, position, etc) ou de la grille modifiera directement le code. Nous reviendront plus tard
                        sur la création complète d'un exercice dans le code et les méthodes disponibles.
                        </p>
                    <h3>Les paramètres</h3>
                        <img className={style.appImage} src={process.env.PUBLIC_URL + "parameters.png"} ></img>
                        <p className={style.centeredParagraph}>
                        Cliquer sur le bouton de modification de la grille ou sur un élément dans celle-ci ouvrira cette fenêtre. Il y sera alors possible de 
                        modifier la position, la taille et la hauteur pour tous les élément, ainsi que le background pour la grille et les blocks, pcs et npcs, et le
                        texte pour un label. Les modifications se répercuteront sur la grille et le code.
                        </p>
                    <h3>Les motifs</h3>
                        <img className={style.appImage} src={process.env.PUBLIC_URL + "pattern.png"} ></img>
                        <p className={style.centeredParagraph}>
                        Ici sont contenus les motifs disponibles pour l'exercice. Il est possible via le bouton d'en ajouter un, et d'en supprimer un déjà présent en cliquant
                        dessus. Pour connaitre l'identifiant d'un pattern dans le but de l'utiliser dans le code ou les paramètres, il suffit de le survoler.
                        </p>
                    <h3>La description et les boutons</h3>
                        <img className={style.appImage} src={process.env.PUBLIC_URL + "description.png"} ></img>
                        <p className={style.centeredParagraph}>
                        Ici il est possible d'effectuer la description de l'exercice, qui sera visible par l'élève. Il n'est pas utilise de décrire les fonctions qui seront utilisables
                        car elles seront automatiquement générées à partir de celles déjà déclarées dans le code.<br />
                        En dessous deux boutons en mode création et trois en mode modification. La sauvegarde permet d'enregistrer l'exercice, après avoir renseigner son titre et sa 
                        présence dans le store (public). La suppression comme son nom l'indique supprimer l'exercice après confirmation. Et le bouton lancer permet de tester son exercice 
                        de manière temporaire pour vérifier que tout fonctionne avant de l'enregistrer.
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

        </div>
        );
    }
}

export default new BigPages();