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
  static title = 'TimelineBaseDemo';

  render() {
    const { colors } = this.props.theme;
    return (
      <ScrollView style={[styles.container, { backgroundColor: '#fff' }]}>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            timeline base 1
          </List.Subheader>
          <View style={{ padding: 15 }}>
            <TimelineBase lineStyle={{ backgroundColor: '#FF3355' }} tipsStyle={{ borderColor: '#FF3355', }} showLastLine={false}>

              <View style={{ paddingBottom: 15 }}>
                <IBText size={14} color={'#333'} lineHeight={17}>
                  2019-05-19 14:54:25 | 王光海
                </IBText>
              </View>
              <View style={{ paddingBottom: 0 }}>
                <IBText size={14} color={'#333'} lineHeight={17}>
                  2019-05-19 14:54:25 | 王光海
                </IBText>
              </View>
            </TimelineBase>
          </View>
        </List.Section>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            timeline base2
          </List.Subheader>
          <View style={{ padding: 15 }}>
            <TimelineBase>
              <View style={{ paddingBottom: 20 }}>
                <IBText size={12} color={'#9B9DA5'} lineHeight={17}>
                  2019-05-19 14:54:25 | 王光海
                </IBText>
                <IBText
                  style={{ marginTop: 4 }}
                  size={14}
                  color={'#666666'}
                  lineHeight={20}
                >
                  复核退回 &#8594 重新提交
                </IBText>
              </View>
              <View style={{ paddingBottom: 20 }}>
                <IBText size={12} color={'#9B9DA5'} lineHeight={17}>
                  2019-05-19 14:54:25 | 王光海
                </IBText>
                <IBText
                  style={{ marginTop: 4 }}
                  size={14}
                  color={'#666666'}
                  lineHeight={20}
                >
                  已验收
                </IBText>
              </View>
            </TimelineBase>
          </View>
        </List.Section>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            timeline avatar
          </List.Subheader>
          <View style={{ padding: 15 }}>
            {[
              <Avatar.Text size={44} label="流" />,
              <Img
                src="https://avatars0.githubusercontent.com/u/2036040?s=180&v=4"
                width={40}
              />,
              <Avatar.Icon size={40} icon="folder" />
            ].map((el, index) => {
              return (
                <TimelineAvatarBase key={index} avatar={el}>
                  <View style={{ paddingBottom: 20 }}>
                    <IBText
                      style={{ marginTop: 4 }}
                      size={14}
                      color={'#222'}
                      lineHeight={20}
                    >
                      刘晓璐
                    </IBText>
                    <IBText size={11} color={'#9B9DA5'} lineHeight={17}>
                      投资银行总部
                    </IBText>
                    <View style={{ marginTop: 10 }}>
                      <View
                        style={[
                          {
                            backgroundColor: '#fff',
                            shadowColor: 'rgba(26, 26, 26, 0.08)',
                            shadowOpacity: 1,
                            shadowOffset: { width: 0, height: 10 },
                            elevation: 20,
                            shadowRadius: 20
                          },
                          {
                            borderRadius: 3,
                            borderLeftWidth: 4,
                            borderLeftColor: '#5DA4E6'
                          }
                        ]}
                      >
                        <View style={{ padding: 10 }}>
                          <IBText size={16} color={'#222'} lineHeight={22}>
                            质控部负责人审核意见汇总并发起立项会
                          </IBText>
                        </View>
                      </View>
                    </View>
                  </View>
                </TimelineAvatarBase>
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
