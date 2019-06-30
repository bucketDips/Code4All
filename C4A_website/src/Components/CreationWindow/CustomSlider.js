import React, { Component } from 'react';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const Handle = Slider.Handle;

/**
 * class represent the customslider that will be
 * used in creation window (grid and code modules)
 */
class CustomSlider extends Component {

  /**
   * action of changing the value of the slider
   */
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

  /**
   * action called when changing the value of the slider
   */
  changeValue(e) {
    this.props.changeSize(e);
  }

  /**
   * render method
   */
  render() {
    return (
        <div className={this.props.className}>
            <Slider min={this.props.min} max={this.props.max} value={this.props.default} handle={this.handle.bind(this)} onChange={this.changeValue.bind(this)} />
        </div>
    );
  }
}

export default CustomSlider;
