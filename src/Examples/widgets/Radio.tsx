import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import { Img, IBText } from '../../widgets';
import {
  ViewStyle,
  TextStyle,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import { checkBoxImgs } from './CheckBox';
interface Props {
  valueKey?: string;
  value?: any;
  list: Array<{ label: string; value: any } & { [key: string]: any }>;
  renderItem: (props: {
    disabled: boolean;
    checked: boolean;
    index: number;
    item: any;
    onPress: (item: any, index: number) => void;
  }) => React.ReactNode;
  onChange?: (item: any, index: number) => void;
}

export class RadioGroupHoc extends React.PureComponent<Props, any> {
  static defaultProps = {
    value: undefined,
    valueKey: 'value'
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.value, this.props.value)) {
      this.setState({ value: nextProps.value });
    }
  }
  getValue = item => {
    let { valueKey } = this.props;
    return typeof item === 'string' || typeof item === 'number'
      ? item
      : item[valueKey];
  };
  handleSelected = (item, index) => {
    const { onChange } = this.props;

    this.setState(
      {
        value: this.getValue(item)
      },
      () => {
        onChange && onChange(item, index);
      }
    );
  };

  render() {
    const { list, renderItem } = this.props;
    let { value } = this.state;
    return list.map((el, index) => {
      let checked = value === this.getValue(el);
      return renderItem({
        disabled: !!el.disabled,
        checked: checked,
        index: index,
        item: el,
        onPress: () => {
          !el.disabled && this.handleSelected(el, index);
        }
      });
    });
  }
}

type RadioItemProp = {
  disabled?: boolean;
  checked?: boolean;
  onPress?: Function;
  label?: String;
  style?: ViewStyle;
  textContainer?: ViewStyle;
  iconContainer?: ViewStyle;
  textStyle?: TextStyle;
  customContent?: (props: {
    disabled: boolean;
    checked: boolean;
  }) => React.ReactNode;
  checkBoxImg?: Partial<typeof checkBoxImgs>;
};

export class RadioItem extends React.PureComponent<RadioItemProp, any> {
  checkBoxIms = checkBoxImgs;
  constructor(props: RadioItemProp) {
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
        ? this.checkBoxIms.radioCheckedDisable
        : this.checkBoxIms.disabled;
    } else {
      checkboxImg = checked
        ? this.checkBoxIms.radioChecked
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
    const {
      onPress,
      label,
      style,
      textStyle,
      textContainer,
      customContent
    } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          onPress && onPress();
        }}
      >
        {customContent ? (
          customContent(this.props as any)
        ) : (
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
        )}
      </TouchableWithoutFeedback>
    );
  }
}
