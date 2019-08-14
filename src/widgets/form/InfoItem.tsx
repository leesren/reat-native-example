import React, { PureComponent } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { IBText, Line } from '../base';
type Props = {
  showLabel?: boolean;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
  bgStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  center?: boolean;
  label: string;
  value?: any;
  fontSize?: number;
  textAlign?: 'right' | 'left';
};
type State = {};

export class InfoItem extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    let {
      labelStyle,
      center,
      label,
      value,
      containerStyle,
      valueStyle,
      fontSize = 16,
      textAlign = 'right'
    } = this.props;
    return (
      <View style={{}}>
        <View
          style={[
            {
              flexDirection: 'row',
              paddingVertical: 8
            },
            center ? { alignItems: 'center' } : null,
            containerStyle
          ]}
        >
          <View style={{ marginRight: 10 }}>
            <IBText
              size={fontSize}
              color={'#9B9DA5'}
              lineHeight={26}
              style={labelStyle}
            >
              {label}
            </IBText>
          </View>
          <View style={{ flex: 1 }}>
            <IBText
              size={fontSize}
              color={'#303238'}
              lineHeight={26}
              style={[{ textAlign: textAlign }, valueStyle] as TextStyle}
            >
              {value}
            </IBText>
          </View>
        </View>
        <Line />
      </View>
    );
  }
}
