import React, { Component } from 'react';

class Label extends Component {
    render() {
        return (
            <div style={{
                gridColumnStart: this.props.columnStart,
                gridRowStart: this.props.rowStart,
                gridColumnEnd: this.props.columnStart + this.props.width,
                gridRowEnd: this.props.rowStart + this.props.height,
                zIndex: 10,
                fontSize: this.props.caseSize * 0.4 * this.props.width
              }}>
              {this.props.text}
            </div>
        );
    }
}

export default Label;