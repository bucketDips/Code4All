import React, { Component } from 'react';
import Exercice from './Exercice';
import styles from './style.css';
import exercices from '../../Providers/exercices';

/**
 * form of adding an exercice to the class
 */
class AddExerciceForm extends Component {

    /**
    * constructor 
    */
    constructor() {
        super();
        this.state = {
            exercices: [],
            addedExercices: []
        }
    }

    /**
    * check if an exercice with the id
    * is in the array exercices 
    */
    isIn(id, exercices) {
        for(var i = 0; i < exercices.length; i++) {
            if(exercices[i].exercice_id === id) {
                return true;
            }
        }
        return false;
    }

    /**
    * fill the exercices perso and from store in 
    * the disponible exercices 
    */
    async componentWillMount() {
        var allExercices = await exercices.getMines();
        var disponibleExercices = [];
        for(var i = 0; i < allExercices.data.perso.length; i++) {
            if(!this.isIn(allExercices.data.perso[i].id, this.props.exercices)){
                allExercices.data.perso[i].author = " moi";
                allExercices.data.perso[i].exercice_id = allExercices.data.perso[i].id;
                disponibleExercices.push(allExercices.data.perso[i]);
            }
        }
        for(i = 0; i < allExercices.data.forked.fromStore.length; i++) {
            if(!this.isIn(allExercices.data.forked.fromStore[i].id, this.props.exercices)){
                allExercices.data.forked.fromStore[i].author = " un autre";
                allExercices.data.forked.fromStore[i].exercice_id = allExercices.data.forked.fromStore[i].id;
                disponibleExercices.push(allExercices.data.forked.fromStore[i]);
            }
        }
        this.setState({exercices: disponibleExercices});
    }
    
    /**
    * action of adding an exercice in the toadd list 
    */
    add(exo) {
        var ex = this.state.addedExercices;
        ex.push(exo);
        var filtered = this.state.exercices.filter(function(value, index, arr){
            return value.id !== exo.id;
        });
        this.setState({
            addedExercices: ex,
            exercices: filtered
        }, () => {
            this.props.updateToAdd(this.state.addedExercices);
        });

    }

    /**
    * action of removing an exercice of the toaddlist 
    */
    remove(exo) {
        var ex = this.state.exercices;
        ex.push(exo);
        var filtered = this.state.addedExercices.filter(function(value, index, arr){
            return value.id !== exo.id;
        });
        this.setState({
            addedExercices: filtered,
            exercices: ex
        }, () => {
            this.props.updateToAdd(this.state.addedExercices);
        });
    }

    /**
    * render method 
    */
    render() {
        var exercices = this.state.exercices.map(exercice => {
            return <Exercice key={exercice.exercice_id} infos={exercice} onClick={this.add.bind(this, exercice)} />
        });

        var addedExercices = this.state.addedExercices.map(exercice => {
            return <Exercice key={exercice.exercice_id} infos={exercice} onClick={this.remove.bind(this, exercice)} />
        });

        return (
            <div className={styles.add_form_exercice}>
                <div className={styles.found_persons}>
                    <h3><b>Mes exercices</b></h3>
                    <div className={styles.container_exos}>
                            {exercices}
                    </div>
                </div>
                <div className={styles.added_persons}>
                    <h3><b>Exercices à ajouter</b></h3>
                    <div className={styles.container_exos}>
                            {addedExercices}
                    </div>
                </div>
           </div>
        );
    }
}

export default AddExerciceForm;