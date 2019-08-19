import * as React from 'react';
import { View, StyleSheet, Text, Dimensions, Animated } from 'react-native';
import { IconButton, Colors, withTheme, Theme, List } from 'react-native-paper';
import {
  PanelHeader,
  Line,
  Img,
  ListItemAvatar,
  Tag,
  TagTips,
  Grid,
  TimelineBase,
  IBText,
  TitleTips,
  ToggleCollapsibleHoc
} from '../../widgets';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

type State = {};

class Example extends React.Component<any, State> {
  static title = 'HocDemo';
  state = {
    show: false
  };
  render() {
    const { colors } = this.props.theme;
    return (
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            base use
          </List.Subheader>
          <View style={{ padding: 15 }}>
            <ToggleCollapsibleHoc collapsed={this.state.show}>
              {props => {
                return (
                  <View style={{}}>
                    <TouchableOpacity
                      activeOpacity={0.88}
                      onPress={props.toggle}
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <View style={{ flex: 1 }}>
                        <TitleTips>
                          点击--项目列表{props.collapsed ? '收起' : '展开'}
                        </TitleTips>
                      </View>
                      <Animated.View
                        style={{
                          position: 'relative',
                          transform: [
                            {
                              rotate: props.baseRotate
                            }
                          ]
                        }}
                      >
                        <Icon
                          name="keyboard-arrow-down"
                          size={22}
                          color="#666"
                        />
                      </Animated.View>
                    </TouchableOpacity>
                    {props.collapsed && (
                      <View style={{ backgroundColor: '#f2f2f2' }}>
                        <IBText size={13} color={'#222'} lineHeight={17}>
                          这是内容。。。。。。。。。
                        </IBText>
                      </View>
                    )}
                  </View>
                );
              }}
            </ToggleCollapsibleHoc>
          </View>
        </List.Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withTheme(Example);
