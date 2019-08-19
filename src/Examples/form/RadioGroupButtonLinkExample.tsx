import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ViewStyle,
  TextStyle,
  TextProperties
} from 'react-native';
import {
  IconButton,
  Colors,
  withTheme,
  Theme,
  List,
  Button
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadioItem, RadioGroupHoc, Tag, CheckBoxHoc } from '../../widgets';
import { IBText, Line } from '../../widgets';

type State = {};

class Example extends React.Component<any, State> {
  static title = 'RadioGroupButton联动';
  state = {
    value: '',
    list: originData.slice(0),
    result: '',
    selectedProjects: []
  };
  componentDidMount() {}
  render() {
    let { list } = this.state;
    return (
      <ScrollView style={[styles.container]}>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            复合类型：单选&多选&动态修改数据
          </List.Subheader>
          <View style={{ paddingHorizontal: 15 }}>
            {list.map((item, index) => {
              const ViewCom: any = item.multiple ? CheckBoxHoc : RadioGroupHoc;
              return (
                <View key={index} style={{}}>
                  <Subheader>{item.title}</Subheader>
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                      }
                    ]}
                  >
                    <ViewCom
                      list={item.list}
                      value={item.value}
                      valueKey="value"
                      onChange={(element, subElementIndex) => {
                        if (item.multiple) {
                          this.state.list[index].value = element;
                        } else {
                          this.state.list[index].value = element.value;
                        }

                        if (index === 0 && element.value === 2) {
                          this.setState(
                            {
                              list: originData.slice(0).map((el, i) => {
                                let current = this.state.list[i];
                                let value = current.value; // 缓存选择的 value
                                if (el.multiple) {
                                  return {
                                    ...el,
                                    value: value
                                  };
                                }
                                let resetList = el.list;
                                if (i === 2) {
                                  resetList = newList.slice(0);
                                  value = newList.find(
                                    tag => tag.value === value
                                  )
                                    ? value
                                    : undefined;
                                }
                                return {
                                  ...el,
                                  value: value,
                                  list: resetList
                                };
                              })
                            },
                            () => {
                              console.log(
                                this.state.list.map(el => el.value).join(',')
                              );
                            }
                          );
                        } else if (index === 0 && element.value !== 2) {
                          this.setState(
                            {
                              list: originData.slice(0).map((el, i) => {
                                let current = this.state.list[i];
                                let value = current.value; // 缓存选择的 value
                                if (el.multiple) {
                                  return {
                                    ...el,
                                    value: value
                                  };
                                }
                                return {
                                  title: el.title,
                                  value: el.list.find(
                                    tag => tag.value === value
                                  )
                                    ? value
                                    : undefined,
                                  list: el.list
                                };
                              })
                            },
                            () => {
                              console.log(
                                this.state.list.map(el => el.value).join(',')
                              );
                            }
                          );
                        } else {
                          console.log(
                            this.state.list.map(el => el.value).join(',')
                          );
                        }
                      }}
                      renderItem={props => {
                        return (
                          <Tag
                            key={props.index}
                            shape={false}
                            style={{ marginRight: 10, marginBottom: 10 }}
                            bgColor={props.checked ? '#F7F0E1' : '#F6F6F6'}
                            color={props.checked ? '#D8B66A' : '#595B5F'}
                            fontSize={13}
                            onPress={props.onPress as any}
                            warpStyle={{
                              paddingHorizontal: 10,
                              paddingVertical: 8
                            }}
                          >
                            {props.item.label}
                          </Tag>
                        );
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </List.Section>
        <View style={{ marginTop: 30 }}>
          <IBText size={14} center color={'#333'} lineHeight={20}>
            查看控制台数据
          </IBText>
        </View>
      </ScrollView>
    );
  }
}
type SubheaderProps = {
  style?: ViewStyle;
  textStyle?: TextStyle;
  textProps?: TextProperties;
};
class Subheader extends React.PureComponent<SubheaderProps, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { textStyle, style, textProps = {} } = this.props;
    return (
      <View style={[{ paddingVertical: 15 }, style]}>
        <IBText
          {...textProps}
          size={20}
          color={'#111'}
          lineHeight={28}
          style={textStyle}
        >
          {this.props.children}
        </IBText>
      </View>
    );
  }
}
const originData = [
  {
    title: '项目类型',
    value: 1,
    list: [
      {
        name: '股权持续督导',
        survType: 1,
        label: '股权持续督导',
        value: 1
      },
      {
        name: '债券存续期',
        survType: 2,
        label: '债券存续期',
        value: 2
      },
      {
        name: 'ABS存续期',
        survType: 3,
        label: 'ABS存续期',
        value: 3
      },
      {
        name: '新三板持续督导',
        survType: 4,
        label: '新三板持续督导',
        value: 4
      }
    ]
  },
  {
    title: '风险类型',
    value: undefined,
    list: [
      {
        name: '全部',
        value: '',
        label: '全部'
      },
      {
        name: '正常类',
        label: '正常类',
        value: '正常类'
      },
      {
        name: '关注类',
        label: '关注类',
        value: '关注类'
      },
      {
        name: '风险类',
        label: '风险类',
        value: '风险类'
      },
      {
        name: '退市/违约/摘牌类',
        label: '退市/违约/摘牌类',
        value: '退市/违约/摘牌类'
      }
    ]
  },
  {
    title: '项目状态',
    value: '',
    list: [
      {
        name: '全部',
        value: '',
        label: '全部'
      },
      {
        name: '督导期',
        statusName: '督导期',
        statusCode: '1',
        label: '督导期',
        value: '1'
      },
      {
        name: '募集资金专项督导',
        statusName: '募集资金专项督导',
        statusCode: '2',
        label: '募集资金专项督导',
        value: '2'
      },
      {
        name: '已结束',
        statusName: '已结束',
        statusCode: '3',
        label: '已结束',
        value: '3'
      }
    ]
  },
  {
    title: '项目-多选',
    value: [],
    multiple: true,
    list: [
      { label: '全部', value: '' },
      { label: '尽职调查', value: '1' },
      { label: '监管反馈', value: '2' },
      { label: '持续督导', value: '3' },
      {
        label: '3M上海研磨产',
        value: '4',
        dtjcount: '483'
      }
    ]
  }
];

const newList = [
  {
    name: '全部',
    value: '',
    label: '全部'
  },

  {
    name: '已结束',
    statusName: '已结束',
    statusCode: '3',
    label: '已结束',
    value: '3'
  },
  {
    name: '存续期',
    statusName: '存续期',
    statusCode: '4',
    label: '存续期',
    value: '4'
  }
];
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withTheme(Example);
