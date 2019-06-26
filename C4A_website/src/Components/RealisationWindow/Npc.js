import React, { Component } from 'react';

class Npc extends Component {
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
              }}>
            </div>
        );
    }
}

export default Npc;