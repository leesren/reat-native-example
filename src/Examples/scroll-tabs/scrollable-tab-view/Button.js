import * as React from 'react';
import {
  TouchableNativeFeedback,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';

const Button = props => {
  if (Platform.OS === 'ios') {
    return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
  }
  return (
    <TouchableNativeFeedback
      delayPressIn={0}
      background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
      {...props}
    >
      {props.children}
    </TouchableNativeFeedback>
  );
};

module.exports = Button;
