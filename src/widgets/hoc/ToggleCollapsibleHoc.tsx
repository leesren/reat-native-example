/**
 * @author shaorencen@yodinfo.com
 * @flow
 * @description 旋转动画 高阶组件
 */
import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';

interface HocCollapsibleToggleProp {
  collapsed?: boolean;
  children: (props: any) => any;
}
type RenderProps = {
  rotateValue: Animated.Value;
  collapsed: boolean;
  baseRotate: any;
  toggle: Function;
};
type State = {
  rotateValue: Animated.Value;
  collapsed: boolean;
};
export class ToggleCollapsibleHoc extends Component<
  HocCollapsibleToggleProp,
  State
> {
  static defaultProps = {
    collapsed: true
  };
  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.collapsed,
      rotateValue: new Animated.Value(props.collapsed ? 0 : 1)
    };
  }
  baseRotate = () => {
    let rotateProp = this.state.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg']
    });
    return rotateProp;
  };
  toggle = () => {
    let willDo = !this.state.collapsed;
    this.setState({ collapsed: willDo });
    Animated.timing(
      // Animate value over time
      this.state.rotateValue, // The value to drive
      {
        toValue: willDo ? 0 : 1, // Animate to final value of 1
        duration: 180, //从0到1的时间
        easing: Easing.out(Easing.linear) //线性变化，匀速旋转
      }
    ).start();
  };
  render() {
    const { children } = this.props;
    let { collapsed, rotateValue } = this.state;
    const toggleProps: RenderProps = {
      collapsed: collapsed,
      toggle: this.toggle,
      rotateValue: rotateValue,
      baseRotate: this.baseRotate()
    };
    // if (render) {
    //   return render(toggleProps);
    // }
    return typeof children === 'function'
      ? children(toggleProps)
      : React.isValidElement(children)
      ? children
      : null;
  }
}
