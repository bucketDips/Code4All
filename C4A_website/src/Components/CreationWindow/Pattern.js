import React, { Component } from 'react';
import styles from './style.css';
import consts from '../../Providers/consts'

/**
 * pattern in the patterns module of
 * the creationwindow
 */
class Pattern extends Component {

    /**
     * action when deleting a pattern
     */ 
    handleDelete(e) {
        this.props.deletePattern(this.props.id);
        e.preventDefault();
    }

    /**
     * render method
     */
    render() {
        return (
            <div className={styles.pattern} onClick={this.handleDelete.bind(this)}>
                <div className="pattern-content">
                    <div className="pattern-img-container">
                        <img alt="pattern" className="pattern-image" src={consts.url() + this.props.name}></img>
                        <div className="middle">
                            <b>{this.props.id}</b>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pattern;
