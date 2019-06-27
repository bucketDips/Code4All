import React, { Component } from 'react';

import style from './style.css';

import { Collapse } from 'antd';

const Panel = Collapse.Panel;

class TestResults extends Component {
    render() {
        return (
            <Collapse>
                <Panel header="This is panel header 1" key="1">
                <p>"pipou"</p>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                <p>"pipou"</p>
                </Panel>
                <Panel header="This is panel header 3" key="3">
                <p>"pipou"</p>
                </Panel>
            </Collapse>
        );
    }
}

export default TestResults;