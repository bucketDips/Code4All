import React, { Component } from 'react';
import { Parallax, Background } from 'react-parallax';

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
                    

                <h2>Comment coder un exercice ?</h2>
                        
                        <p className={style.centeredParagraph}>
                        D'abord il faut réfléchir à ce qu'on veut comme exercice. Ici le but sera que mario atteigne l'arrivée sans toucher goomba. Quatre méthodes seront 
                        offertes à l'étudiant : haut, bas, droite et ennemiDevant. L'unique test sera de vérifier si la position de mario correspond bien à celle de la ligne d'arrivée.
                        </p>

                    <h3>Ajouter les éléments</h3>
                        <img className={style.webImage} src={process.env.PUBLIC_URL + "tuto1.png"} ></img>
                        <p className={style.centeredParagraph}>
                        Premièrement il est nécessaire d'ajouter ses éléments, en faisant glisser déposer depuis la toolbox sur la grille. Comme on peut le voir, ceux-ci 
                        s'affichent directement dans le code, avec des identifiants générer incrémentalement, de même que leurs noms. Ici on a donc ajouté un block (bloc à atteindre), 
                        un pc (personnage que l'étudiant déplacera) et un npc (personnage qui tuera l'étudiant s'il le touche).
                        </p>

                    <h3>Styliser les éléments</h3>
                        <img className={style.webImage} src={process.env.PUBLIC_URL + "tuto2.png"} ></img>
                        <p className={style.centeredParagraph}>
                        En cliquant sur chaque élément et en modifiant le pattern dans les paramètres, ou bien directement en le modifiant dans le code, il nous sera possible
                        de rendre l'exercice plus joli.
                        </p>

                    <h3>Ajouter les fonctions utilisables</h3>
                        <img className={style.webImage} src={process.env.PUBLIC_URL + "tuto3.png"} ></img>
                        <p className={style.centeredParagraph}>
                        Ici on va ajouter les fonctions qui seront utilisables par l'élève. Pour cela on définit d'abord la fonction,
                        puis on créé un object fonction avec la méthode createFunction() de la même manière qu'on aurait créé un block. Cette fonction 
                        prendre en paramètre en premier le nom de la fonction (qui doit être le même qu'au moment de sa définition /!\), la fonction puis une description pour 
                        l'élève. Enfin, on ajoutera ce nouvel object à la grille. Les fonctions peuvent être de vérification et retourner des choses, ou juste des actions sur 
                        la grille. Ici deux autres méthodes importantes :<br />
                        - grid.end : permet de terminer le jeu. Si on ne prend pas de paramètre à la méthode end le jeu se terminera et les tests seront effectués, si on met un 
                        message l'erreur s'affichera pour l'élève et remplacera les tests. <br />
                        - grid.saveState : à appeller à chaque fois qu'il y a une modification sur la grille, sinon les changement des positions des éléments ne s'afficheront pas 
                        au fur et à mesure pour l'élève.
                        </p>

                    <h3>Ajouter les tests qui se lanceront</h3>
                        <img className={style.webImage} src={process.env.PUBLIC_URL + "tuto4.png"} ></img>
                        <p className={style.centeredParagraph}>
                        Cela marche exactement de la même manière que pour créer une fonction sauf qu'il faut l'ajouter à la liste de tests à la fin du code. Autre particularité : 
                        il faut retourner impérativement /!\ un tableau qui ressemble à [true si réussi sinon false, "message à afficher en résultat du test"]. Les tests générés 
                        de cette manière seront directement passés à la fin de l'exercice si aucun end avec message n'est appelé.
                        </p>

                    <h3>Listing des méthodes</h3>
                        <p className={style.centeredParagraph}>
                        <b>Méthodes de la grille : </b>
                        <ul>
                            <li>grid.end(message optionnel) : termine le jeu, si erreur mettre un message</li>
                            <li>grid.saveState() : sauvegarde l'état de la grille en cours, pour pouvoir animer le jeu</li>
                            <li>grid.changePattern(id du pattern) : change le motif de la grille</li>
                            <li>grid.addBlock(l'object block) : ajoute un block à la grille</li>
                            <li>grid.addNpc(l'object npc) : ajoute un npc à la grille</li>
                            <li>grid.addPc(l'object pc) : ajoute un pc à la grille</li>
                            <li>grid.addLabel(l'object label) : ajoute un label à la grille</li>
                            <li>grid.addFunction(l'object function) : ajoute une nouvelle fonction disponible pour l'étudiant</li>
                            <li>grid.addTest(l'object function) : ajoute un nouveau test à éxecuter</li>
                            <li>grid.removeBlock(id du block) : enlève un block de la grille</li>
                            <li>grid.removeNpc(id du npc) : enlève un npc de la grille</li>
                            <li>grid.removePc(id du pc) : enlève un pc de la grille</li>
                            <li>grid.removeLabel(id du label) : enlève un label de la grille</li>
                            <li>grid.getBlocks() : retourne les blocks de la grille</li>
                            <li>grid.getNpcs() : retourne les npcs de la grille</li>
                            <li>grid.getPcs() : retourne les pcs de la grille</li>
                            <li>grid.getLabels() : retourne les labels de la grille</li>
                            <li>grid.getBlock(id du block) : retourne un block de la grille</li>
                            <li>grid.getNpc(id du npc) : retourne un npc de la grille</li>
                            <li>grid.getPc(id du pc) : retourne un pc de la grille</li>
                            <li>grid.getLabel(id du label) : retourne un label de la grille</li>
                            <li>grid.blockExists(id du block) : vérifie si un block existe</li>
                            <li>grid.npcExists(id du npc) : vérifie si un npc existe</li>
                            <li>grid.pcExists(id du pc) : vérifie si un pc existe</li>
                            <li>grid.labelExists(id du label) : vérifie si un label existe</li>
                        </ul>
                        <b>Méthodes des blocks : </b>
                        <ul>
                            <li>new Block(id du block, ligne du block, colonne du block, largeur du block, hauteur du block, id du motif à utiliser) : permet de créer un nouvel object block,
                                qu'on ajoutera à la grille
                            </li>
                            <li>block.changeRow(nouvelle ligne) : change la ligne de placement de l'élément</li>
                            <li>block.changeColumn(nouvelle colonne) : change la colonne de placement de l'élément</li>
                            <li>block.changeWidth(nouvelle largeur) : change la largeur de l'élément</li>
                            <li>block.changeHeight(nouvelle hauteur) : change la hauteur de l'élément</li>
                            <li>block.changePattern(id du motif) : change le motif de l'élément</li>
                        </ul>
                        <b>Méthodes des npcs : </b>
                        <ul>
                            <li>new Npc(id du npc, ligne du npc, colonne du npc, largeur du npc, hauteur du npc, id du motif à utiliser) : permet de créer un nouvel object npc,
                                qu'on ajoutera à la grille
                            </li>
                            <li>npc.changeRow(nouvelle ligne) : change la ligne de placement de l'élément</li>
                            <li>npc.changeColumn(nouvelle colonne) : change la colonne de placement de l'élément</li>
                            <li>npc.changeWidth(nouvelle largeur) : change la largeur de l'élément</li>
                            <li>npc.changeHeight(nouvelle hauteur) : change la hauteur de l'élément</li>
                            <li>npc.changePattern(id du motif) : change le motif de l'élément</li>
                        </ul>
                        <b>Méthodes des pcs : </b>
                        <ul>
                            <li>new Pc(id du pc, ligne du pc, colonne du pc, largeur du pc, hauteur du pc, id du motif à utiliser) : permet de créer un nouvel object pc,
                                qu'on ajoutera à la grille
                            </li>
                            <li>pc.changeRow(nouvelle ligne) : change la ligne de placement de l'élément</li>
                            <li>pc.changeColumn(nouvelle colonne) : change la colonne de placement de l'élément</li>
                            <li>pc.changeWidth(nouvelle largeur) : change la largeur de l'élément</li>
                            <li>pc.changeHeight(nouvelle hauteur) : change la hauteur de l'élément</li>
                            <li>pc.changePattern(id du motif) : change le motif de l'élément</li>
                        </ul>
                        <b>Méthodes des labels : </b>
                        <ul>
                            <li>new Label(id du label, ligne du label, colonne du label, largeur du label, hauteur du label, texte du label) : permet de créer un nouvel object label,
                                qu'on ajoutera à la grille
                            </li>
                            <li>label.changeRow(nouvelle ligne) : change la ligne de placement de l'élément</li>
                            <li>label.changeColumn(nouvelle colonne) : change la colonne de placement de l'élément</li>
                            <li>label.changeWidth(nouvelle largeur) : change la largeur de l'élément</li>
                            <li>label.changeHeight(nouvelle hauteur) : change la hauteur de l'élément</li>
                            <li>label.changeText(nouveau texte) : change le texte de l'élément</li>
                        </ul>
                        </p>
                        
        </div>
        );
    }

    store(style) {
        return (
            <div className={style.bodyRoot} style={{minHeight: "100%", backgroundImage: "url(" + process.env.PUBLIC_URL + "blackboard.jpg" + ")", backgroundAttachment: "fixed", backgroundSize: "cover"}} >
            <h1>Le store</h1>

                    <p style={{marginTop: "10%"}} className={style.centeredParagraph}>
                    Le store est un des éléments les plus intéressant de notre système, car il est participatif !<br />
                    Lorsque vous créer un exercice, il est possible de le définir comme public ou privé. Si vous le mettez en public,
                    tout le monde pourra y accéder et le voir sur le store. Il sera alors possible aux gens de le récupérer pour le réaliser de leur côté,
                    ou bien même pour le donner à leurs élèves dans les classes créées !<br /><br />

                    Il est possible de voir tous les exercices en cliquant sur "voir tout", la liste s'affichera et il vous sera ensuite possible de récupérer 
                    n'importe quel exercice en cliquant sur sa petite étoile. Il sera alors présent dans la partie "exercices récupérés" de la page d'exercices.
                    </p>
                        
            </div>
        );
    }

    classe(style) {
        return (
            <div className={style.bodyRoot} style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "blackboard.jpg" + ")", backgroundAttachment: "fixed", backgroundSize: "cover"}} >
            <h1>Manuel de gestion d'une classe</h1>

                <img className={style.webImage} src={process.env.PUBLIC_URL + "classe1.png"} ></img>

                <h2>Rôle de la fenêtre</h2>

                    <p className={style.centeredParagraph}>
                    La création et réalisation d'exercice sont certes les fonctionnalités les plus avancées de notre système, mais en 
                    plus de ça il vous est possible d'administrer des classes, dans le but de faire des programmes adaptés pour vos élèves.
                    Cette page va donc vous permettre de gérer une classe en particulier. Comme on peut voir dans le menu déroulant, on peut 
                    consulter les classes où on est élève, celles où on est professeur, et enfin on peut créer une nouvelle classe (le nom nous sera 
                    demandé puis la classe sera ajoutée aux classes où on est professeur). Tandis que la page de gestion professeur nous offrira plusieurs éléments 
                    de gestion que nous allons décrire, la page élève n'offrira que la possibilité de consulter les détails de la classe et de répondre à des exercices.
                    </p>
                
                <h2>Gérer sa classe</h2><br />
                        <h3>Gérer les personnes</h3>
                        <img className={style.webImage} src={process.env.PUBLIC_URL + "classe2.png"} ></img>
                        <p className={style.centeredParagraph}>
                        Comme on peut le voir, on a déjà accès aux détails de la classe en tant que professeur. Il est possible d'ajouter un élève ou un professeur grâce 
                        aux deux croix blanches présentes à côté des comptes élèves et professeurs. On peut aussi supprimer un professeur ou un élève (mais pas soit-même) de la 
                        classe grâce à la croix rouge sur les post-its pour chaque personnes. Lors de l'ajout, une fenêtre spécifique s'ouvrira, exemple ci-dessus. Vous pourrez rechercher 
                        un élève ou professeur par nom, et cliquer sur ceux que vous voulez ajouter. Une fois votre sélection faite, un clic sur sauvegarder les ajoutera au rôle sélectionné.
                        Il est aussi possible si l'étudiant a répondu à des exercices ajoutés à la classe qu'une autre icone apparaisse en dessous de la croix rouge. Cliquer dessus 
                        permettra de consulter son avancement dans une nouvelle fenêtre.
                        </p>

                        <h3>Gérer les exercices</h3>
                        <img className={style.webImage} src={process.env.PUBLIC_URL + "classe3.png"} ></img>
                        <p className={style.centeredParagraph}>
                        On aura la possibilité d'ajouter des exercices réalisables par les étudiants à la classe en cliquant sur "gérer les exercices". Cela ouvre un panel qu'on peut voir ici 
                        à droite en transparence. S'y afficheront les exercices déjà ajoutés, qu'on pourra supprimer de la casse via la croix rouges. Enfin la croix blanche nous permettra d'ajouter 
                        des exercices et ouvrira la fenêtre qu'on peut voir sur l'image ci-dessus. Tout comme pour les personnes, il faut cliquer sur les exercices que l'on veut ajouter dans la 
                        liste de gauche, puis sur sauvegarder lorsque l'on a finit. Les exercices apparaitront dans le panel et seront accessible par les étudiants.
                        </p>

                        <h3>Ajouter des élèves</h3>
                        <img className={style.appImage} src={process.env.PUBLIC_URL + "classe4.png"} ></img>
                        <p className={style.centeredParagraph}>
                        On aura la possibilité d'inscrire de nouveaux étudiants en cliquant sur "ajouter des élèves à l'application". Cela ouvrira la fenêtre ci-dessus similaire à 
                        la fenêtre d'inscription. Les élèves n'auront ainsi pas à passer par ce processus et pourront se connecter plus simplement sur l'application android.
                        </p>
            </div>
        );
    }

    home(style) {
        return (
            <div className={style.homeRoot}>
                <div className={style.first_panel} >
                    <img className={style.biglogo} src={process.env.PUBLIC_URL + "logo.png"} ></img>
                    <div className={style.description}>
                        <h3>Bienvenue sur CodInSchool !</h3><br />
                        <p className={style.desc_txt}>CodInSchool est une plateforme en ligne disponible sur ordinateur portable ou tablette android
                        destinée à l'apprentissage du code, au travers de mini-jeux ludiques et créés parcipatitivement !</p>
                    </div>
                </div>
                <Parallax
                    blur={0.1}
                    bgImage={process.env.PUBLIC_URL + "imgparallax.jpeg"}
                    bgImageAlt="code"
                    strength={500}
                >

                    <div style={{ height: '340px' }} />
                </Parallax>
                <div className={style.public} >
                    <div className={style.public_title}>
                        <h3 style={{width: "100%", textAlign: "center", color: "black"}}>A qui CodInSchool s'adresse-t-il ?</h3>
                    </div>
                    <div className={style.public_public}>
                        <div className={style.role}>
                            <div className={style.logo}>
                                <img src={process.env.PUBLIC_URL + "student.png"} ></img>
                            </div>
                            <div className={style.text_logo}>
                                <h3><i>Aux étudiants</i></h3>
                                <p className={style.sub_text}>De 7 à 77 ans, il n'y a pas d'âge pour apprendre à coder !
                                Alors que la tablette est réservée aux plus jeunes étudiants, le site web 
                                permettra d'effectuer des exercices plus complexes, alors à vous de choisir.
                                </p>
                            </div>
                        </div>
                        <div className={style.role}>
                            <div className={style.logo}>
                                <img src={process.env.PUBLIC_URL + "teacher.png"} ></img>
                            </div>
                            <div className={style.text_logo}>
                                <h3><i>Aux professeurs</i></h3>
                                <p className={style.sub_text}>
                                    Le programme scolaire devient en plus en plus dur avec l'intégration du code 
                                    dans les cursus, et nous avons la solution ! 
                                    Qu'ils soient du store ou de votre imagination, les exercices seront beaucoup plus ludiques 
                                    et vos étudiants progresseront plus vite.
                                </p>
                            </div>
                        </div>
                        <div className={style.role}>
                            <div className={style.logo}>
                                <img src={process.env.PUBLIC_URL + "autodidact.png"} ></img>
                            </div>
                            <div className={style.text_logo}>
                                <h3><i>Aux autodidactes</i></h3>
                                <p className={style.sub_text}>
                                    Pas besoin de suivre des cours où d'être au sein d'un cursus pour apprendre le code ! CodInSchool 
                                    sera un vrai tremplin pour vous lancer dans ce domaine. Récupérez quelques exercices du store, lancez-les, 
                                    et le tour est joué !
                                </p>
                            </div>
                        </div>
                        <div className={style.role}>
                            <div className={style.logo}>
                                <img src={process.env.PUBLIC_URL + "creative.png"} ></img>
                            </div>
                            <div className={style.text_logo}>
                                <h3><i>Aux créatifs</i></h3>
                                <p className={style.sub_text}>
                                    Vous aimez aider les gens ? Ou bien créer des jeux, ou juste coder ? Alors empressez-vous 
                                    d'aller créer des exercices via l'éditeur et de les proposer sur le store ! Les professeurs seront contents 
                                    et notre contenu pourra se renforcer. Nous vous en remercions d'avance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.inside_gif}>
                    <div className={style.public_title}>
                        <h3 style={{width: "100%", textAlign: "center", color: "black"}}>Un exemple de jeu créé avec CodInSchool ?</h3>
                    </div>
                    <div className={style.public_public}>
                        <div className={style.gif_box}>
                            <img className={style.gif} src={process.env.PUBLIC_URL + "mario.gif"} ></img>
                        </div>
                    </div>
                    <div className={style.public_title}>
                        <i><h3 style={{fontSize: "1vh", width: "100%", textAlign: "center", color: "black"}}>
                            Ce jeu a été créé via l'éditeur du jeu. Il est facilement accessible sur tablette et ordinateur mais est réservé aux plus jeunes.
                        </h3></i>
                    </div>
                </div>
                <Parallax
                    blur={0.1}
                    bgImage={process.env.PUBLIC_URL + "imgparallax2.jpeg"}
                    bgImageAlt="code"
                    strength={500}
                >

                    <div style={{ height: '340px' }} />
                </Parallax>
                <div className={style.how_to}>
                    <div className={style.public_title}>
                        <h3>Je suis intéressé ! Comment commencer ?</h3>
                    </div>
                    <div className={style.public_how_tos}>
                        <h3>Pour cela, laissez-moi vous présenter les différentes pages de l'application</h3>
                        <div className={style.contents}>
                            <div className={style.content}>
                                <div className={style.content_img} >
                                    <img src={process.env.PUBLIC_URL + "classes.png"} ></img>
                                </div>
                                <div className={style.content_text}>
                                    La page classe va être utilisée pour tout ce qui est gestion d'une classe et des élèves qu'elle contient. Il sera possible 
                                    de créer des classes à loisir, d'y ajouter ou enlever élèves et professeurs. Une partie exercice permettra aussi de rajouter 
                                    des exercices créés ou récupérés du magasin dans la classe, ainsi les élèves pourront les résoudre et vous pourrez observer leur parcours.
                                    Enfin, en tant qu'élève vous pourrez consulter dans les classes auxquels vous appartenez les exercices disponibles et les résoudre.
                                </div>
                            </div>
                            <div className={style.content}>
                                <div className={style.content_text}><br />
                                    La page exercices est la plus importante de ce site ! Elle contient l'éditeur d'exercice qui vous permettra de créer de nouveaux mini-jeux à proposer 
                                    à vos élèves. De plus, tous les exercices que vous avez récupéré du store seront présents dans cette page, mais pas modifiable ! Il sera 
                                    aussi possible d'enregistrer vos exercices pour les modifier plus tard.
                                </div>
                                <div className={style.content_img} >
                                    <img src={process.env.PUBLIC_URL + "exercices.png"} ></img>
                                </div>
                            </div>
                            <div className={style.content}>
                                <div className={style.content_img} >
                                    <img src={process.env.PUBLIC_URL + "magasin.png"} ></img>
                                </div>
                                <div className={style.content_text}><br />
                                    Le magasin est l'endroit du site où vous pourrez consulter tous les exercices disponibles, c'est-à-dire ceux que les utilisateurs ont enregistré 
                                    en "public". Il vous sera alors possible de récupérer ces exercices, que vous retrouvez dans la page associée.    
                                </div>  
                            </div>
                            <div className={style.content}>
                                <div className={style.content_text}><br />
                                    Enfin, la partie android contient un manuel d'utilisation de notre application, disponible sur le playstore. Celle-ci est assez facile de prise en 
                                    main, et il ne vous faudra que peu de temps pour la maitriser ! Mais n'hésitez pas à lire le manuel, pour ne pas être perdu.
                                </div>
                                <div className={style.content_img} >
                                    <img src={process.env.PUBLIC_URL + "android.png"} ></img>
                                </div>
                            </div>
                        </div>
                        <h3 style={{marginBottom:"2%", marginTop:"5%"}}>Il est à savoir que toutes ces pages possèdent une présentation explicative pour mieux comprendre leur usage.<br />
                        Nous vous conseillons donc de commencer par récupérer des exercices du store et les essayer, puis à tenter d'en créer vous-même !<br />
                        Maintenant que vous avez tout assimilé, je vous laisse naviguer à loisir sur le site, bonne visite !</h3>
                    </div>
                </div>
                <div className={style.footer} ><i>En cas de question sur le site ou commerciale, n'hésitez pas à nous contacter à l'adresse codinschool@gmail.com</i></div>
            </div>
        );
    }
}

export default new BigPages();