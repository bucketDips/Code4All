import React, { Component } from 'react';

import style from './style.css';

import { Collapse, Spin, Icon } from 'antd';

const Panel = Collapse.Panel;

class TestResults extends Component {
    genExtra(load, result){
        if(load) {
            return (<Spin size="small" />)
        }
        else {
            if(result) {
                if(result[0] === true) {
                    return (<Icon type="smile" theme="twoTone" twoToneColor="#00e310" />)
                }
                else {
                    return (<Icon type="frown" theme="twoTone" twoToneColor="#fa0000" />)
                }
            }
            return (<div></div>)
        }
    }

    render() {
        console.log(this.props.tests);
        var tests = this.props.tests.map((test, index) => {
            return (
            <Panel header={test.name} key={index} extra={this.genExtra(this.props.load, test.result)}>
                <b>Description du test : </b> {test.description} 
                {test.result && 
                    <div><b>Résultat du test : </b>  {test.result[1]}</div>
                }
            </Panel>)
        });

        return (
            <Collapse>
                {tests}
            </Collapse>
        );
    }
}

export default TestResults;