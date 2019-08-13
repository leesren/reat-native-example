/**
 * @flow
 * @author shaorencen@yodinfo.com
 * 分割线
 */
import React, { PureComponent } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import OAColor from '../../theme/OAColor';

const LineWidth = StyleSheet.hairlineWidth;

type Props = {
  style?: ViewStyle;
  color?: string;
  v?: boolean; // 方向
};

export class Line extends PureComponent<Props> {
  render() {
    let { v, style = {}, color } = this.props;
    let obj = {};
    if (v) {
      obj = {
        width: LineWidth
      };
    } else {
      obj = {
        height: LineWidth
      };
    }
    return (
      <View
        style={[{ backgroundColor: color || OAColor.borLight }, obj, style]}
      />
    );
  }
}

const styles = StyleSheet.create({});
