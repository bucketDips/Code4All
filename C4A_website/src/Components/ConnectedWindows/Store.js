import React, { Component } from 'react';

import exercices from '../../Providers/exercices';

import GestionStoreWindow from '../GestionStoreWindow';

import ConnectedWindowsStructure from '../ConnectedWindowsStructure/';

class StoreWindow extends Component {

    constructor() {
        super();
        this.state = {
            menus: [],
            content: null,
            exercices: []
        }
    }

    presentation() {
        return new Promise((resolve, reject) => { resolve([(
            <div>
                <h1>Voici l'explication du store</h1>
            </div>
        ), "not-collapsed"]); });
    }

    seeAll() {
        return new Promise((resolve, reject) => { resolve([(
            <GestionStoreWindow exercices={this.state.exercices} />
        ), "collapsed"]); });
    }

    async componentWillMount() {
        var allExercices = await exercices.getFromStore();

        var menus = [];
        menus.push({
            name: "presentation",
            icon: "book",
            action: this.presentation
        });
        menus.push({
            name: "see all",
            icon: "menu",
            action: this.seeAll.bind(this)
        });

        this.presentation().then(result => {
            this.setState({ 
                menus: menus,
                content: result[0],
                exercices: allExercices
             });
        });
    }

    render() {
        return (
            <div>
            <ConnectedWindowsStructure type="classes" menus={this.state.menus} content={this.state.content} />
            </div>
        );
    }
}

export default StoreWindow;