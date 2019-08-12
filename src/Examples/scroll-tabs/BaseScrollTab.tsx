import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton, Colors, withTheme, Theme } from 'react-native-paper';
import ScrollableTabView from './scrollable-tab-view';
import DefaultTabBarBase from './DefaultTabBarBase';
type Props = {
  theme: Theme;
};

type State = {
  loading: boolean;
};

class ButtonExample extends React.Component<Props, State> {
  static title = 'BaseScrollTab';

  render() {
    return (
      <ScrollableTabView>
        <Text tabLabel="Tab #1">My</Text>
        <Text tabLabel="Tab #2">favorite</Text>
        <Text tabLabel="Tab #3">project</Text>
      </ScrollableTabView>
    );
  }
  render1() {
    const { colors } = this.props.theme;

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollableTabView
          style={{ marginTop: 20 }}
          initialPage={1}
          renderTabBar={props => (
            <DefaultTabBarBase
              {...props}
              underlineWidth={34}
              activeTextColor="#E95F62"
              underlineHeight={0}
              backgroundColor="rgba(255, 255, 255, 0.7)"
            />
            // <DefaultTabBar {...props} />
          )}
        >
          <Text tabLabel="Tab #1">My</Text>
          <Text tabLabel="Tab #2">favorite</Text>
          <Text tabLabel="Tab #3">project</Text>
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
