import React, { PureComponent } from 'react';
import { TextStyle, View, ViewStyle, TouchableHighlight } from 'react-native';
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
  note?: string;
  avatar?: any;
  avatarStyle?: ViewStyle;
  titleStyle?: TextStyle;
  noteStyle?: TextStyle;
  itemIcon?: React.ReactNode;
};
export class ListItemAvatar extends PureComponent<Props, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    let {
      style,
      onPress,
      title,
      avatar,
      subTitle,
      subTitleStyle,
      titleStyle,
      showLine,
      itemIcon,
      avatarStyle,
      noteStyle,
      note
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
                  paddingVertical: 10,
                  paddingHorizontal: 15
                }
              ]}
            >
              <View
                style={{
                  flex: 1,
                  paddingRight: 10,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View style={{ marginRight: 10 }}>
                  {avatar ? (
                    avatar
                  ) : (
                    <View
                      style={[
                        {
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 35,
                          width: 35,
                          borderRadius: 35,
                          backgroundColor: '#438EE0'
                        },
                        avatarStyle
                      ]}
                    >
                      <IBText size={16} color={'#fff'} lineHeight={23}>
                        {title[0] || ''}
                      </IBText>
                    </View>
                  )}
                </View>
                <View style={{}}>
                  <IBText
                    size={16}
                    color={'#303238'}
                    lineHeight={23}
                    style={titleStyle}
                  >
                    {title}
                  </IBText>
                  {!!subTitle && (
                    <IBText
                      size={12}
                      color={'#9B9DA5'}
                      lineHeight={17}
                      style={subTitleStyle}
                    >
                      {subTitle}
                    </IBText>
                  )}
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {!!note && (
                  <IBText
                    size={13}
                    color={'#999999'}
                    lineHeight={20}
                    style={noteStyle}
                  >
                    {note}
                  </IBText>
                )}
                {itemIcon || (
                  <Icon name="chevron-right" size={20} color="#CCCCCC" />
                )}
              </View>
            </View>
            {showLine && <Line style={{ marginLeft: 15 }} />}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
