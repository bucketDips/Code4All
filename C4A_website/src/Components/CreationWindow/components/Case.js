import React, { Component } from 'react';

class Case extends Component {

    constructor() {
        super();
        this.state = {
            style: null
        }
    }

    getStyle() {
        var style = {
            height: this.props.size.height + "px",
            width: this.props.size.width + "px",
            backgroundColor: 'red',
            display: 'inline-block',
            marginLeft: this.props.size.defaultSpace
        };

        return style;
    }

    componentWillMount() {
        if(this.props.size) {
            this.setState({
                style: this.getStyle()
            })
        }
    }

    onHover() {
        var style = this.getStyle();
        style.backgroundColor = 'brown';
        this.setState({
            style: style
        })
    }

    onExit() {
        this.setState({
            style: this.getStyle()
        })
    }

    render() {
        if(this.props.size) {
            return (
                <li style={this.state.style} className="case" onMouseOver={this.onHover.bind(this)} onMouseLeave={this.onExit.bind(this)}>
                </li>
            );
        }
    }
}

export default Case;