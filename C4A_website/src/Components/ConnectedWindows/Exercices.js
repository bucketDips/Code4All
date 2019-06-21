import React, { Component } from 'react';

import ConnectedWindowsStructure from '../ConnectedWindowsStructure/';
import CreateExerciseWindow from '../CreationWindow/';

import exercices from '../../Providers/exercices';

class ExercicesWindow extends Component {

    constructor() {
        super();
        this.state = {
            menus: [],
            content: "coucou"
        }
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

    componentWillMount() {
        var allExercices = exercices.getMines("coucou");

        var menus = [];
        menus.push({
            name: "presentation",
            icon: "book",
            action: this.presentation
        });
        menus.push({
            name: "my exercices",
            icon: "ordered-list",
            submenus: allExercices.myExercices
        });
        menus.push({
            name: "forked exercices",
            icon: "cloud",
            submenus: allExercices.forkedExercices
        });
        menus.push({
            name: "create exercice",
            icon: "plus",
            action: this.createExercice
        });

        this.setState({ menus: menus });
    }

    render() {
        return (
            <ConnectedWindowsStructure type="exercices" menus={this.state.menus} content={this.state.content} />
        );
    }
}

export default ExercicesWindow;