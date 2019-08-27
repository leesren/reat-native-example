import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import {
  ViewStyle,
  TextStyle,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import { IBText, Img } from '../base';

type ItemProp = { label: string; value: any; checked?: boolean };
type Props = {
  disabled?: boolean;
  list: Array<ItemProp | any>;
  value?: Array<ItemProp | any>;
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
/**
 *
 * selected item 比较 list 的 compareItem
 * @param {*} { item, keyValue, compareItem }
 * @returns
 */
function compareValue({ item, keyValue, compareItem }) {
  if (Object.prototype.toString.call(item) === '[object Object]') {
    return item[keyValue] === compareItem[keyValue];
  } else {
    if (Object.prototype.toString.call(compareItem) === '[object Object]') {
      return item === compareItem[keyValue];
    } else {
      return item === compareItem;
    }
  }
}
type State = {
  list: Array<ItemProp | any>;
  value: Array<ItemProp | any>;
};
export class CheckBoxHoc extends Component<Props, State> {
  static defaultProps = {
    disabled: false,
    keyValue: 'value',
    selectedAll: false
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      list: props.list,
      value: props.value ? props.value : props.selectedAll ? props.list : []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.list, this.props.list)) {
      this.setState({
        list: nextProps.list
      });
    }
    if (
      nextProps.value instanceof Array &&
      !isEqual(nextProps.value, this.props.value)
    ) {
      this.setState({
        value: nextProps.value
      });
    }
    if (nextProps.selectedAll !== this.props.selectedAll) {
      this.handleSelectAdd(nextProps.selectedAll);
    }
  }

  handlePress = (el, index) => {
    let { value } = this.state;
    const { onChange, onPressItem, keyValue } = this.props;

    if (el.disabled) {
      onPressItem && onPressItem(el, index);
      return;
    }
    let itemIndex = value.findIndex(item =>
      compareValue({ item, compareItem: el, keyValue })
    );
    if (itemIndex !== -1) {
      value.splice(itemIndex, 1);
    } else {
      value.push(el);
    }
    this.setState(
      {
        value: [...value]
      },
      () => {
        onChange && onChange(value);
      }
    );
  };
  handleSelectAdd = (all = false) => {
    const { onChange, disabled } = this.props;
    if (disabled) return;
    let t = all ? this.state.list.slice(0) : [];
    this.setState(
      {
        value: t
      },
      () => {
        onChange && onChange(t);
      }
    );
  };

  render() {
    let { list, value } = this.state;
    const { disabled, keyValue, renderItem } = this.props;
    return list.map((el, index) => {
      let checked = value.find(item =>
        compareValue({ item, compareItem: el, keyValue })
      );
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
  value?: Array<any>;
  checkedAll?: boolean;
  render?: Function;
  list: Array<any>;
  onChange?: (list: Array<any>) => void;
  children: (props: {
    disabledAll: boolean;
    value: Array<any>;
    checkedAll: boolean;
    list: Array<any>;
    handleDisabledAll: (props: any) => void;
    handleCheckedAll: (props: any) => void;
  }) => React.ReactNode;
}
type CheckBoxAllHocState = {
  disabledAll?: boolean;
  value?: Array<any>;
  checkedAll?: boolean;
};

// 增加 全选 取消，不可选，可选功能
export class CheckBoxGroupHoc extends Component<
  CheckBoxAllHocProps,
  CheckBoxAllHocState
> {
  static defaultProps = {
    checkedAll: false,
    disabledAll: false,
    value: []
  };
  constructor(props: CheckBoxAllHocProps) {
    super(props);
    this.state = {
      checkedAll: props.checkedAll,
      disabledAll: props.disabledAll,
      value: props.value
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.value, this.props.value)) {
      this.setState({ value: nextProps.value });
    }
  }
  handleCheckedAll = () => {
    let { checkedAll, disabledAll } = this.state;
    if (disabledAll) return;
    const { list, onChange } = this.props;
    this.setState(
      {
        value: !checkedAll ? [...list] : [],
        checkedAll: !checkedAll
      },
      () => {
        onChange && onChange(this.state.value);
      }
    );
  };
  handleDisabledAll = () => {
    let { disabledAll } = this.state;
    const { onChange } = this.props;
    this.setState(
      {
        disabledAll: !disabledAll,
        value: []
      },
      () => {
        onChange && onChange(this.state.value);
      }
    );
  };
  render() {
    let { checkedAll, disabledAll, value } = this.state;
    const { render, children, list } = this.props;
    const params = {
      checkedAll,
      disabledAll,
      list,
      value: value,
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
  onPress?: any;
  label?: String;
  style?: ViewStyle;
  textContainer?: ViewStyle;
  iconContainer?: ViewStyle;
  textStyle?: TextStyle;
  checkBoxImg?: Partial<typeof checkBoxImgs>;
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

export const checkBoxImgs = {
  disabled: <Img width={18} src={require('../img/radio-disabled.png')} />,
  disabledChecked: (
    <Img width={18} src={require('../img/radio-checked-disabled.png')} />
  ),
  checked: <Img width={18} src={require('../img/radio-checked.png')} />,
  radioChecked: <Img width={18} src={require('../img/radio-selected.png')} />,
  radioCheckedDisable: (
    <Img width={18} src={require('../img/radio-selected-disable.png')} />
  ),
  unchecked: <Img width={18} src={require('../img/radio-unchecked.png')} />
};
