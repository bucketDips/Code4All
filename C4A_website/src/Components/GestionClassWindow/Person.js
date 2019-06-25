import React, { Component } from 'react';
import style from './style.css';

class Person extends Component {
    render() {
        var avatar = "https://avatars.dicebear.com/v2/jdenticon/" + this.props.name + ".svg"
        return (
            <div className={style.person} onClick={this.props.onClick}>
                <img alt="posts" className={style.posts} src={process.env.PUBLIC_URL + 'post.png'} />
                <img alt="avatar" className={style.avatar} src={avatar} />
                <div className={style.name}>{this.props.name}</div>
                <div className={style.email}>{this.props.email}</div>
                {
                    this.props.delete &&
                    <img alt="delete" onClick={this.props.delete} className={style.delete_button} src={process.env.PUBLIC_URL + 'cross.png'} />
                }
            </div>
        );
    }
}

export default Person;