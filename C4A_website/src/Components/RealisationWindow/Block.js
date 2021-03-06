import React, { Component } from 'react';

/**
 * class represents a block in the grid
 */
class Block extends Component {

     /**
     * render method
     */
    render() {
        return (
            <div style={{
                gridColumnStart: this.props.columnStart,
                gridRowStart: this.props.rowStart,
                gridColumnEnd: this.props.columnStart + this.props.width,
                gridRowEnd: this.props.rowStart + this.props.height,
                zIndex: 10,
                backgroundImage: `url(${this.props.background})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                cursor: "pointer"
              }}>
            </div>
        );
    }
}

export default Block;