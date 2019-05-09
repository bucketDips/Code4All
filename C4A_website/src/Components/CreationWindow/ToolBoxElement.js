import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styles from './style.css';

class ToolBoxElement extends Component {
  render() {
    console.log(this.props.index)
    return (
      <Draggable draggableId={this.props.element.title} index={this.props.index}>
      {(provided, snapshot) => (
        <React.Fragment>
          <div 
          className={styles.toolboxelement}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          >
                  <div>{this.props.element.title}</div>
          </div>
          {snapshot.isDragging && (
            <div style={{transform: "none !important"}}>{this.props.element.title}</div>
          )}
        </React.Fragment>
      )}
      </Draggable>
    );
  }
}

export default ToolBoxElement;
