import * as React from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import {
  IconButton,
  Colors,
  withTheme,
  Theme,
  List,
  Avatar
} from 'react-native-paper';
import {
  PanelHeader,
  Line,
  Img,
  ListItemAvatar,
  Tag,
  TagTips,
  Grid,
  TimelineBase,
  IBText
} from '../../widgets';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TimelineAvatarBase } from '../../widgets/list/TimelineAvatarBase';

type State = {};

class Example extends React.Component<any, State> {
  static title = 'ListExample2';

  render() {
    const { colors } = this.props.theme;
    return (
      <ScrollView style={[styles.container, { backgroundColor: '#fff' }]}>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            ListExample2 base
          </List.Subheader>
          <View style={{}}>
            {Array(3)
              .fill({
                title: '盛大游戏回归A股进入倒计时 世纪华通拟近300亿接手',
                source: '宏观经济',
                date: '2018-09-12'
              })
              .map((el, index) => {
                return (
                  <View style={{}} key={index}>
                    <View
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 12,
                        backgroundColor: '#fff'
                      }}
                    >
                      <View style={{ marginBottom: 6 }}>
                        <IBText
                          size={16}
                          color={'#303238'}
                          lineHeight={20}
                          style={{ marginBottom: 5 }}
                        >
                          {el.title}
                        </IBText>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}
                      >
                        {index % 2 === 0 ? (
                          <Tag fontSize={10} color={'white'} bgColor="#53A1ED">
                            {el.source}
                          </Tag>
                        ) : (
                          <IBText size={12} color={'#9B9DA5'} lineHeight={20}>
                            来源：
                            {el.source}
                          </IBText>
                        )}
                        <IBText size={12} color={'#9B9DA5'} lineHeight={20}>
                          {el.date}
                        </IBText>
                      </View>
                    </View>
                    <Line style={{ marginLeft: 15 }} />
                  </View>
                );
              })}
          </View>
        </List.Section>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withTheme(Example);
