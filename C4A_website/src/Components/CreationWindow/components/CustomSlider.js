import React, { Component } from 'react';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const Handle = Slider.Handle;

class CustomSlider extends Component {

  handle (props){
    const { value, dragging, index, ...restProps } = props;

    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  changeValue(e) {
    this.props.changeSize(e);
  }

  render() {
    return (
        <div className={this.props.className}>
            <Slider min={this.props.min} max={this.props.max} defaultValue={this.props.default} handle={this.handle.bind(this)} onChange={this.changeValue.bind(this)} />
        </div>
    );
  }
}

export default CustomSlider;
