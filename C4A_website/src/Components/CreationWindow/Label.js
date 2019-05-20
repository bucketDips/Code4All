import React, { Component } from 'react';
import styles from './style.css';

class Label extends Component {
    askEditLabel() {
    /*    let parameters = {
            type: "BLOCK",
            id: this.props.id,
            columnStart: this.props.columnStart,
            rowStart: this.props.rowStart,
            width: this.props.width,
            height: this.props.height,
            background: this.props.background,
            backgroundId: this.props.backgroundId
        }

        this.props.changeParametersWindow(parameters);*/
    }

    render() {
        return (
            <div style={{
                gridColumnStart: this.props.columnStart,
                gridRowStart: this.props.rowStart,
                gridColumnEnd: this.props.columnStart + this.props.width,
                gridRowEnd: this.props.rowStart + this.props.height,
                zIndex: 10,
                fontSize: this.props.caseSize * 0.4
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