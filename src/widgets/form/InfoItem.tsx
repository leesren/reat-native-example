import React, { PureComponent } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { IBText, Line } from '../base';
type Props = {
  showLabel?: boolean;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
  bgStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  ValueComponent?: React.ReactNode;
  center?: boolean;
  label: string;
  value?: any;
  fontSize?: number;
  lineHeight?: number;
  textAlign?: 'right' | 'left';
  direction?: 'row' | 'column';
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
      textAlign = 'right',
      direction = 'row',
      lineHeight = 26,
      ValueComponent
    } = this.props;
    return (
      <View style={{}}>
        <View
          style={[
            {
              flexDirection: direction,
              paddingVertical: 8
            } as ViewStyle,
            center ? { alignItems: 'center' } : null,
            containerStyle
          ]}
        >
          <View
            style={{
              marginRight: 10,
              marginBottom: direction === 'row' ? 0 : 4
            }}
          >
            <IBText
              size={fontSize}
              color={'#9B9DA5'}
              lineHeight={lineHeight}
              style={labelStyle}
            >
              {label}
            </IBText>
          </View>
          {ValueComponent || (
            <View style={{ flex: 1 }}>
              <IBText
                size={fontSize}
                color={'#303238'}
                lineHeight={lineHeight}
                style={[{ textAlign: textAlign }, valueStyle] as TextStyle}
              >
                {value}
              </IBText>
            </View>
          )}
        </View>
        <Line />
      </View>
    );
  }
}
