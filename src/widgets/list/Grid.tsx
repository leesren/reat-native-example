import React, { PureComponent } from 'react';
import { View, ViewStyle, Dimensions, StyleSheet } from 'react-native';
/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
type Props = {
  style?: ViewStyle;
  row?: number;
  col?: number;
  containerWidth?: number;
  itemWarpStyle?: ViewStyle;
  showBorder?: boolean;
};
export class Grid extends PureComponent<Props, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    let {
      row = 1,
      col = 1,
      containerWidth = Dimensions.get('window').width,
      itemWarpStyle,
      showBorder = false
    } = this.props;
    const itemWidth = containerWidth / col;
    let items = React.Children.map(this.props.children, child => child);
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {Array(items.length >= row * col ? row * col : items.length)
          .fill(0)
          .map((el, index) => {
            return (
              <View
                key={index}
                style={[
                  {
                    width: itemWidth
                  },
                  showBorder
                    ? {
                        borderBottomColor: '#ebebeb',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderRightWidth:
                          (index + 1) % col === 0
                            ? 0
                            : StyleSheet.hairlineWidth,
                        borderRightColor: '#ebebeb'
                      }
                    : null,
                  itemWarpStyle
                ]}
              >
                {items[index]}
              </View>
            );
          })}
      </View>
    );
  }
}
