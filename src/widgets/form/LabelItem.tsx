import React, { PureComponent } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { IBText } from '../base';
/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
type ItemElProps = {
  label?: string;
  numberOfLinesValue?: number;
  value?: any;
  color?: string;
  style?: ViewStyle;
  onPressValue?: Function;
  titleContainerStyle?: any;
  labelTxtStyle?: TextStyle;
  valueTextStyle?: TextStyle;
  txtContainerStyle?: ViewStyle;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  valueIcon?: React.ReactNode;
};
export class LabelItem extends PureComponent<ItemElProps, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    let {
      label,
      value,
      color,
      style,
      titleContainerStyle,
      labelTxtStyle = {},
      valueIcon,
      numberOfLinesValue,
      ellipsizeMode = 'tail',
      onPressValue,
      txtContainerStyle,
      valueTextStyle
    } = this.props;
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 2
          },
          style
        ]}
      >
        <View style={[{ width: 65 }, titleContainerStyle]}>
          <IBText
            size={14}
            color={'#9B9B9B'}
            lineHeight={20}
            style={labelTxtStyle}
          >
            {label}
          </IBText>
        </View>
        <View
          style={[
            {
              flex: 1,
              paddingLeft: 10,
              flexDirection: 'row',
              alignItems: 'center'
            },
            txtContainerStyle
          ]}
        >
          <IBText
            onPress={onPressValue}
            size={14}
            numberOfLines={numberOfLinesValue || 1}
            ellipsizeMode={ellipsizeMode}
            color={color || '#403D3D'}
            lineHeight={20}
            style={valueTextStyle}
          >
            {value}
          </IBText>
          {valueIcon}
        </View>
      </View>
    );
  }
}
