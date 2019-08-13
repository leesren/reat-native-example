import React, { PureComponent } from 'react';
import { Text, TextStyle } from 'react-native';
type IBTextProps = {
  type?: string;
  left?: any;
  right?: any;
  center?: any;
  color?: string;
  size?: string | number;
  bold?: boolean;
  style?: TextStyle;
  numberOfLines?: number;
  ellipsizeMode?: any; //enum('head', 'middle', 'tail', 'clip')
  lineHeight?: number;
};
export class IBText extends PureComponent<IBTextProps, any> {
  constructor(props: IBTextProps) {
    super(props);
  }
  render() {
    const {
      style = {},
      size = 13,
      color = '#222',
      left,
      right,
      center,
      lineHeight,
      bold
    } = this.props;
    let align = 'left';
    if (left) {
      align = 'left';
    } else if (right) {
      align = 'right';
    }
    if (center) {
      align = 'center';
    }
    return (
      <Text
        {...this.props}
        style={[
          { fontSize: size, textAlign: align, color: color } as TextStyle,
          lineHeight && ({ lineHeight: lineHeight } as TextStyle),
          bold && ({ fontWeight: 'bold' } as TextStyle),
          style
        ]}
      >
        {this.props.children}
      </Text>
    );
  }
}
