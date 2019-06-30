import React, { Component } from 'react';
import GestionStoreWindow from '../GestionStoreWindow';
import ConnectedWindowsStructure from '../ConnectedWindowsStructure/';

/**
 * The window that build the menus
 * and the associated actions for
 * the module store
 */
class StoreWindow extends Component {

    /**
     * constructor
     */
    constructor() {
        super();
        this.state = {
            menus: [],
            content: null,
        }
    }

    /**
     * action for the click on presentation
     */
    presentation() {
        return new Promise((resolve, reject) => { resolve([(
            <div>
                <h1>Voici l'explication du store</h1>
            </div>
        ), "not-collapsed"]); });
    }

    /**
     * action for the click on see all
     */
    seeAll() {
        return new Promise((resolve, reject) => { resolve([(
            <GestionStoreWindow type={"all"} />
        ), "collapsed"]); });
    }

    /**
     * build the menus with the datas
     * of the exercices from the database
     */
    async componentWillMount() {
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
             });
        });
    }

    /**
     * render method
     */
    render() {
        return (
            <div>
            <ConnectedWindowsStructure type="classes" menus={this.state.menus} content={this.state.content} />
            </div>
        );
    }
}

export default StoreWindow;