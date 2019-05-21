import React, { Component } from 'react';
import styles from './style.css';

class Npc extends Component {
    askEditNpc() {
        let parameters = {
            type: "NPC",
            id: this.props.id,
            columnStart: this.props.columnStart,
            rowStart: this.props.rowStart,
            width: this.props.width,
            height: this.props.height,
            background: this.props.background,
            backgroundId: this.props.backgroundId
        }

        this.props.changeParametersWindow(parameters);
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
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                cursor: "pointer"
              }}
              className={styles.npc} 
              onMouseDown={this.askEditNpc.bind(this)}
              >
            </div>
        );
    }
}

export default Npc;