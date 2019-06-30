import React, { Component } from 'react';

import ConnectedWindowsStructure from '../ConnectedWindowsStructure/';
import CreateExerciseWindow from '../CreationWindow/';

import exercices from '../../Providers/exercices';
import { Block, Npc, Pc, Label, Func, Grid } from '../CreationWindow/CodeClasses';
import RealisationExerciseWindow from '../RealisationWindow';

class ExercicesWindow extends Component {

    constructor() {
        super();
        this.state = {
            menus: [],
            content: null
        }
    }

    modifyExercice(code) {
        return exercices.getMyExercice(code.id, (exos) => {
            return [(<CreateExerciseWindow code={exos.data.exercice.code} id={exos.data.exercice.id} details={exos.data.exercice.description} name={exos.data.exercice.title} store={exos.data.exercice.isPublic} />), "collapsed"];
        });
    }

    
    launchModalWindow(bddResponse) {
        var bundle = bddResponse.data.exercice;
        bundle.gridObject = this.copy(bundle.rows, bundle.columns, bundle.patternId, bundle.blocks, bundle.npcs, bundle.pcs, bundle.labels, bundle.functions, bundle.tests);

        this.setState({
            launchBundle: bundle
        }, () => {
            this.setState({visible: true});
        });
    }

    async launchExercice(code) {
        var bundle = await exercices.getMyExercice(code.id);
        bundle = bundle.data.exercice;
        bundle.gridObject = this.copy(bundle.rows, bundle.columns, bundle.patternId, bundle.blocks, bundle.npcs, bundle.pcs, bundle.labels, bundle.functions, bundle.tests);
        return new Promise((resolve, reject) => { resolve([(<RealisationExerciseWindow bundle={bundle} />), "collapsed"]); });
    }

    copy(lines, columns, patternId, blocks, npcs, pcs, labels, functions, tests) {
        var grid = new Grid(lines, columns, patternId);
        for(var i = 0; i < blocks.length; i++) {
            grid.addBlock(new Block(blocks[i].id, blocks[i].row, blocks[i].column, blocks[i].width, blocks[i].height, blocks[i].patternId));
        }
        for(var i = 0; i < npcs.length; i++) {
            grid.addNpc(new Npc(npcs[i].id, npcs[i].row, npcs[i].column, npcs[i].width, npcs[i].height, npcs[i].patternId));
        }
        for(var i = 0; i < pcs.length; i++) {
            grid.addPc(new Pc(pcs[i].id, pcs[i].row, pcs[i].column, pcs[i].width, pcs[i].height, pcs[i].patternId));
        }
        for(var i = 0; i < labels.length; i++) {
            grid.addLabel(new Label(labels[i].id, labels[i].row, labels[i].column, labels[i].width, labels[i].height, labels[i].text));
        }
        for(var i = 0; i < functions.length; i++) {
            grid.addFunction(new Func(functions[i].name, functions[i].code, functions[i].description));
        }
        for(var i = 0; i < tests.length; i++) {
            grid.addTest(new Func(tests[i].name, tests[i].code, tests[i].description));
        }
        return grid;
    }

    createExercice() {
        return new Promise((resolve, reject) => { resolve([(<CreateExerciseWindow />), "collapsed"]); });
    }

    presentation() {
        return new Promise((resolve, reject) => { resolve([(
            <div>
                <h1>Voici l'explication des exercices</h1>
            </div>
        ), "not-collapsed"]); });
    }

    async componentWillMount() {
        var allExercices = await exercices.getMines("coucou");
        var myExercices = [];
        var forkedExercices = []
        for(var exercice in allExercices.data.perso) {
            myExercices.push({
                id: allExercices.data.perso[exercice].id,
                name: allExercices.data.perso[exercice].title,
                code: allExercices.data.perso[exercice].code,
                description: allExercices.data.perso[exercice].description,
                action: this.modifyExercice
            });
        }

        for(exercice in allExercices.data.forked.fromStore) {
            forkedExercices.push({
                id: allExercices.data.forked.fromStore[exercice].id,
                authorId: allExercices.data.forked.fromStore[exercice].author_id,
                name: allExercices.data.forked.fromStore[exercice].title,
                action: this.launchExercice.bind(this)
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

        this.presentation().then(result => {
            this.setState({ 
                menus: menus,
                content: result[0]
             });
        });
    }

    render() {
        return (
            <ConnectedWindowsStructure type="exercices" menus={this.state.menus} content={this.state.content} />
        );
    }
}

export default ExercicesWindow;