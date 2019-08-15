import * as React from 'react';
import {
  StyleSheet,
  Text,
  ViewPropTypes,
  View,
  Animated,
  ScrollView,
  ViewStyle,
  TextStyle,
  Platform,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from 'react-native';

type Props = {
  goToPage: Function;
  activeTab?: number;
  tabs: Array<any>;
  scrollValue: Animated.Value;
  backgroundColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
  textStyle?: TextStyle;
  style?: ViewStyle;
  tabStyle?: ViewStyle;
  renderTab?: (
    name: string,
    page: number,
    isTabActive: boolean,
    onPressHandler: (page: number) => void
  ) => React.ReactNode;
  underlineStyle?: ViewStyle;
  tabLineStyle?: ViewStyle;
  underlineHeight?: number;
  containerWidth: number;
  underlineWidth: number;
};
export default class DefaultTabBarBase extends React.Component<Props, any> {
  static defaultProps = {
    activeTextColor: 'navy',
    inactiveTextColor: 'black',
    backgroundColor: null
  };

  renderTabOption = (name, page) => {};

  renderTab = (
    name: string,
    page: number,
    isTabActive: boolean,
    onPressHandler: (page: number) => void
  ) => {
    const { activeTextColor, inactiveTextColor, textStyle } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return (
      <Button
        style={{ flex: 1 }}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
      >
        <View style={[styles.tab, this.props.tabStyle]}>
          <Text
            style={[{ color: textColor, fontWeight, fontSize: 16 }, textStyle]}
          >
            {name}
          </Text>
        </View>
      </Button>
    );
  };
  render() {
    const numberOfTabs = this.props.tabs.length;
    const {
      underlineWidth,
      underlineHeight,
      containerWidth,
      activeTextColor
    } = this.props;
    const tabWidth = containerWidth / numberOfTabs;
    const customTabWidth = underlineWidth || tabWidth;
    const startX = (tabWidth - customTabWidth) * 0.5;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: customTabWidth,
      height: 2,
      backgroundColor: activeTextColor || 'navy',
      bottom: 0,
      left: startX
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, tabWidth]
    });
    return (
      <View
        style={[
          {
            borderWidth: !isNaN(underlineHeight)
              ? underlineHeight
              : StyleSheet.hairlineWidth,
            borderColor: '#ccc'
          },
          styles.tabs,
          { backgroundColor: this.props.backgroundColor },
          this.props.style
        ]}
      >
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [{ translateX }]
            },
            this.props.underlineStyle
          ]}
        />
      </View>
    );
  }
}

const Button = props => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        delayPressIn={0}
        background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
        {...props}
      >
        {props.children}
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableWithoutFeedback {...props}>
      {props.children}
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0
  }
});
