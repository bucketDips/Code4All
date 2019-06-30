import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ToolBoxElement from './ToolBoxElement';

/**
 * toolbox contained in the module grid of the window,
 * float left bottom
 */
class CustomToolBox extends Component {

  /**
   * render method
   */
  render() {
    let options;
    if(this.props.elements) {
      options = this.props.elements.map((option, index) => {
        return (<ToolBoxElement key={option.title} element={option} index={index} />)
      })
    }

    return (
        <div className={this.props.className}>
            <div className="toolbox-content">
              <Droppable droppableId={100} isDropDisabled={true} isDragDisabled={true}>
              {provided => (
                <div 
                ref={provided.innerRef}
                {...provided.droppableProps} 
                id="toolbox_ul">
                    {options}
                </div>
              )}
              </Droppable>
            </div>
        </div>
    );
  }
}

export default CustomToolBox;
