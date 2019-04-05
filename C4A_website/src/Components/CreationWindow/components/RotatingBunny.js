import { Sprite } from '@inlet/react-pixi'
import React, { Component } from 'react';

class RotatingBunny extends Component {
  state = { rotation: 0 }

  componentDidMount() {
    this.props.app.ticker.add(this.tick)
  }

  componentWillUnmount() {
    this.props.app.ticker.remove(this.tick)
  }

  tick = delta => {
    this.setState(({ rotation }) => ({
      rotation: rotation + 0.05 * delta,
    }))
  }

  render() {
    return <Sprite width={150} height={150} x={500} y={300} image={process.env.PUBLIC_URL + '/bloc.png'} rotation={this.state.rotation} />
  }
}

export default RotatingBunny;