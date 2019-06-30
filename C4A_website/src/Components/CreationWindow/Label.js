import React, { Component } from 'react';
import styles from './style.css';

/**
 * class represents a label in the grid
 */
class Label extends Component {

    /**
     * action for the click on the label
     */
    askEditLabel() {
        let parameters = {
            type: "LABEL",
            id: this.props.id,
            columnStart: this.props.columnStart,
            rowStart: this.props.rowStart,
            width: this.props.width,
            height: this.props.height,
            text: this.props.text
        }
        this.props.changeParametersWindow(parameters);
    }

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
                fontSize: this.props.caseSize * 0.4 * this.props.width
              }}
              className={styles.label} 
              onMouseDown={this.askEditLabel.bind(this)}
              >
              {this.props.text}
            </div>
        );
    }
}

export default Label;