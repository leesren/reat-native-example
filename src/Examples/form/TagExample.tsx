import * as React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { IconButton, Colors, withTheme, Theme, List } from 'react-native-paper';
import {
  PanelHeader,
  Line,
  Img,
  ListItemAvatar,
  Tag,
  TagTips,
  Grid
} from '../../widgets';
import Icon from 'react-native-vector-icons/MaterialIcons';

type State = {};

class Example extends React.Component<any, State> {
  static title = 'TagExample';

  render() {
    const { colors } = this.props.theme;
    return (
      <View style={[styles.container, { backgroundColor: '#f1f1f1' }]}>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            tag 斜边
          </List.Subheader>
          <View style={{ backgroundColor: '#fff' }}>
            <View
              style={{
                padding: 15,
                flexDirection: 'row'
              }}
            >
              <Tag shape style={{ marginRight: 10 }}>
                股东
              </Tag>
              <Tag
                shape
                style={{ marginRight: 10 }}
                bgColor="#D8B66A"
                color="#fff"
              >
                高管
              </Tag>
              <Tag
                shape
                style={{ marginRight: 10 }}
                bgColor="#E75756"
                color="#fff"
              >
                其他
              </Tag>
              <Tag
                shape
                style={{ marginRight: 10 }}
                bgColor="#EDF4FF"
                color="#478AF9"
              >
                相关项目:24
              </Tag>
            </View>
          </View>
        </List.Section>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            tag 无斜边
          </List.Subheader>
          <View style={{ backgroundColor: '#fff' }}>
            <View
              style={{
                padding: 15,
                flexDirection: 'row'
              }}
            >
              <Tag shape={false} style={{ marginRight: 10 }}>
                股东
              </Tag>
              <Tag
                shape={false}
                style={{ marginRight: 10 }}
                bgColor="#D8B66A"
                color="#fff"
              >
                高管
              </Tag>
              <Tag
                shape={false}
                style={{ marginRight: 10 }}
                bgColor="#E75756"
                color="#fff"
              >
                其他
              </Tag>
              <Tag
                shape={false}
                style={{ marginRight: 10 }}
                bgColor="#EDF4FF"
                color="#478AF9"
              >
                相关项目:24
              </Tag>
            </View>
          </View>
        </List.Section>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            tag 自定义1
          </List.Subheader>
          <View style={{}}>
            <View
              style={{
                padding: 15,
                flexDirection: 'row'
              }}
            >
              <Tag
                shape={false}
                style={{ marginRight: 10 }}
                bgColor="#FFF"
                color="#1A2033"
                warpStyle={{ paddingHorizontal: 33, paddingVertical: 6 }}
              >
                高管
              </Tag>
              <Tag
                shape={false}
                style={{ marginRight: 10 }}
                bgColor="#FFF"
                color="#1A2033"
                warpStyle={{ paddingHorizontal: 33, paddingVertical: 6 }}
              >
                北京
              </Tag>
              <Tag
                shape={false}
                style={{ marginRight: 10 }}
                bgColor="#FFF"
                color="#1A2033"
                warpStyle={{ paddingHorizontal: 33, paddingVertical: 6 }}
              >
                南京
              </Tag>
            </View>
          </View>
        </List.Section>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            tag 自定义2
          </List.Subheader>
          <View style={{ backgroundColor: '#fff' }}>
            <View
              style={{
                padding: 15,
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              <Tag
                shape={false}
                style={{ marginRight: 10 }}
                bgColor="#F7F0E1"
                color="#D8B66A"
                fontSize={13}
                warpStyle={{ paddingHorizontal: 12, paddingVertical: 10 }}
              >
                全部种类
              </Tag>
              <Tag
                shape={false}
                style={{ marginRight: 10 }}
                bgColor="#F6F6F6"
                color="#595B5F"
                fontSize={13}
                warpStyle={{ paddingHorizontal: 12, paddingVertical: 10 }}
              >
                01-金融债
              </Tag>
              <Tag
                shape={false}
                style={{ marginRight: 10 }}
                bgColor="#F6F6F6"
                color="#595B5F"
                fontSize={13}
                warpStyle={{ paddingHorizontal: 12, paddingVertical: 10 }}
              >
                02-企业债
              </Tag>
            </View>
          </View>
        </List.Section>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            tag 3
          </List.Subheader>
          <View
            style={{
              backgroundColor: '#fff',
              paddingVertical: 12,
              paddingHorizontal: 30
            }}
          >
            <View style={{ backgroundColor: '#f1f1f1' }}>
              <Grid
                row={2}
                col={3}
                itemWarpStyle={{ paddingHorizontal: 12, paddingVertical: 5 }}
              >
                <TagTips style={{ marginRight: 10 }} tipsColor="#D8B66A">
                  全部种类
                </TagTips>
                <TagTips style={{ marginRight: 10 }} tipsColor="#9F8CF1">
                  01-金融债
                </TagTips>
                <TagTips style={{ marginRight: 10 }} tipsColor="#43A2FF">
                  02-企业债
                </TagTips>
                <TagTips style={{ marginRight: 10 }} tipsColor="#43A2FF">
                  03-企业债固定收益类重类重
                </TagTips>
                <TagTips
                  onPress={() => {
                    alert('..');
                  }}
                  style={{ marginRight: 10 }}
                  tipsRadius={0}
                  tipsColor="#43A2FF"
                >
                  企业债固定收
                </TagTips>
              </Grid>
            </View>
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
