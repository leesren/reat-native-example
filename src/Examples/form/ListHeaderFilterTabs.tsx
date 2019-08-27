import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  ViewStyle
} from 'react-native';
import { IconButton, Colors, withTheme, Theme, List } from 'react-native-paper';
import {
  LabelItem,
  Line,
  IBText,
  IBTextWithUnit,
  TitleTips,
  InfoItem,
  Img,
  InfoItemIcon,
  ListItemBase,
  ToggleCollapsibleHoc
} from '../../widgets';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DefaultTabBarBase from '../scroll-tabs/DefaultTabBarBase';
type State = {};

class Example extends React.Component<any, State> {
  static title = 'ListHeaderFilterTabs';
  state = {
    selectIndex: -1
  };
  render() {
    let { selectIndex } = this.state;
    return (
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <View style={{ flex: 1 }}>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            多种形式的label
          </List.Subheader>
          <View style={{ flex: 1 }}>
            <FilterTabs
              style={{ flex: 1, overflow: 'hidden' }}
              tabHeight={300}
              tabs={['执行人', '复核人', '状态']}
              renderTab={props => {
                return (
                  <React.Fragment>
                    {props.index === 0 && (
                      <ScrollView
                        style={{ flex: 1, backgroundColor: '#fff' }}
                        tabLabel="执行人"
                      >
                        {data.slice(0, 2).map((el, index) => {
                          return (
                            <ListItemBase
                              data={el}
                              title={el.label}
                              key={index}
                              showLine={true}
                              style={{
                                backgroundColor:
                                  selectIndex == index ? 'red' : '#fff'
                              }}
                              onPress={() => {
                                this.setState({
                                  selectIndex: index
                                });
                                props.toggle();
                              }}
                            />
                          );
                        })}
                      </ScrollView>
                    )}
                    {props.index === 1 && (
                      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                        {data.slice(0, 1).map((el, index) => {
                          return (
                            <ListItemBase
                              data={el}
                              title={el.label}
                              key={index}
                              showLine={true}
                              note={el.dtjcount}
                              style={{ backgroundColor: '#fff' }}
                              subTitleStyle={
                                index === 2 ? { color: '#E95F62' } : {}
                              }
                              onPress={() => alert('onPress')}
                            />
                          );
                        })}
                      </ScrollView>
                    )}
                    {props.index === 2 && (
                      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                        {data.slice(0, 3).map((el, index) => {
                          return (
                            <ListItemBase
                              data={el}
                              title={el.label}
                              key={index}
                              showLine={true}
                              note={el.dtjcount}
                              style={{ backgroundColor: '#fff' }}
                              subTitleStyle={
                                index === 2 ? { color: '#E95F62' } : {}
                              }
                              onPress={() => alert('onPress')}
                            />
                          );
                        })}
                      </ScrollView>
                    )}
                  </React.Fragment>
                );
              }}
            >
              <ScrollView style={{ flex: 1 }}>
                {Array(20)
                  .fill(0)
                  .map((el, index) => (
                    <IBText
                      key={index}
                      size={14}
                      color={'#444'}
                      lineHeight={24}
                    >
                      江钱江摩托股份有限{index}
                    </IBText>
                  ))}
              </ScrollView>
            </FilterTabs>
          </View>
        </View>
      </View>
    );
  }
}
type FilterTabsProps = {
  style?: ViewStyle;
  tabHeight?: number;
  baseZIndex: number;
  tabBarHeight?: number;
  tabs: Array<string>;
  renderTab: ({ index: number, toggle: Function }) => React.ReactNode;
};
class FilterTabs extends React.Component<FilterTabsProps, any> {
  static defaultProps = {
    tabHeight: 400,
    tabBarHeight: 45,
    baseZIndex: 3
  };
  sliceHeight = new Animated.Value(0);
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      activeIndex: -1,
      onRootHeight: 0
    };
  }
  toggleSlice = () => {
    let willDo = !this.state.show;
    this.setState({ show: willDo });
    Animated.timing(this.sliceHeight, {
      toValue: willDo ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.linear)
    }).start(() => {});
  };
  renderTabItem = (item, index, toggleProps) => {
    let { activeIndex } = this.state;
    const isTabActive = activeIndex === index;
    let iconName = toggleProps.collapsed
      ? 'keyboard-arrow-down'
      : 'keyboard-arrow-up';
    iconName = isTabActive ? iconName : 'keyboard-arrow-up';
    const c = isTabActive ? '#E95F62' : '#9B9DA5';
    return (
      <TouchableWithoutFeedback
        key={item}
        onPress={() => {
          if (index !== this.state.activeIndex) {
            if (toggleProps.collapsed === false) {
              toggleProps.toggle();
              this.toggleSlice();
            }
            this.setState({
              activeIndex: index
            });
          } else {
            toggleProps.toggle();
            this.toggleSlice();
          }
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <IBText center bold={isTabActive} size={14} color={c} lineHeight={22}>
            {item}
          </IBText>
          <Icon style={{ marginLeft: 2 }} name={iconName} size={18} color={c} />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  toggleTabsView = toggleProps => {
    this.toggleSlice();
    toggleProps.toggle();
  };
  _onRootLayout = event => {
    let { height } = event.nativeEvent.layout;
    this.setState({
      onRootHeight: height
    });
  };
  render() {
    let { show, activeIndex, onRootHeight } = this.state;
    const {
      children,
      tabs,
      tabHeight,
      tabBarHeight,
      renderTab,
      style,
      baseZIndex
    } = this.props;
    return (
      <View
        onLayout={this._onRootLayout}
        style={[
          {
            position: 'relative',
            paddingTop: tabBarHeight
          },
          style
        ]}
      >
        <ToggleCollapsibleHoc collapsed={this.state.show}>
          {toggleProps => {
            return (
              <React.Fragment>
                <View
                  style={[
                    {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      zIndex: baseZIndex,
                      height: tabBarHeight
                    },
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      borderBottomColor: '#ebebeb',
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      backgroundColor: '#fff'
                    }
                  ]}
                >
                  {tabs.map((el, index) => {
                    return this.renderTabItem(el, index, toggleProps);
                  })}
                </View>
                <Animated.View
                  style={{
                    position: 'absolute',
                    zIndex: baseZIndex - 1,
                    left: 0,
                    right: 0,
                    top: 0,
                    height: tabHeight,
                    transform: [
                      {
                        translateY: this.sliceHeight.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-tabHeight, tabBarHeight]
                        })
                      }
                    ]
                  }}
                >
                  <View style={{ flex: 1, backgroundColor: '#a0a01f8a' }}>
                    {renderTab({
                      toggle: () => {
                        this.toggleTabsView(toggleProps);
                      },
                      index: activeIndex
                    })}
                  </View>
                </Animated.View>
                {show && (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      this.toggleTabsView(toggleProps);
                    }}
                    style={{
                      position: 'absolute',
                      zIndex: baseZIndex - 2,
                      left: 0,
                      right: 0,
                      top: 0,
                      height: onRootHeight,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,.10)'
                    }}
                  ></TouchableOpacity>
                )}
              </React.Fragment>
            );
          }}
        </ToggleCollapsibleHoc>
        {children}
      </View>
    );
  }
}

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
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withTheme(Example);
