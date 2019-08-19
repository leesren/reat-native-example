import React, { PureComponent } from 'react';
import { View, ViewStyle } from 'react-native';
/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
type TimelineAvatarItemBaseProps = {
  avatar?: React.ReactNode;
  index?: number;
  tipsWidth?: number;
  wrapStyle?: ViewStyle;
  lineStyle?: ViewStyle;
  tipsStyle?: ViewStyle;
};
export class TimelineAvatarBase extends PureComponent<
  TimelineAvatarItemBaseProps,
  any
> {
  static defaultProps = {
    tipsWidth: 40
  };
  constructor(props: any) {
    super(props);
  }
  render() {
    const {
      tipsWidth = 40,
      wrapStyle,
      tipsStyle,
      lineStyle,
      avatar
    } = this.props;
    return (
      <View
        style={[
          {
            paddingLeft: tipsWidth + 12,
            position: 'relative'
          },
          wrapStyle
        ]}
      >
        {this.props.children}
        <View
          style={[
            {
              position: 'absolute',
              width: tipsWidth,
              height: tipsWidth,
              borderRadius: tipsWidth,
              backgroundColor: '#fff',
              left: 0,
              top: 3,
              overflow: 'hidden',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            },
            tipsStyle
          ]}
        >
          {avatar}
        </View>
        <View
          style={[
            {
              position: 'absolute',
              width: 1,
              backgroundColor: '#EBEBEB',
              top: 3,
              bottom: -3,
              left: tipsWidth / 2,
              zIndex: -1
            },
            lineStyle
          ]}
        />
      </View>
    );
  }
}
