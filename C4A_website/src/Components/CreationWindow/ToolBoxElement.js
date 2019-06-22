import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styles from './style.css';

class ToolBoxElement extends Component {
  render() {
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
                  <img src={this.props.element.image} width="20px" height="20px" />
          </div>
          {snapshot.isDragging && (
            <div style={{transform: "none !important"}}><img class="placeholderimage" src={this.props.element.image} width="20px" height="20px" /></div>
          )}
        </React.Fragment>
      )}
      </Draggable>
    );
  }
}

export default ToolBoxElement;
