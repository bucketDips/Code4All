import React, { Component } from 'react';
// eslint-disable-next-line
import styles from './style.css';
import { Modal, Collapse, Progress } from 'antd';

const Panel = Collapse.Panel;

/**
* modal containing the exercices and tests of a student
*/
class ShowStudentExercices extends Component {

    /**
     * get the good bar for the test result
     */
    genExtra(exo){
        var percent = exo.tests.passed * 100 / exo.tests.total;
        if(percent === 100) {
            return (<Progress percent={100} size="small" />);
        }
        else {
            return (<Progress percent={percent} size="small" status="exception"  />);
        }
    }

    /**
    * render method 
    */
    render() {
        var exercices = this.props.exercices.map((exo, index) => {
            var title = exo.exercice_title[0] === "'" ? exo.exercice_title.slice(1).slice(0, -1) : exo.exercice_title;
            return (
            <Panel header={title} key={index} extra={this.genExtra(exo)}>
                <b>Tests réussis : </b> {exo.tests.passedTests.join(", ")} <br></br>
                <b>Tests échoués : </b> {exo.tests.notPassedTests.join()}
            </Panel>)
        });
        const { visible, onCancel } = this.props;
        return (
        <Modal
            destroyOnClose={true}
            visible={visible}
            wrapClassName="show_student_exercices"
            title="Exercices auxquels l'élève a répondu"
            footer={null}
            onCancel={onCancel}
        >
            <Collapse>
                {exercices}
            </Collapse>
        </Modal>
        );
    }
}

export default ShowStudentExercices;