import React, { Component } from 'react';
import { Graphics } from '@inlet/react-pixi'

class Case extends Component {
  render() {
    let color=0xFF3300;
    let hovercolor = 0xCC2900;
    if(this.props.size) {
        return <Graphics
        // https://stackoverflow.com/questions/40469504/best-way-to-highlight-polygon-on-hover-event-with-custom-color-in-pixi-js
            interactive={true}
            draw={g => {
                g.beginFill(color);
                g.drawRect(this.props.size.x, this.props.size.y, this.props.size.width, this.props.size.height);
                g.endFill();
                g.mouseover = function (){
                    g.alpha = 0.5;
                };
                g.mouseout = function (){
                    g.alpha = 1;
                }
            }}
        />
    }
  }
}

export default Case;