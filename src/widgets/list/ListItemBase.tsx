import React, { PureComponent } from 'react';
import {
  TextStyle,
  View,
  ViewStyle,
  TouchableWithoutFeedback,
  TouchableHighlight
} from 'react-native';
import { IBText, Line } from '../base';
import Icon from 'react-native-vector-icons/MaterialIcons';
/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
type Props = {
  style?: ViewStyle;
  showLine?: boolean;
  onPress?: Function;
  title: string;
  subTitle?: string;
  subTitleStyle?: TextStyle;
  titleStyle?: TextStyle;
};
export class ListItemBase extends PureComponent<Props, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    let {
      style,
      onPress,
      title,
      subTitle,
      subTitleStyle,
      titleStyle,
      showLine
    } = this.props;
    return (
      <View style={[style]}>
        <TouchableHighlight
          underlayColor={'#f1f1f1'}
          style={{}}
          onPress={onPress as any}
        >
          <View style={{}}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                  paddingHorizontal: 15
                }
              ]}
            >
              <View style={{ flex: 1, paddingRight: 10 }}>
                <IBText
                  size={14}
                  color={'#303238'}
                  lineHeight={20}
                  style={titleStyle}
                >
                  {title}
                </IBText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {!!subTitle && (
                  <IBText
                    size={13}
                    color={'#999999'}
                    lineHeight={20}
                    style={subTitleStyle}
                  >
                    {subTitle}
                  </IBText>
                )}
                <Icon name="chevron-right" size={18} color="#CCCCCC" />
              </View>
            </View>
            {showLine && <Line style={{ marginLeft: 15 }} />}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
