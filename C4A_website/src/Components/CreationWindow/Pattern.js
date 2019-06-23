import React, { Component } from 'react';
import styles from './style.css';
import consts from '../../Providers/consts'

class Pattern extends Component {

    handleDelete(e) {
        this.props.deletePattern(this.props.id);
        e.preventDefault();
    }

    render() {
        console.log(this.props.url);
        return (
            <div className={styles.pattern}>
                <div className="pattern-content">
                    <span>{this.props.id}</span>
                    <img alt="pattern" className="pattern-image" src={consts.url() + this.props.name}></img>
                    <form className="form-delete-grid" onSubmit={this.handleDelete.bind(this)}>
                        <input type="image" className="pattern-delete" alt="delete button" src={process.env.PUBLIC_URL + '/delete.png'} />
                    </form>
                </div>
            </div>
        );
    }
}

export default Pattern;
