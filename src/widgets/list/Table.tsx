/**
 * @flow
 * @author shaorencen@yodinfo.com
 * @description 表格组件
 */
import React, { PureComponent } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { IBText } from '../base';
// type check
type ITablePros = {
  borderWidth?: number;
  list: Array<{
    label?: string;
    value?: string;
    labelStyle?: ViewStyle;
    labelTxStyle?: TextStyle;
    valueStyle?: ViewStyle;
    valueTxStyle?: TextStyle;
  }>;
  borderColor?: string;
  fontSize?: string;
  color?: string;
  labelWidth?: number;
  labelStyle?: ViewStyle;
  labelTxStyle?: TextStyle;
  labelTxtStyle?: TextStyle;
  valueStyle?: ViewStyle;
  valueTxStyle?: TextStyle;
  tableBackgroundColor?: string;
  padding?: number;
  keyname?: string | number;
  tabStyle?: ViewStyle;
  selectable?: boolean;
  radius?: number;
  align?: string;
  oddColor?: string;
  evenColor?: string;
};

export class Table extends PureComponent<ITablePros, any> {
  render() {
    const {
      list,
      keyname,
      labelStyle,
      valueStyle,
      padding = 12,
      fontSize = 14,
      labelWidth = 100,
      tableBackgroundColor,
      color = '#9B9DA5',
      borderColor = '#ebebeb',
      borderWidth = StyleSheet.hairlineWidth,
      labelTxtStyle,
      valueTxStyle = { color: '#333333' },
      radius,
      tabStyle,
      oddColor = '#FAFAFC',
      evenColor = null,
      selectable = false,
      align = 'left'
    } = this.props;

    const renderItem = (el, index) => {
      if (Object.keys(el).length === 0) return null;
      return (
        <View
          key={el[keyname] || index + ''}
          style={[
            {
              flexDirection: 'row',

              borderBottomColor: borderColor,
              borderBottomWidth: index == list.length - 1 ? 0 : borderWidth
            },
            selectable
              ? {
                  backgroundColor: index % 2 === 0 ? oddColor : evenColor,
                  borderBottomWidth: 0
                }
              : null
          ]}
        >
          <View
            style={[
              { width: labelWidth, padding: padding },
              labelStyle,
              el.labelStyle
            ]}
          >
            <IBText
              color={color}
              size={fontSize}
              style={[{ lineHeight: 17 }, labelTxtStyle] as TextStyle}
            >
              {el.label}
            </IBText>
          </View>
          <View
            style={[
              {
                flex: 1,
                padding: padding,
                borderLeftColor: borderColor,
                borderLeftWidth: selectable ? 0 : borderWidth
              },
              valueStyle,
              el.valueStyle
            ]}
          >
            <IBText
              color={color}
              size={fontSize}
              style={
                [
                  valueTxStyle,
                  { textAlign: align },
                  el.valueTxStyle
                ] as TextStyle
              }
            >
              {el.value || ''}
            </IBText>
          </View>
        </View>
      );
    };

    return (
      <View
        style={[
          {
            backgroundColor: tableBackgroundColor || '#fff',
            borderColor: borderColor,
            borderWidth: borderWidth
          },
          { borderRadius: radius ? radius : 0 },
          tabStyle
        ]}
      >
        {list.map(renderItem)}
      </View>
    );
  }
}
