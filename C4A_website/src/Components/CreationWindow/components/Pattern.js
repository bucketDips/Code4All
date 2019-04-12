import React, { Component } from 'react';
import styles from '../css/Patterns.css'

class Pattern extends Component {

    handleDelete(e) {
        this.props.deletePattern(this.props.id);
        e.preventDefault();
    }

    render() {
        return (
            <div className={styles.pattern}>
                <div className="pattern-content">
                    <img alt="pattern" className="pattern-image" src={process.env.PUBLIC_URL + "/patterns/" + this.props.image}></img>
                    <form className="form-delete-grid" onSubmit={this.handleDelete.bind(this)}>
                        <input type="image" className="pattern-delete" alt="delete button" src={process.env.PUBLIC_URL + '/delete.png'} />
                    </form>
                </div>
            </div>
        );
    }
}

export default Pattern;
