import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { IconButton, Colors, withTheme, Theme } from 'react-native-paper';
import ScrollableTabView, {
  DefaultTabBar,
  ScrollableTabBar
} from 'react-native-scrollable-tab-view';
import ScrollableTabBarBase from './ScrollableTabBarBase';
import DefaultTabBarBase from './DefaultTabBarBase';
import { IBText } from '../../widgets';
type Props = {
  theme: Theme;
};

type State = {
  loading: boolean;
};

class ButtonExample extends React.Component<Props, State> {
  static title = 'ScrollableTabsExample';

  render() {
    const { colors } = this.props.theme;

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollableTabView
          style={{}}
          initialPage={0}
          renderTabBar={props => (
            <DefaultTabBarBase
              {...props}
              underlineWidth={20}
              activeTextColor="#E95F62"
              underlineHeight={StyleSheet.hairlineWidth}
              backgroundColor="rgba(255, 255, 255, 0.7)"
              renderTab={(name, page, isTabActive, onPressHandler) => {
                const c = isTabActive ? '#E95F62' : '#9B9DA5';
                const sizeNo = isTabActive ? 16 : 14;
                return (
                  <TouchableWithoutFeedback
                    key={name + page}
                    onPress={() => onPressHandler(page)}
                  >
                    <View
                      style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                      <IBText center size={sizeNo} color={c} lineHeight={18}>
                        {page}
                      </IBText>
                      <IBText
                        center
                        bold={isTabActive}
                        size={13}
                        color={c}
                        lineHeight={17}
                      >
                        {name}
                      </IBText>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          )}
        >
          <Text tabLabel="待提交">My</Text>
          <Text tabLabel="待复核">favorite</Text>
          <Text tabLabel="待验收">project</Text>
          <Text tabLabel="被驳回">favorite</Text>
          <Text tabLabel="已验收">favorite</Text>
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withTheme(ButtonExample);
