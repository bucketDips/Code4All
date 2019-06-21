import React, { Component } from 'react';

import ConnectedWindowsStructure from '../ConnectedWindowsStructure/';
import CreateExerciseWindow from '../CreationWindow/';

import exercices from '../../Providers/exercices';

class ExercicesWindow extends Component {

    constructor() {
        super();
        this.state = {
            menus: [],
            content: null
        }
    }

    modifyExercice(code) {
        console.log(code);
        return null;
        return [(<CreateExerciseWindow code={code} />), "collapsed"];
    }

    createExercice() {
        return [(<CreateExerciseWindow />), "collapsed"];
    }

    presentation() {
        return [(
            <div>
                <h1>Voici l'explication des exercices</h1>
            </div>
        ), "not-collapsed"];
    }

    async componentWillMount() {
        var allExercices = await exercices.getMines("coucou");
        var myExercices = [];
        var forkedExercices = []
        for(var exercice in allExercices.data.perso) {
            myExercices.push({
                id: allExercices.data.perso[exercice].id,
                name: allExercices.data.perso[exercice].title,
                action: function(){ return this.modifyExercice.bind(this, allExercices.data.perso[exercice].id); }
            });
        }

        for(var exercice in allExercices.data.forked.fromStore) {
            forkedExercices.push({
                id: allExercices.data.forked.fromStore[exercice].id,
                authorId: allExercices.data.forked.fromStore[exercice].author_id,
                name: allExercices.data.forked.fromStore[exercice].title,
                action: this.modifyExercice
            });
        }

        var menus = [];
        menus.push({
            name: "presentation",
            icon: "book",
            action: this.presentation
        });
        menus.push({
            name: "my exercices",
            icon: "ordered-list",
            submenus: myExercices
        });
        menus.push({
            name: "forked exercices",
            icon: "cloud",
            submenus: forkedExercices
        });
        menus.push({
            name: "create exercice",
            icon: "plus",
            action: this.createExercice
        });

        this.setState({ 
            menus: menus,
            content: this.presentation()[0]
         });
    }

    render() {
        return (
            <ConnectedWindowsStructure type="exercices" menus={this.state.menus} content={this.state.content} />
        );
    }
}

export default ExercicesWindow;