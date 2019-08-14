import React, { PureComponent } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
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
  onPress?: any;
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
interface IBTextWithUnitProps {
  value: string | number;
  unit?: string;
  label?: string | number;
  valueStyle?: TextStyle;
  unitStyle?: TextStyle;
  labelStyle?: TextStyle;
  style?: ViewStyle;
}
export class IBTextWithUnit extends PureComponent<IBTextWithUnitProps, any> {
  constructor(props: IBTextWithUnitProps) {
    super(props);
  }
  render() {
    const {
      value,
      unit = '',
      label,
      labelStyle = {},
      unitStyle = {},
      valueStyle = {},
      style
    } = this.props;
    return (
      <View style={style}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IBText
            size={28}
            center
            color={'#FF720D'}
            lineHeight={44}
            {...valueStyle}
          >
            {value}
          </IBText>
          <IBText
            size={14}
            center
            color={'#FF720D'}
            lineHeight={18}
            {...unitStyle}
          >
            {unit}
          </IBText>
        </View>
        {!!label && (
          <IBText
            size={13}
            center
            color={'#1F2633'}
            lineHeight={15}
            {...labelStyle}
          >
            {label}
          </IBText>
        )}
      </View>
    );
  }
}
