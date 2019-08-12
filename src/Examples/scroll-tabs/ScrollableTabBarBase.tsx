import React, { Component } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ScrollView,
  Text,
  TextStyle,
  Platform,
  ViewPropTypes,
  Dimensions,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

type Props = {
  goToPage: Function;
  activeTab: number;
  tabs: Array<any>;
  backgroundColor: string;
  activeTextColor: string;
  inactiveTextColor: string;
  scrollOffset: number;
  style: ViewStyle;
  tabStyle: ViewStyle;
  tabsContainerStyle: ViewStyle;
  textStyle: TextStyle;
  renderTab: Function;
  underlineStyle: ViewStyle;
  onScroll: Function;
  scrollValue: Animated.Value;
  tabLineStyle?: ViewStyle;
  underlineHeight?: number;
  containerWidth: number;
  underlineWidth: number;
};
export default class ScrollableTabBarBase extends Component<Props, any> {
  static defaultProps = {
    scrollOffset: 52,
    activeTextColor: 'navy',
    inactiveTextColor: 'black',
    backgroundColor: null,
    style: {},
    tabStyle: {},
    tabsContainerStyle: {},
    underlineStyle: {},
  };
  _tabsMeasurements = [];

  _scrollView: ScrollView;
  _tabContainerMeasurements: any;
  _containerMeasurements: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      _leftTabUnderline: new Animated.Value(0),
      _widthTabUnderline: new Animated.Value(0),
      _containerWidth: null,
    };
  }
  componentDidMount() {
    this.props.scrollValue.addListener(this.updateView);
  }
  componentWillReceiveProps = nextProps => {
    // If the tabs change, force the width of the tabs container to be recalculated
    if (
      JSON.stringify(this.props.tabs) !== JSON.stringify(nextProps.tabs) &&
      this.state._containerWidth
    ) {
      this.setState({ _containerWidth: null });
    }
  };
  updateView = offset => {
    const position = Math.floor(offset.value);
    const pageOffset = offset.value % 1;
    const tabCount = this.props.tabs.length;
    const lastTabPosition = tabCount - 1;

    if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
      return;
    }

    if (
      this.necessarilyMeasurementsCompleted(
        position,
        position === lastTabPosition
      )
    ) {
      this.updateTabPanel(position, pageOffset);
      this.updateTabUnderline(position, pageOffset, tabCount);
    }
  };

  necessarilyMeasurementsCompleted = (position, isLastTab) => {
    return (
      this._tabsMeasurements[position] &&
      (isLastTab || this._tabsMeasurements[position + 1]) &&
      this._tabContainerMeasurements &&
      this._containerMeasurements
    );
  };

  updateTabPanel = (position, pageOffset) => {
    const containerWidth = this._containerMeasurements.width;
    const tabWidth = this._tabsMeasurements[position].width;
    const nextTabMeasurements = this._tabsMeasurements[position + 1];
    const nextTabWidth =
      (nextTabMeasurements && nextTabMeasurements.width) || 0;
    const tabOffset = this._tabsMeasurements[position].left;
    const absolutePageOffset = pageOffset * tabWidth;
    let newScrollX = tabOffset + absolutePageOffset;

    // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
    newScrollX -=
      (containerWidth -
        (1 - pageOffset) * tabWidth -
        pageOffset * nextTabWidth) /
      2;
    newScrollX = newScrollX >= 0 ? newScrollX : 0;

    if (Platform.OS === 'android') {
      this._scrollView.scrollTo({ x: newScrollX, y: 0, animated: false });
    } else {
      const rightBoundScroll =
        this._tabContainerMeasurements.width -
        this._containerMeasurements.width;
      newScrollX =
        newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
      this._scrollView.scrollTo({ x: newScrollX, y: 0, animated: false });
    }
  };

  updateTabUnderline = (position, pageOffset, tabCount) => {
    const lineLeft = this._tabsMeasurements[position].left;
    const lineRight = this._tabsMeasurements[position].right;
    const { underlineWidth, activeTextColor } = this.props;
    const getW = w => (typeof underlineWidth === 'number' ? underlineWidth : w);
    if (position < tabCount - 1) {
      const nextTabLeft = this._tabsMeasurements[position + 1].left;
      const nextTabRight = this._tabsMeasurements[position + 1].right;

      const newLineLeft =
        pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft;
      const newLineRight =
        pageOffset * nextTabRight + (1 - pageOffset) * lineRight;
      let tabWidth0 = newLineRight - newLineLeft;
      let s0 = (tabWidth0 - (underlineWidth || tabWidth0)) * 0.5;

      this.state._leftTabUnderline.setValue(newLineLeft + s0);
      this.state._widthTabUnderline.setValue(getW(tabWidth0));
    } else {
      let tabWidth1 = lineRight - lineLeft;
      let s1 = (tabWidth1 - (underlineWidth || tabWidth1)) * 0.5;

      this.state._leftTabUnderline.setValue(lineLeft + s1);
      this.state._widthTabUnderline.setValue(getW(tabWidth1));
    }
  };

  renderTab = (name, page, isTabActive, onPressHandler, onLayoutHandler) => {
    const { activeTextColor, inactiveTextColor, textStyle } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return (
      <Button
        key={`${name}_${page}`}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
        onLayout={onLayoutHandler}
      >
        <View style={[styles.tab, this.props.tabStyle]}>
          <Text style={[{ color: textColor }, textStyle]}>{name}</Text>
        </View>
      </Button>
    );
  };
  measureTab = (page, event) => {
    const { x, width, height } = event.nativeEvent.layout;
    this._tabsMeasurements[page] = { left: x, right: x + width, width, height };
    // @ts-ignore
    this.updateView({ value: this.props.scrollValue.__getValue() });
  };
  onTabContainerLayout = e => {
    this._tabContainerMeasurements = e.nativeEvent.layout;
    let width = this._tabContainerMeasurements.width;
    if (width < WINDOW_WIDTH) {
      width = WINDOW_WIDTH;
    }
    this.setState({ _containerWidth: width });
    // @ts-ignore
    this.updateView({ value: this.props.scrollValue.__getValue() });
  };

  onContainerLayout = e => {
    this._containerMeasurements = e.nativeEvent.layout;
    // @ts-ignore
    this.updateView({ value: this.props.scrollValue.__getValue() });
  };
  render() {
    const { underlineHeight, activeTextColor, tabLineStyle } = this.props;

    const tabUnderlineStyle = {
      position: 'absolute',
      height: 2,
      backgroundColor: activeTextColor || 'navy',
      bottom: 0,
    };

    const dynamicTabUnderline = {
      left: this.state._leftTabUnderline,
      width: this.state._widthTabUnderline,
    };
    return (
      <View
        style={[
          {
            borderWidth:
              typeof underlineHeight === 'number' ? underlineHeight : 1,
            borderColor: '#ccc',
          },
          styles.container,
          tabLineStyle,
          { backgroundColor: this.props.backgroundColor },
          this.props.style,
        ]}
        onLayout={this.onContainerLayout}
      >
        <ScrollView
          ref={scrollView => {
            this._scrollView = scrollView;
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled={true}
          bounces={false}
          scrollsToTop={false}
        >
          <View
            style={[
              styles.tabs,
              { width: this.state._containerWidth },
              this.props.tabsContainerStyle,
            ]}
            ref={'tabContainer'}
            onLayout={this.onTabContainerLayout}
          >
            {this.props.tabs.map((name, page) => {
              const isTabActive = this.props.activeTab === page;
              const renderTab = this.props.renderTab || this.renderTab;
              return renderTab(
                name,
                page,
                isTabActive,
                this.props.goToPage,
                this.measureTab.bind(this, page)
              );
            })}
            <Animated.View
              style={[
                tabUnderlineStyle,
                dynamicTabUnderline,
                this.props.underlineStyle,
              ]}
            />
          </View>
        </ScrollView>
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
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    height: 50,

    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
