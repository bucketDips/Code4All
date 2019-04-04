import React, { Component } from 'react';
import TestItem from './TestItem';

class Test extends Component {
  render() {
    
    let compoItems;
    if(this.props.projects) {
        compoItems = this.props.projects.map(project => {
            return (<TestItem key={project.title} project={project} />)
        });
    }

    return (
        <div className="Test">
            {compoItems}
        </div>
    );
  }
}

export default Test;
