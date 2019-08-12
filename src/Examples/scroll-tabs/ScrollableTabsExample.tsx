import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton, Colors, withTheme, Theme } from 'react-native-paper';
import ScrollableTabView, {
  DefaultTabBar,
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import ScrollableTabBarBase from './ScrollableTabBarBase';
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
          style={{ marginTop: 20 }}
          initialPage={0}
          renderTabBar={props => (
            <ScrollableTabBarBase
              {...props}
              underlineWidth={20}
              activeTextColor="#E95F62"
              underlineHeight={0}
              backgroundColor="rgba(255, 255, 255, 0.7)"
            />
          )}
        >
          <Text tabLabel="Tab #1">My</Text>
          <Text tabLabel="Tab #2 word word">favorite</Text>
          <Text tabLabel="Tab #3 word word word">project</Text>
          <Text tabLabel="Tab #4 word word word word">favorite</Text>
          <Text tabLabel="Tab #5">project</Text>
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withTheme(ButtonExample);
