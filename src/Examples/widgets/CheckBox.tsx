import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import { Img } from '../../widgets';
import {
  ViewStyle,
  TextStyle,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import { IBText } from './IBText';
type ItemProp = { label: string; value: any; checked?: boolean };
type Props = {
  disabled?: boolean;
  list: Array<ItemProp>;
  selectedList?: Array<ItemProp>;
  onPressItem?: (item, index) => void;
  onChange?: (list: ItemProp[]) => void;
  selectedAll?: boolean;
  keyValue?: string;
  renderItem: (props: ItemComProp) => React.ReactNode;
};
type ItemComProp = {
  disabled: boolean;
  checked: boolean;
  index: number;
  item: any;
  onPress: (item, index) => void;
};

export class CheckBoxHoc extends Component<Props, any> {
  static defaultProps = {
    disabled: false,
    keyValue: 'value',
    selectedAll: false
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      list: props.list,
      selectedList: props.selectedAll ? props.list : []
    };
  }

  handlePress = (el, index) => {
    let { selectedList } = this.state;
    const { onChange, onPressItem, keyValue } = this.props;

    if (el.disabled) {
      onPressItem && onPressItem(el, index);
      return;
    }
    let itemIndex = selectedList.findIndex(
      item => item[keyValue] === el[keyValue]
    );
    if (itemIndex !== -1) {
      selectedList.splice(itemIndex, 1);
    } else {
      selectedList.push(el);
    }
    this.setState({
      selectedList: [...selectedList]
    });
    onChange && onChange(selectedList);
  };
  handleSelectAdd = (all = false) => {
    const { onChange, disabled } = this.props;
    if (disabled) return;
    let t = all ? this.state.list.slice(0) : [];
    this.setState({
      selectedList: t
    });
    onChange && onChange(t);
  };
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.list, this.props.list)) {
      this.setState({
        list: nextProps.list
      });
    }
    if (!isEqual(nextProps.selectedList, this.props.selectedList)) {
      this.setState({
        selectedList: nextProps.selectedList
      });
    }
    if (nextProps.selectedAll !== this.props.selectedAll) {
      this.handleSelectAdd(nextProps.selectedAll);
    }
  }
  render() {
    let { list, selectedList } = this.state;
    const { disabled, keyValue, renderItem } = this.props;
    return list.map((el, index) => {
      let checked = selectedList.find(item => item[keyValue] === el[keyValue]);
      let _dis = disabled ? true : el.disabled;
      return renderItem({
        disabled: _dis,
        checked: !!checked,
        index: index,
        item: el,
        onPress: () => {
          !_dis && this.handlePress(el, index);
        }
      });
    });
  }
}
interface CheckBoxAllHocProps {
  disabledAll?: boolean;
  selectedList?: Array<any>;
  checkedAll?: boolean;
  render?: Function;
  list: Array<any>;
  onChange?: (list: Array<any>) => void;
  children: (props: {
    disabledAll: boolean;
    selectedList: Array<any>;
    checkedAll: boolean;
    list: Array<any>;
    handleDisabledAll: (props: any) => void;
    handleCheckedAll: (props: any) => void;
  }) => React.ReactNode;
}

// 增加 全选 取消，不可选，可选功能
export class CheckBoxGroupHoc extends Component<CheckBoxAllHocProps, any> {
  static defaultProps = {
    checkedAll: false,
    disabledAll: false,
    selectedList: []
  };
  constructor(props: CheckBoxAllHocProps) {
    super(props);
    this.state = {
      checkedAll: props.checkedAll,
      disabledAll: props.disabledAll
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.selectedList, this.props.selectedList)) {
      this.setState({ selectedList: nextProps.selectedList });
    }
  }
  handleCheckedAll = () => {
    let { checkedAll, disabledAll } = this.state;
    if (disabledAll) return;
    const { list, onChange } = this.props;
    this.setState(
      {
        selectedList: !checkedAll ? [...list] : [],
        checkedAll: !checkedAll
      },
      () => {
        onChange && onChange(this.state.selectedList);
      }
    );
  };
  handleDisabledAll = () => {
    let { disabledAll } = this.state;
    const { onChange } = this.props;
    this.setState(
      {
        disabledAll: !disabledAll,
        selectedList: []
      },
      () => {
        onChange && onChange(this.state.selectedList);
      }
    );
  };
  render() {
    let { checkedAll, disabledAll, selectedList } = this.state;
    const { render, children, list } = this.props;
    const params = {
      checkedAll,
      disabledAll,
      list,
      selectedList: selectedList,
      handleDisabledAll: this.handleDisabledAll,
      handleCheckedAll: this.handleCheckedAll
    };
    if (render) {
      return render(params);
    }
    return typeof children === 'function'
      ? children(params)
      : React.isValidElement(children)
      ? children
      : null;
  }
}

type CheckboxItemProp = {
  disabled?: boolean;
  checked?: boolean;
  onPress?: Function;
  label?: String;
  style?: ViewStyle;
  textContainer?: ViewStyle;
  iconContainer?: ViewStyle;
  textStyle?: TextStyle;
  checkBoxImg?: Partial<typeof checkBoxImgs>;
};
export const checkBoxImgs = {
  disabled: <Img width={18} src={require('./img/radio-disabled.png')} />,
  disabledChecked: (
    <Img width={18} src={require('./img/radio-checked-disabled.png')} />
  ),
  checked: <Img width={18} src={require('./img/radio-checked.png')} />,
  radioChecked: <Img width={18} src={require('./img/radio-selected.png')} />,
  radioCheckedDisable: (
    <Img width={18} src={require('./img/radio-selected-disable.png')} />
  ),
  unchecked: <Img width={18} src={require('./img/radio-unchecked.png')} />
};
export class CheckboxItem extends React.PureComponent<CheckboxItemProp, any> {
  checkBoxIms = checkBoxImgs;
  constructor(props: CheckboxItemProp) {
    super(props);
    props.checkBoxImg &&
      (this.checkBoxIms = Object.assign(this.checkBoxIms, props.checkBoxImg));
  }

  renderSingleIcon = () => {
    const { onPress, disabled, checked, iconContainer, label } = this.props;
    const ViewCom: any = label ? View : TouchableWithoutFeedback;
    let checkboxImg = this.checkBoxIms.unchecked;
    if (disabled) {
      checkboxImg = checked
        ? this.checkBoxIms.disabledChecked
        : this.checkBoxIms.disabled;
    } else {
      checkboxImg = checked
        ? this.checkBoxIms.checked
        : this.checkBoxIms.unchecked;
    }
    return (
      <View style={{}}>
        <ViewCom
          onPress={onPress}
          hitSlop={{ left: 20, right: 20, top: 20, bottom: 40 }}
        >
          <View
            style={[
              { paddingLeft: 12, marginTop: 2, paddingRight: 12 },
              iconContainer
            ]}
          >
            {checkboxImg}
          </View>
        </ViewCom>
      </View>
    );
  };
  render() {
    const { onPress, label, style, textStyle, textContainer } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          label && onPress && onPress();
        }}
      >
        <View style={[{ flexDirection: 'row' }, style]}>
          {this.renderSingleIcon()}
          {!!label && (
            <View style={[{ paddingLeft: 10 }, textContainer]}>
              <IBText
                size={16}
                color={'#222'}
                lineHeight={22}
                style={textStyle}
              >
                {label}
              </IBText>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
