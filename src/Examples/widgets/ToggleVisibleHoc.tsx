/**
 * @author shaorencen@yodinfo.com
 * @flow
 * @description 旋转动画 高阶组件
 */
import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';

interface HocCollapsibleToggleProp {
  visible?: boolean;
  render?: Function;
}
export class ToggleVisibleHoc extends Component<HocCollapsibleToggleProp, any> {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      visibleValue: new Animated.Value(props.visible ? 0 : 1)
    };
  }
  componentWillReceiveProps(nextProp) {
    if (this.props.visible !== nextProp.visible) {
      this.toggle();
    }
  }
  getRotateProp = () => {
    let rotateProp = this.state.visibleValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg']
    });
    return rotateProp;
  };
  toggle = () => {
    let willDo = !this.state.visible;
    this.setState({ visible: willDo });
    Animated.timing(
      // Animate value over time
      this.state.visibleValue, // The value to drive
      {
        toValue: willDo ? 0 : 1, // Animate to final value of 1
        duration: 180, //从0到1的时间
        easing: Easing.ease //线性变化，匀速旋转
      }
    ).start();
  };
  render() {
    const { render, children } = this.props;
    let { visible, visibleValue } = this.state;
    const toggleProps = {
      visible: visible,
      toggle: this.toggle,
      visibleValue: visibleValue
    };
    if (render) {
      return render(toggleProps);
    }
    return typeof children === 'function'
      ? children(toggleProps)
      : React.isValidElement(children)
      ? children
      : null;
  }
}
