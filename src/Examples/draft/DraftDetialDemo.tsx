import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
import { Switch, Button } from 'react-native-paper';
import {
  ListItemAvatar,
  Img,
  IBText,
  CheckBoxGroupHoc,
  CheckBoxHoc,
  ToggleVisibleHoc,
  checkBoxImgs,
  Line
} from '../../widgets';
import { ListPanelHeader } from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { data } from '../form/CheckboxGroupExample';
type State = {};

export default class Example extends React.Component<any, State> {
  static title = 'DraftDetialDemo';
  state = {
    selectedList: [],
    list: data,
    showCheckbox: false
  };
  onPressItem = args => {
    console.log(args);
  };
  render() {
    let { list, showCheckbox, selectedList } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={[styles.container, { backgroundColor: '#fff' }]}>
          <ListPanelHeader
            style={{ paddingHorizontal: 0 }}
            title={'ListExample2 base'}
          >
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
                    <CheckBoxHoc
                      disabled={props.disabledAll}
                      value={this.state.selectedList}
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
                  </View>
                );
              }}
            </CheckBoxGroupHoc>
          </ListPanelHeader>
        </ScrollView>
        <View style={{}}>
          <FooterBtn>
            <Button
              onPress={() => {
                this.setState({
                  showCheckbox: !this.state.showCheckbox
                });
              }}
              style={{ flex: 1 }}
              mode="contained"
            >
              {!this.state.showCheckbox ? '批量处理' : '取消'}
            </Button>
            {this.state.showCheckbox && (
              <Button
                onPress={() => {
                  alert('提交');
                }}
                style={{ flex: 1 }}
                mode="contained"
                color="#f06292"
              >
                {` 提交复核${
                  selectedList.length > 0 ? '(' + selectedList.length + ')' : ''
                } `}
              </Button>
            )}
          </FooterBtn>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

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
              ? checkBoxImgs.disabled
              : checked
              ? checkBoxImgs.checked
              : checkBoxImgs.unchecked}
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
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 8,
              alignItems: 'center'
            }}
          >
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
                  <ListItemAvatar
                    title={item.label}
                    style={{ backgroundColor: '#F6F6F6' }}
                    wrapStyle={{ paddingBottom: 5 }}
                    wrapContainerStyle={{ alignItems: 'flex-start' }}
                    subTitle="5.6M"
                    showLine={false}
                    titleStyle={{ fontSize: 14 }}
                    avatar={
                      <Img
                        src={
                          'https://pic4.zhimg.com/80/v2-78915294267aeca8b4b292652f2d2cf7_qhd.jpg'
                        }
                        height={35}
                        width={30}
                        style={{ marginTop: 5 }}
                      />
                    }
                    itemIcon={
                      <Icon name="filter-3" size={24} color="#D8B66A" />
                    }
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#F6F6F6',
                      paddingHorizontal: 12,
                      paddingBottom: 10,
                      paddingTop: 5
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <IBText size={12} color={'#9B9DA5'} lineHeight={17}>
                        李平 | 2019-03-03 14:00:00
                      </IBText>
                    </View>
                    <TouchableOpacity
                      hitSlop={{ top: 0, left: 30, bottom: 20 }}
                      activeOpacity={0.88}
                      style={{ flexDirection: 'row' }}
                      onPress={() => {
                        alert('审核记录');
                      }}
                    >
                      <IBText size={12} color={'#9B9DA5'} lineHeight={17}>
                        审核记录
                      </IBText>
                      <Icon name="chevron-right" size={18} color="#CCCCCC" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </View>
        )}
      </ToggleVisibleHoc>
    );
  }
}

class FooterBtn extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    let items = React.Children.map(this.props.children, child => child);
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {items.map((el, index) => {
          return (
            <View style={{ flex: 1 }} key={index}>
              {el}
            </View>
          );
        })}
      </View>
    );
  }
}
