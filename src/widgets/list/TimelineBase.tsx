import React, { PureComponent } from 'react';
import { View, ViewStyle } from 'react-native';
/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
type Props = {
  style?: ViewStyle;
  wrapStyle?: ViewStyle;
  tipsStyle?: ViewStyle;
  lineStyle?: ViewStyle;
  children?: React.ReactNode | React.ReactNodeArray;
};
export class TimelineBase extends PureComponent<Props, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    let { style, wrapStyle, tipsStyle, lineStyle } = this.props;
    let items = React.Children.map(this.props.children, child => child);

    return (
      <View style={style}>
        {items.map((el, index) => {
          return (
            <View
              key={'m.' + index}
              style={[
                {
                  paddingLeft: 15,
                  position: 'relative'
                },
                wrapStyle
              ]}
            >
              {el}
              <View
                style={[
                  {
                    position: 'absolute',
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    borderColor: '#666666',
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    left: 0,
                    top: 3
                  },
                  tipsStyle
                ]}
              />
              <View
                style={[
                  {
                    position: 'absolute',
                    width: 1,
                    backgroundColor: '#CDCED2',
                    top: 3,
                    bottom: -3,
                    left: 5,
                    zIndex: -1
                  },
                  lineStyle
                ]}
              />
            </View>
          );
        })}
      </View>
    );
  }
}
