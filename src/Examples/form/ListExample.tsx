import * as React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import {
  IconButton,
  Colors,
  withTheme,
  Theme,
  List,
  Switch
} from 'react-native-paper';
import {
  LabelItem,
  Line,
  IBText,
  IBTextWithUnit,
  ListItem,
  ListItemBase,
  ListItemAvatar,
  Img,
  Grid
} from '../../widgets';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScrollableTabBarBase from '../scroll-tabs/ScrollableTabBarBase';
type State = {};

class Example extends React.Component<any, State> {
  static title = 'ListExample';

  render() {
    const { colors } = this.props.theme;
    return (
      <View style={[styles.container]}>
        <ScrollableTabView
          initialPage={3}
          renderTabBar={props => (
            <ScrollableTabBarBase
              {...props}
              underlineWidth={20}
              activeTextColor="#E95F62"
              underlineHeight={StyleSheet.hairlineWidth}
              backgroundColor="rgba(255, 255, 255, 0.7)"
            />
          )}
        >
          <ScrollView style={{ flex: 1 }} tabLabel="ListItemAvatar">
            <ListItemAvatar
              title={'项目文档'}
              style={{ backgroundColor: '#fff' }}
              onPress={() => alert('onPress')}
              showLine
            />
            <ListItemAvatar
              title={'刘鑫'}
              style={{ backgroundColor: '#fff' }}
              onPress={() => alert('onPress')}
              showLine
              avatarStyle={{ backgroundColor: '#D8B66A' }}
              itemIcon={<Icon name="phone-in-talk" size={22} color="#D8B66A" />}
            />
            <ListItemAvatar
              title={'刘鑫'}
              style={{ backgroundColor: '#fff' }}
              onPress={() => alert('onPress')}
              showLine
              avatar={
                <Img
                  src={
                    'https://pic3.zhimg.com/v2-22b0a63f8c76bc96e0adcc0f6db8e019_im.jpg'
                  }
                  width={35}
                  round
                />
              }
              subTitle="资管部门"
              itemIcon={<Icon name="phone-in-talk" size={22} color="#D8B66A" />}
            />

            <ListItemAvatar
              title={'相关流程'}
              style={{ backgroundColor: '#fff' }}
              onPress={() => alert('onPress')}
              showLine
              avatar={
                <Img
                  src={'https://pic4.zhimg.com/da8e974dc_xs.jpg'}
                  width={20}
                />
              }
            />
            <ListItemAvatar
              title={'底稿任务'}
              style={{ backgroundColor: '#fff' }}
              onPress={() => alert('onPress')}
              showLine
              avatar={<Icon name="contact-phone" size={20} color="#666" />}
            />
            <ListItemAvatar
              title={'欧阳寻儿相关财务资料及审计报告'}
              style={{ backgroundColor: '#fff' }}
              onPress={() => alert('onPress')}
              subTitle="5.6M"
              showLine
              titleStyle={{ fontSize: 14 }}
              avatar={
                <Img
                  src={
                    'https://pic4.zhimg.com/80/v2-78915294267aeca8b4b292652f2d2cf7_qhd.jpg'
                  }
                  height={35}
                  width={30}
                />
              }
              itemIcon={<Icon name="filter-3" size={24} color="#D8B66A" />}
            />

            <ListItemAvatar
              title={'刘鑫'}
              style={{ backgroundColor: '#fff' }}
              onPress={() => alert('onPress')}
              showLine
              avatar={
                <Img
                  src={
                    'https://pic3.zhimg.com/v2-22b0a63f8c76bc96e0adcc0f6db8e019_im.jpg'
                  }
                  width={35}
                  round
                />
              }
              subTitle="2018-10-12"
              itemIcon={
                <IBText size={14} color={'#57A3EA'} lineHeight={20}>
                  通过
                </IBText>
              }
            />
          </ScrollView>

          <ScrollView style={{ flex: 1 }} tabLabel="List1">
            {data.map((el, index) => {
              return (
                <ListItem
                  data={el}
                  key={index}
                  style={{ backgroundColor: '#fff' }}
                  onPress={() => alert('onPress')}
                />
              );
            })}
          </ScrollView>
          <ScrollView style={{ flex: 1 }} tabLabel="ListItemBase">
            {data.map((el, index) => {
              return (
                <ListItemBase
                  data={el}
                  title={el.label}
                  key={index}
                  showLine={true}
                  subTitle={el.dtjcount}
                  style={{ backgroundColor: '#fff' }}
                  subTitleStyle={index === 2 ? { color: '#E95F62' } : {}}
                  onPress={() => alert('onPress')}
                />
              );
            })}
          </ScrollView>
          <ScrollView
            style={{ flex: 1, backgroundColor: '#fff' }}
            tabLabel="Grid"
          >
            <GridExmaple />
          </ScrollView>
        </ScrollableTabView>
      </View>
    );
  }
}

class GridExmaple extends React.Component<any, any> {
  state = {
    showBorder: false
  };
  constructor(props: any) {
    super(props);
  }
  renderItem = ({ icon, name }) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon name={icon} size={32} color="#DABF85" />
        <IBText
          style={{ marginTop: 2 }}
          size={12}
          color={'#202936'}
          lineHeight={15}
        >
          {name}
        </IBText>
      </View>
    );
  };
  render() {
    let { showBorder } = this.state;
    return (
      <List.Section>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f2f2f2',
            paddingHorizontal: 15
          }}
        >
          <List.Subheader style={{}}>默认</List.Subheader>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <IBText
              style={{ marginRight: 10 }}
              size={13}
              color={'#777'}
              lineHeight={15}
            >
              {!showBorder ? '显示边框' : '不显示边框'}
            </IBText>
            <Switch
              value={showBorder}
              onValueChange={() => {
                this.setState({ showBorder: !showBorder });
              }}
            />
          </View>
        </View>
        <Grid
          showBorder={showBorder}
          row={2}
          col={4}
          itemWarpStyle={{ paddingVertical: 10 }}
        >
          {this.renderItem({ icon: 'contact-phone', name: '服务记录' })}
          {this.renderItem({ icon: 'filter', name: '司法诉讼' })}
          {this.renderItem({ icon: 'filter-b-and-w', name: '商业动态' })}
          {this.renderItem({ icon: 'filter-vintage', name: '并购重组' })}
          {this.renderItem({ icon: 'fingerprint', name: '联系人' })}
        </Grid>
      </List.Section>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  }
});

const data = [
  {
    label: '销564564321',
    value: '78043d56-0060-4f12-bb38-44d3f2c78780',
    dtjcount: '483'
  },
  {
    label:
      'TCL比艾奇精密电路（惠州）有限公司2019年第三类并购重组（其它审核类）',
    value: '49c9f2f0-ad37-4e16-be2d-9f3f04638944',
    dtjcount: '409'
  },
  {
    label: '安宁昆钢桥钢350轧钢厂2019年增发保荐主承销不不不',
    value: 'bec50642-23f8-40c8-a4f5-7386de5d4fca',
    dtjcount: '354'
  },
  {
    label: 'ANTALIPO保荐主承销',
    value: '74b7e5c7-967b-4b85-8871-401ff96485fc',
    dtjcount: '482'
  },
  {
    label: '浙江钱江摩托股份有限公司2019年IPO主承销（非保荐）',
    value: '0b5b0a34-28ea-4569-937c-1b4bffba0bc5',
    dtjcount: '483'
  },
  {
    label: 'IPO-3M上海研磨产品',
    value: '11c5b9a7-a0af-45aa-8261-0bb64a93c17a',
    dtjcount: '483'
  }
];

export default withTheme(Example);
