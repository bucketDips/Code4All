import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ToolBoxElement from './ToolBoxElement';

import styles from '../css/ToolBox.css'

class ToolBox extends Component {

  render() {
    let options;
    if(this.props.options) {
      options = this.props.options.map((option, index) => {
        return (<ToolBoxElement key={option.title} element={option} index={index} />)
      })
    }

    return (
        <div className={styles.toolbox}>
            <h3 className="title">Ici la toolbox</h3>
            <div className="content">
              <Droppable droppableId={100} isDropDisabled={true} isDragDisabled={true}>
              {provided => (
                <ul 
                ref={provided.innerRef}
                {...provided.droppableProps} 
                id="toolbox_ul">
                    {options}
                    {provided.placeholder}
                </ul>
              )}
              </Droppable>
            </div>
        </div>
    );
  }
}

export default ToolBox;
