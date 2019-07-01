var nextMove = avanceDroite;
var directions = {
    droite: "droite",
    bas: "bas",
    gauche: "gauche",
    haut: "haut"
}
var direction = directions.droite;
while (!foundLuigi()){
console.log(direction)
    if (direction  ===  directions.droite){
        if (blockEnBas() && !blockADroite()){
            avanceDroite();
        }
        else if (blockEnBas() && blockEnHaut() && blockADroite()){
            avanceGauche();
            direction = directions.gauche;
        }
        else if (blockEnBas() && blockADroite()){
            avanceHaut();
            direction = directions.haut;
        }
        else if (!blockEnBas()){
            avanceBas();
            direction = directions.bas;
        }

    }
    else if (direction  ===  directions.gauche){
        if (blockEnHaut() && !blockAGauche()){
            avanceGauche();
        }
        else if (blockAGauche() && blockEnHaut() && blockEnBas()){
            avanceDroite();
            direction = directions.gauche;
        }
        else if (blockEnHaut() && blockAGauche()){
            avanceBas();
            direction = directions.bas;
        }
        else if (!blockEnHaut()){
            avanceHaut();
            direction = directions.haut;
        }

    }
    else if (direction  ===  directions.bas){
        if (blockAGauche() && !blockEnBas()){
            avanceBas();
        }
        else if (blockAGauche() && blockEnBas() && blockADroite()){
            avanceHaut();
            direction = directions.haut;
        }
        else if (blockAGauche() && blockEnBas()){
            avanceDroite();
            direction = directions.droite;
        }
        else if (!blockAGauche()){
            avanceGauche();
            direction = directions.gauche;
        }

    }
    else if (direction  ===  directions.haut){
        if (blockADroite() && !blockEnHaut()){
            avanceHaut();
        }
        else if (blockAGauche() && blockEnHaut() && blockADroite()){
            avanceBas();
            direction = directions.bas;
        }
        else if (blockADroite() && blockEnHaut()){
            avanceGauche();
            direction = directions.gauche;
        }
        else if (!blockADroite()){
            avanceDroite();
            direction = directions.droite;
        }

    }
}
