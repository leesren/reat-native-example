import * as React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import {
  IconButton,
  Colors,
  withTheme,
  Theme,
  Avatar,
  Paragraph,
  Card,
  Button,
} from 'react-native-paper';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import DefaultTabBarBase from './DefaultTabBarBase';

type Props = {
  theme: Theme;
};

type State = {
  loading: boolean;
};

class ButtonExample extends React.Component<Props, State> {
  static title = 'ScrollTab';

  render() {
    const { colors } = this.props.theme;

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView stickyHeaderIndices={[2]} style={{ flex: 1 }}>
          <Card style={styles.card}>
            <Card.Cover
              source={require('../../../assets/images/wrecked-ship.jpg')}
            />
            <Card.Title title="Abandoned Ship" />
            <Card.Content>
              <Paragraph>
                The Abandoned Ship is a wrecked ship located on Route 108 in
                Hoenn, originally being a ship named the S.S. Cactus. The second
                part of the ship can only be accessed by using Dive and contains
                the Scanner.
              </Paragraph>
            </Card.Content>
          </Card>
          <View style={{ paddingVertical: 15, paddingHorizontal: 15 }}>
            <Text style={{ color: '#222', lineHeight: 22, fontSize: 15 }}>
              Material Design for React Native (Android & iOS)
              https://reactnativepaper.com
            </Text>
          </View>
          <View style={{ height: 50, backgroundColor: 'green' }} />
          <View style={{ flex: 1 }}>
            <ScrollableTabView
              style={{ marginTop: 20 }}
              initialPage={1}
              renderTabBar={props => <DefaultTabBarBase />}
            >
              <Text tabLabel="Tab #1">My</Text>
              <Text tabLabel="Tab #2">favorite</Text>
              <Text tabLabel="Tab #3">project</Text>
            </ScrollableTabView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 4,
  },
  card: {
    margin: 4,
  },
});

export default withTheme(ButtonExample);
