import React, { Component } from 'react';
import styles from '../css/Block.css'

class Block extends Component {

    askEditBlock(e) {
        let parameters = {
            type: "BLOCK",
            columnStart: this.props.columnStart,
            rowStart: this.props.rowStart,
            width: this.props.width,
            height: this.props.height
        }
        this.props.changeParametersWindow(parameters);
        e.preventDefault();
    }

    render() {
        return (
            <div style={{
                gridColumnStart: this.props.columnStart,
                gridRowStart: this.props.rowStart,
                gridColumnEnd: this.props.columnStart + this.props.width,
                gridRowEnd: this.props.rowStart + this.props.height,
                zIndex: 10,
                backgroundImage: `url(${this.props.background})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
              }}
              className={styles.block} onMouseDownCapture={e => console.log(e)} onClick={this.askEditBlock.bind(this)}>
            </div>
        );
    }
}

export default Block;