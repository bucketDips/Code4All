import React, { Component } from 'react';

/**
 * class represents a case in the grid
 */
class Case extends Component {

    /**
     * constructor
     */
    constructor() {
        super();
        this.state = {
            style: null
        }
    }

    /**
     * action for mouseover, mouseleaver and mouseclick,
     * change the color of the case
     */
    setStyle(color) {
        if(this.props.size) {
            var style = {
                backgroundColor: color,
                gridColumn: this.props.size.column + 1,
                gridRow: this.props.size.line + 1,
                zIndex: 4,
                opacity: "0.33"
            };
            this.setState({
                style: style
            })
        }
    }

    /**
     * init the default color of the cases
     */
    componentWillMount() {
        this.setStyle("darkgrey");
    }

    /**
     * render method
     */
    render() {
        return (
            <div 
                style={this.state.style} className="case">
            </div>
        );
    }
}

export default Case;