import React, { Component } from 'react';

import ConnectedWindowsStructure from '../ConnectedWindowsStructure/';
import CreateExerciseWindow from '../CreationWindow/';

import classes from '../../Providers/classes';

class ClassesWindow extends Component {

    constructor() {
        super();
        this.state = {
            menus: [],
            content: null
        }
    }

    presentation() {
        return new Promise((resolve, reject) => { resolve([(
            <div>
                <h1>Voici l'explication des classes</h1>
            </div>
        ), "not-collapsed"]); });
    }

    clickOnClass() {
        return new Promise((resolve, reject) => { resolve([(
            <div>
                <h1>Voici l'explication des classes</h1>
            </div>
        ), "not-collapsed"]); });
    }

    createClass() {
        return new Promise((resolve, reject) => { resolve([(
            <div>
                <h1>Voici l'explication des classes</h1>
            </div>
        ), "not-collapsed"]); });
    }

    async componentWillMount() {
        var allClasses = await classes.getMines();

        var student = JSON.parse(JSON.stringify(allClasses.student));
        var professor = JSON.parse(JSON.stringify(allClasses.professor));

        student.map((c) => {
            c.action = this.clickOnClass
        });

        professor.map((c) => {
            c.action = this.clickOnClass
        });

        var menus = [];
        menus.push({
            name: "presentation",
            icon: "book",
            action: this.presentation
        });
        menus.push({
            name: "as student",
            icon: "user",
            submenus: student
        });
        menus.push({
            name: "as professor",
            icon: "team",
            submenus: professor
        });
        menus.push({
            name: "create class",
            icon: "plus",
            action: this.createClass
        });

        this.presentation().then(result => {
            this.setState({ 
                menus: menus,
                content: result[0]
             });
        });
    }

    render() {
        return (
            <ConnectedWindowsStructure type="classes" menus={this.state.menus} content={this.state.content} />
        );
    }
}

export default ClassesWindow;