import React, { Component } from 'react';
import style from './style.css';
import exercices from '../../Providers/exercices';
import AddExerciceWindowWrapper from './AddExerciceWindowWrapper';
import RealisationExerciseWindow from '../RealisationWindow';
import Exercice from './Exercice';
import { Modal, Form } from 'antd';
import { Grid, Npc, Pc, Label, Block, Func } from '../CreationWindow/CodeClasses';

const confirm = Modal.confirm;

/**
* modal of launching an exercice for a student in the exercices details
*/
const ExerciceLaunchModal = Form.create({ name: 'launch_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
      render() {
        const { visible, onCancel } = this.props;
        return (
          <Modal
            wrapClassName="launch_modal"
            visible={visible}
            footer={null}
            onCancel={onCancel}
            title="Lancement exercice"
            destroyOnClose={true}
          >
            <RealisationExerciseWindow bundle={this.props.launchBundle} />
          </Modal>
        );
      }
    },
  );

/**
* module containing all of the exercices of a class
*/
class ExercicesDetails extends Component {
    constructor() {
        super();
        this.state = {
            exercices: [],
            visible: false,
            launchBundle: null
        }
    }

    /**
    * show the suppression modal for an exercice in the class
    */
    showConfirm(classId, exerciceId, cb) {
        confirm({
            title: 'Etes-vous sûr de vouloir supprimer cet exercice de la classe ?',
            onOk() {
                exercices.deleteExerciceFromClass(classId, exerciceId, cb);
            },
            onCancel() {
            },
        });
    }

    /**
    * reload the exercices in class details
    */
    refill() {
        this.props.refill();
    }

    /**
    * show the suppression modal
    */
    deleteExerciceFromClass(id) {
        this.showConfirm(this.props.classRoom.id, id, this.refill.bind(this));
    }

    /**
    * generate a new grid object from all the grid informations
    * from the database
    */
    copy(lines, columns, patternId, blocks, npcs, pcs, labels, functions, tests) {
        var grid = new Grid(lines, columns, patternId);
        for(var i = 0; i < blocks.length; i++) {
            grid.addBlock(new Block(blocks[i].id, blocks[i].row, blocks[i].column, blocks[i].width, blocks[i].height, blocks[i].patternId));
        }
        for(i = 0; i < npcs.length; i++) {
            grid.addNpc(new Npc(npcs[i].id, npcs[i].row, npcs[i].column, npcs[i].width, npcs[i].height, npcs[i].patternId));
        }
        for(i = 0; i < pcs.length; i++) {
            grid.addPc(new Pc(pcs[i].id, pcs[i].row, pcs[i].column, pcs[i].width, pcs[i].height, pcs[i].patternId));
        }
        for(i = 0; i < labels.length; i++) {
            grid.addLabel(new Label(labels[i].id, labels[i].row, labels[i].column, labels[i].width, labels[i].height, labels[i].text));
        }
        for(i = 0; i < functions.length; i++) {
            grid.addFunction(new Func(functions[i].name, functions[i].code, functions[i].description));
        }
        for(i = 0; i < tests.length; i++) {
            grid.addTest(new Func(tests[i].name, tests[i].code, tests[i].description));
        }
        return grid;
    }

    /**
    * action when clicking on the play button
    */
    launchModalWindow(bddResponse) {
        var bundle = bddResponse.data.exercice;
        bundle.gridObject = this.copy(bundle.rows, bundle.columns, bundle.patternId, bundle.blocks, bundle.npcs, bundle.pcs, bundle.labels, bundle.functions, bundle.tests);

        this.setState({
            launchBundle: bundle
        }, () => {
            this.setState({visible: true});
        });
    }

    /**
    * method called when clicking on play button for an exercice
    */
    launchExercice(id) {
        exercices.getMyExercice(id, this.launchModalWindow.bind(this));
    }

    /**
    * method called when clicking on cancel of cross
    */
    handleCancelLaunch = () => {
        this.setState({ visible: false });
    };

    /**
    * render method
    */
    render() {
        var exercices = this.props.exos.map(exercice => {
            return (<Exercice 
                key={exercice.exercice_id}
                infos={exercice} 
                launch={this.launchExercice.bind(this, exercice.exercice_id)} 
                delete={this.deleteExerciceFromClass.bind(this, exercice.exercice_id)}
                teacher={this.props.teacher}
            />);
        });

        return (
            <div className={style.exercices_details}>
                <h1>Détail des exercices
                    {this.props.teacher && 
                        <AddExerciceWindowWrapper refill={this.props.refill} exos={this.props.exos} classRoom={this.props.classRoom.id} />}
                </h1>
                <div className={style.exercice_detail}>
                    {exercices}
                </div>
                <div className={style.empty}></div>
                <ExerciceLaunchModal
                visible={this.state.visible}
                onCancel={this.handleCancelLaunch}
                launchBundle={this.state.launchBundle}
                />
            </div>
        );
    }
}

export default ExercicesDetails;