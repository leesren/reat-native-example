import React, { PureComponent } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { IBText } from '../base';
type Props = {
  showLabel?: boolean;
  titleStyle?: TextStyle;
  bgStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  center?: boolean;
};
type State = {};

export class TitleTips extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    let {
      showLabel = true,
      titleStyle,
      bgStyle,
      center,
      containerStyle
    } = this.props;
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            paddingRight: 10,
            paddingVertical: 10
          },
          center ? { alignItems: 'center' } : null,
          containerStyle
        ]}
      >
        {showLabel && (
          <View
            style={[
              {
                height: 12,
                width: 2,
                marginRight: 8,
                backgroundColor: '#E95F62',
                marginTop: 4
              },
              bgStyle
            ]}
          />
        )}
        <IBText size={14} color={'#303238'} lineHeight={20} style={titleStyle}>
          {this.props.children}
        </IBText>
      </View>
    );
  }
}
