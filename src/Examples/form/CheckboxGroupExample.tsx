import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
import { withTheme, Button } from 'react-native-paper';
import { ScrollView } from 'react-navigation';
import OAColor from '../../theme/OAColor';
import {
  CheckBoxHoc,
  ToggleVisibleHoc,
  CheckBoxGroupHoc,
  checkBoxImgs
} from '../../widgets';
import { Line } from '../../widgets';

type State = {};

class CheckboxGroupExample extends React.Component<any, State> {
  static title = 'CheckboxGroupExample';
  state = {
    selectedList: [],
    list: data,
    showCheckbox: false
  };
  onPressItem = args => {
    console.log(args);
  };
  render() {
    let { list, showCheckbox } = this.state;
    return (
      <CheckBoxGroupHoc
        list={list}
        onChange={selectedList => {
          console.log('all items change', selectedList);
          this.setState({
            selectedList: selectedList
          });
        }}
      >
        {props => {
          return (
            <View style={{ flex: 1 }}>
              <ScrollView style={{ flex: 1 }}>
                <CheckBoxHoc
                  disabled={props.disabledAll}
                  selectedList={this.state.selectedList}
                  keyValue="value"
                  list={props.list}
                  onChange={v => {
                    console.log('item change', v);
                    this.setState({
                      selectedList: v
                    });
                  }}
                  renderItem={props => {
                    let { index, ...restProp } = props;
                    return (
                      <CheckBoxItem
                        {...restProp}
                        showCheckbox={this.state.showCheckbox}
                        key={index}
                        onPressItem={() => {
                          this.onPressItem(props);
                        }}
                      />
                    );
                  }}
                />
              </ScrollView>
              <View
                style={{
                  backgroundColor: OAColor.white,
                  shadowColor: 'rgba(26, 26, 26, 0.4)',
                  shadowOpacity: 1,
                  shadowOffset: { width: 0, height: 10 },
                  elevation: 14,
                  shadowRadius: 10
                }}
              >
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around'
                    }
                  ]}
                >
                  <Button
                    onPress={() => {
                      if (!this.state.showCheckbox) {
                        this.setState({
                          showCheckbox: !this.state.showCheckbox
                        });
                      } else {
                        this.setState({
                          showCheckbox: !this.state.showCheckbox,
                          selectedList: []
                        });
                      }
                    }}
                  >
                    {showCheckbox ? '取消编辑' : '编辑'}
                  </Button>
                  {this.state.showCheckbox && (
                    <Button
                      color="orange"
                      onPress={() => {
                        console.log(this.state.selectedList);
                      }}
                    >
                      提交
                    </Button>
                  )}
                  {this.state.showCheckbox && (
                    <Button color="green" onPress={props.handleCheckedAll}>
                      {props.checkedAll ? '取消全选' : '全选'}
                    </Button>
                  )}
                  {this.state.showCheckbox && (
                    <Button color="red" onPress={props.handleDisabledAll}>
                      {props.disabledAll ? '可选' : '不可选'}
                    </Button>
                  )}
                </View>
                <View style={{ height: 17 }} />
              </View>
            </View>
          );
        }}
      </CheckBoxGroupHoc>
    );
  }
}

/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
class CheckBoxItem extends React.PureComponent<any, any> {
  state = {};
  constructor(props: any) {
    super(props);
  }
  renderSingleIcon = props => {
    const { onPress, disabled, checked, iconContainer, label } = this.props;
    const ViewCom: any = label ? View : TouchableWithoutFeedback;
    return (
      <View style={{}}>
        <ViewCom
          onPress={onPress}
          hitSlop={{ left: 20, right: 20, top: 20, bottom: 40 }}
        >
          <View
            style={[
              {
                paddingHorizontal: 10,
                marginTop: 2,
                flexDirection: 'row',
                justifyContent: 'center'
              },
              iconContainer
            ]}
          >
            {disabled
              ? checkBoxIms.disabled
              : checked
              ? checkBoxIms.checked
              : checkBoxIms.unchecked}
          </View>
        </ViewCom>
      </View>
    );
  };
  render() {
    const { item, showCheckbox, onPressItem } = this.props;
    return (
      <ToggleVisibleHoc visible={showCheckbox}>
        {props => (
          <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
            <Animated.View
              style={{
                overflow: 'hidden',

                transform: [
                  {
                    translateX: props.visibleValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -30],
                      extrapolate: 'clamp'
                    })
                  }
                ]
              }}
            >
              {this.renderSingleIcon(props)}
            </Animated.View>

            <Animated.View
              style={[
                { flex: 1 },
                {
                  transform: [
                    {
                      translateX: props.visibleValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -18],
                        extrapolate: 'clamp'
                      })
                    }
                  ]
                }
              ]}
            >
              <TouchableWithoutFeedback onPress={onPressItem}>
                <View style={{}}>
                  <View
                    style={[
                      {
                        backgroundColor: OAColor.white
                      }
                    ]}
                  >
                    <View style={{ flex: 1, paddingRight: 12 }}>
                      <Text
                        style={{ color: '#333', fontSize: 14, lineHeight: 18 }}
                      >
                        {item.label}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 7
                      }}
                    >
                      <View style={{ width: 140 }}>
                        <Text
                          style={{
                            color: '#666',
                            fontSize: 12,
                            lineHeight: 16
                          }}
                        >
                          编号：1-1-2
                        </Text>
                      </View>
                      <Text
                        style={{ color: '#666', fontSize: 12, lineHeight: 15 }}
                      >
                        {item.dtjcount}文件
                      </Text>
                    </View>
                  </View>
                  <Line style={{ marginTop: 12 }} />
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </View>
        )}
      </ToggleVisibleHoc>
    );
  }
}
const checkBoxIms = checkBoxImgs;
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
const data = [
  {
    label: '3M上海研磨产品制造有限公司2019年IPO副主承销/分销564564321',
    value: '78043d56-0060-4f12-bb38-44d3f2c78780',
    dtjcount: '483'
  },
  {
    label: '2019新三板推荐挂牌-问核-12111',
    value: '0b94f1af-e84d-4806-a175-9aef30c8862d',
    dtjcount: '329'
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
    label: '申请立项测试匆动',
    value: 'ce24b59d-f0ae-4d88-af3d-a89aa4bf773a',
    dtjcount: '483'
  },
  {
    label: '鞍钢股份有限公司2019年IPO保荐主承销多多',
    value: '32c95d2e-4e46-4ba7-9fe2-2cd5c0576395',
    dtjcount: '482'
  },
  {
    label: '鞍钢股份有限公司2019年资产支持票据（ABN）',
    value: '091ed2fa-214b-499b-a1a4-a7f0693161e6',
    dtjcount: '630'
  },
  {
    label: '安华国际投资管理顾问（北京）有限公司2019年信贷资产证券化',
    value: '6489f1da-f707-4ed3-ba64-2d30dc4e00be',
    dtjcount: '386'
  },
  {
    label: '鞍钢股份有限公司2019年第一类并购重组（交易所-证监会审核类）',
    value: 'de1524eb-5ace-4b6a-a564-9cb39bf1ee96',
    dtjcount: '408'
  },
  {
    label: '浙江钱江摩托股份有限公司2019年IPO主承销（非保荐）',
    value: '0b5b0a34-28ea-4569-937c-1b4bffba0bc5',
    dtjcount: '483'
  },
  {
    label: 'IPO-3M上海研磨产品制造有限公司2019年IPO保荐主承销',
    value: '11c5b9a7-a0af-45aa-8261-0bb64a93c17a',
    dtjcount: '483'
  },
  {
    label: '北京3W孵化器管理有限公司2019年企业资产证券化（招证资管项目）22222',
    value: 'bdfc1d82-4e36-4175-b643-510fb6ebb166',
    dtjcount: '721'
  },
  {
    label: '北京3W文化传媒有限公司2019年第四类并购重组问核',
    value: '75c298e1-6318-4113-9648-684659da57ce',
    dtjcount: '3'
  },
  {
    label: '浙江钱江摩托股份有限公司2019年增发保荐主承销月',
    value: 'b3f4453e-c75d-48ad-8d2d-9b59c5d08ad7',
    dtjcount: '355'
  }
];
export default withTheme(CheckboxGroupExample);
