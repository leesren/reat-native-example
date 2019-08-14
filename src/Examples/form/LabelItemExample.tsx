import * as React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { IconButton, Colors, withTheme, Theme, List } from 'react-native-paper';
import {
  LabelItem,
  Line,
  IBText,
  IBTextWithUnit,
  TitleTips,
  InfoItem
} from '../../widgets';
import Icon from 'react-native-vector-icons/MaterialIcons';
type State = {};

class Example extends React.Component<any, State> {
  static title = 'LabelItemExample';

  render() {
    const { colors } = this.props.theme;
    return (
      <ScrollView style={[styles.container, { backgroundColor: '#fff' }]}>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            多种形式的label
          </List.Subheader>
          <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
            <LabelItem label="底稿类型" value="尽职调查" />
            <LabelItem label="签发日期" value="2018-12-07" />
            <LabelItem
              label="反馈标题"
              value="湖北托普科技2018IPO主承销的四川托普科2018主承销"
            />
            <LabelItem
              label="停留时长"
              valueTextStyle={{ color: '#E95F62' }}
              value="2天"
            />
            <LabelItem
              label="申请人"
              labelTxtStyle={{ letterSpacing: 7 }}
              value="李晓辉"
              onPressValue={() => {
                alert('call');
              }}
              valueTextStyle={{ color: '#D9B764' }}
              valueIcon={
                <Icon
                  style={{ marginLeft: 6 }}
                  size={16}
                  color="#D9B764"
                  name="phone-forwarded"
                />
              }
            />
            <LabelItem
              numberOfLinesValue={2}
              label="反馈标题"
              style={{ alignItems: 'flex-start' }}
              value="湖北托普科技2018IPO主承销的四川托普科2018主承销"
            />
          </View>
        </List.Section>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            大数字
          </List.Subheader>
          <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <IBTextWithUnit value="29" unit="个" label="项目数" />
              </View>
              <View style={{ flex: 1 }}>
                <IBTextWithUnit value="1343" unit="个" label="项目数" />
              </View>
            </View>
          </View>
        </List.Section>

        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            标题
          </List.Subheader>
          <View style={{ paddingHorizontal: 15 }}>
            <TitleTips>持续督导信息</TitleTips>
            <Line />
            <TitleTips>
              持续督导信息持续督导信息持续督导信息持续督导信息持续督导信息持续督导信息
            </TitleTips>
            <Line />
          </View>
        </List.Section>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            信息标签-右边
          </List.Subheader>
          <View style={{ paddingHorizontal: 15 }}>
            <InfoItem
              label="项目名称"
              value="360企业安全技术背景集团有限公司募集资金专项督导"
            />
            <InfoItem label="项目状态" value="募集资金专项督导" />
            <InfoItem
              label="项目风险类型"
              value="正常类"
              valueStyle={{ color: '#549FEF' }}
            />
            <InfoItem label="实际完成日期" value="2018-12-13" />
          </View>
        </List.Section>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            信息标签-左边
          </List.Subheader>
          <View style={{ paddingHorizontal: 15 }}>
            <InfoItem
              label="被担保方名称:"
              textAlign="left"
              value="360企业安全技术背景集团有限公司募集资金专项督导"
            />
            <InfoItem
              label="项目状态:"
              textAlign="left"
              value="募集资金专项督导"
            />
            <InfoItem
              label="项目风险类型:"
              value="正常类"
              textAlign="left"
              valueStyle={{ color: '#549FEF' }}
            />
            <InfoItem
              fontSize={12}
              textAlign="left"
              label="担任:"
              value="董事长"
            />
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
