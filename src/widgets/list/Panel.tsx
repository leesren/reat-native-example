import React, { PureComponent } from 'react';
import {
  TextStyle,
  View,
  ViewStyle,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Dimensions,
  Text,
  ImageStyle
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IBText, Line, Img } from '../base';
interface Props {
  title: string;
  showMore?: boolean;
  showIcon?: boolean;
  icon?: any;
  iconStyle?: ImageStyle;
  IconComponent?: React.ReactNode;
  panelTitleStyle?: ViewStyle;
  panelTitleTxtStyle?: TextStyle;
  onPress?: Function;
  BgComponent?: React.ReactNode;
}
export class PanelHeader extends PureComponent<Props> {
  render() {
    const {
      title,
      showMore = true,
      icon,
      panelTitleStyle,
      panelTitleTxtStyle,
      onPress,
      IconComponent,
      iconStyle,
      BgComponent
    } = this.props;
    const showIcon = IconComponent || icon;
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            paddingVertical: 13,
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingHorizontal: 12,
            position: 'relative'
          },
          panelTitleStyle
        ]}
      >
        {BgComponent}

        {showIcon
          ? IconComponent || (
              <Img
                width={22}
                src={icon}
                style={[{ marginRight: 5 }, iconStyle]}
              />
            )
          : null}
        <View style={{ flex: 1, marginLeft: showIcon ? 8 : 0 }}>
          <Text
            style={
              [
                {
                  fontWeight: 'bold',
                  color: '#1F2633',
                  fontSize: 16,
                  lineHeight: 22
                },
                panelTitleTxtStyle
              ] as TextStyle
            }
          >
            {title}
          </Text>
        </View>
        {showMore && (
          <TouchableWithoutFeedback onPress={onPress as any}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 20,
                paddingVertical: 3
              }}
              hitSlop={{ top: 15, bottom: 15, right: 10, left: 20 }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: '#999999',
                  marginRight: 2
                }}
              >
                更多
              </Text>
              <Icon name="chevron-right" size={15} color={'#999999'} />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}
