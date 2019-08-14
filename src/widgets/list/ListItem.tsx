import React, { PureComponent } from 'react';
import {
  TextStyle,
  View,
  ViewStyle,
  TouchableWithoutFeedback
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
  data: any;
};
export class ListItem extends PureComponent<Props, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    let { style, onPress, data } = this.props;
    return (
      <View style={[{ paddingLeft: 15 }, style]}>
        <View style={{ paddingRight: 15, paddingTop: 10 }}>
          <View style={{}}>
            <IBText size={16} color={'#303238'} lineHeight={23}>
              {data.label}
            </IBText>
          </View>
          <TouchableWithoutFeedback style={{}} onPress={onPress as any}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 5
                }
              ]}
            >
              <IBText size={14} color={'#9B9B9B'} lineHeight={20}>
                编号：1-1-3
              </IBText>
              <Icon name="chevron-right" size={18} color="#CCCCCC" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Line style={{ marginTop: 5 }} />
      </View>
    );
  }
}
