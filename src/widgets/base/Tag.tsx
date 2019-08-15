/**
 * @flow
 * @author hdp
 * @description 平行四边形文本标签
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextProperties
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  warpStyle?: ViewStyle;
  style?: ViewStyle;
  textStyle?: TextStyle;
  color?: string;
  bgColor?: string;
  radius?: number;
  shape?: boolean;
  fontSize?: number;
  onPress?: (event: any) => void;
};

export class Tag extends React.PureComponent<Props> {
  render() {
    let {
      style,
      warpStyle,
      textStyle,
      color,
      bgColor,
      shape = false,
      fontSize = 12,
      onPress
    } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.88} style={style} onPress={onPress}>
        <View
          style={[
            shape ? styles.shapeView : styles.baseView,
            { backgroundColor: bgColor || '#E6E7EB' },
            warpStyle
          ]}
        >
          <Text
            style={[
              shape ? styles.textView : styles.baseTextView,
              { color: color || '#999999', fontSize },
              textStyle
            ]}
          >
            {this.props.children}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
interface TagTipsProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  textWarpStyle?: ViewStyle;
  tipsColor?: string;
  tipsSize?: number;
  fontSize?: number;
  tipsRadius?: number;
  textProps?: TextProperties;
  onPress?: (event: any) => any;
}
export class TagTips extends React.PureComponent<TagTipsProps> {
  render() {
    let {
      style,
      tipsSize = 5,
      tipsRadius,
      textStyle,
      textWarpStyle,
      tipsColor = '#43A2FF',
      textProps = {},
      onPress
    } = this.props;
    let _tipsRadius = !isNaN(tipsRadius) ? tipsRadius : tipsSize;
    return (
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={onPress}
        style={[{ flexDirection: 'row', alignItems: 'center' }, style]}
      >
        <View
          style={{
            width: tipsSize,
            height: tipsSize,
            borderRadius: _tipsRadius,
            backgroundColor: tipsColor
          }}
        />
        <View style={[{ marginLeft: 4 }, textWarpStyle]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            {...textProps}
            style={[{ color: '#999999', fontSize: 12 }, textStyle]}
          >
            {this.props.children}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  baseView: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 2
  },
  shapeView: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 2,
    transform: [{ skewX: '-16deg' }]
  },
  baseTextView: {},
  textView: {
    transform: [{ skewX: '16deg' }]
  }
});
