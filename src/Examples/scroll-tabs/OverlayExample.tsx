import * as React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { IconButton, Colors, withTheme, Theme } from 'react-native-paper';
import ScrollableTabView, {
  DefaultTabBar,
  ScrollableTabBar,
} from './scrollable-tab-view';

import Icon from 'react-native-vector-icons/Ionicons';
import DefaultTabBarBase from './DefaultTabBarBase';
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
          style={styles.container}
          renderTabBar={props => (
            <DefaultTabBarBase
              {...props}
              underlineWidth={34}
              activeTextColor="#E95F62"
              underlineHeight={0}
              backgroundColor="rgba(255, 255, 255, 0.7)"
            />
          )}
          tabBarPosition="overlayTop"
        >
          <ScrollView tabLabel="头条">
            <Icon
              name="logo-apple"
              color="black"
              size={300}
              style={styles.icon}
            />
            <Icon
              name="ios-phone-portrait"
              color="black"
              size={300}
              style={styles.icon}
            />
            <Icon
              name="logo-apple"
              color="#DBDDDE"
              size={300}
              style={styles.icon}
            />
            <Icon
              name="ios-phone-portrait"
              color="#DBDDDE"
              size={300}
              style={styles.icon}
            />
          </ScrollView>
          <ScrollView tabLabel="科技">
            <Icon
              name="logo-android"
              color="#A4C639"
              size={300}
              style={styles.icon}
            />
            <Icon
              name="logo-android"
              color="black"
              size={300}
              style={styles.icon}
            />
            <Icon
              name="logo-android"
              color="brown"
              size={300}
              style={styles.icon}
            />
          </ScrollView>
          <ScrollView tabLabel="生活">
            <Icon
              name="logo-android"
              color="#A4C639"
              size={300}
              style={styles.icon}
            />
            <Icon
              name="logo-android"
              color="black"
              size={300}
              style={styles.icon}
            />
            <Icon
              name="logo-android"
              color="brown"
              size={300}
              style={styles.icon}
            />
          </ScrollView>
          <ScrollView tabLabel="项目">
            <Icon
              name="logo-android"
              color="#A4C639"
              size={300}
              style={styles.icon}
            />
            <Icon
              name="logo-android"
              color="black"
              size={300}
              style={styles.icon}
            />
            <Icon
              name="logo-android"
              color="brown"
              size={300}
              style={styles.icon}
            />
          </ScrollView>
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
