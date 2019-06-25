import React, { Component } from 'react';
import style from './style.css';

class Person extends Component {
    render() {
        var avatar = "https://avatars.dicebear.com/v2/jdenticon/" + this.props.name + ".svg"
        return (
            <div className={style.person}>
                <img className={style.posts} src={process.env.PUBLIC_URL + 'post.png'} />
                <img className={style.avatar} src={avatar} />
                <div className={style.name}>{this.props.name}</div>
            </div>
        );
    }
}

export default Person;