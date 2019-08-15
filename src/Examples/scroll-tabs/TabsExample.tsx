import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton, Colors, withTheme, Theme, List } from 'react-native-paper';
import { NavigationScreenProp } from 'react-navigation';

type State = {};

class TabsExample extends React.Component<any, State> {
  static title = 'TabsExample';

  render() {
    const { colors } = this.props.theme;
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <List.Section>
          <List.Subheader>Tabs</List.Subheader>
          <List.Item
            title="基本使用"
            onPress={() => this.props.navigation.navigate('BaseScrollTab')}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            title="基本使用-自定义tab"
            onPress={() => this.props.navigation.navigate('BaseScrollTab2')}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            onPress={() =>
              this.props.navigation.navigate('ScrollableTabsExample')
            }
            right={props => <List.Icon {...props} icon="chevron-right" />}
            title="滚动tabbar"
          />

          <List.Item
            onPress={() => this.props.navigation.navigate('OverlayExample')}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            title="overlay example"
          />
          <List.Item
            onPress={() => this.props.navigation.navigate('FacebookExample')}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            title="facebook example"
          />
        </List.Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withTheme(TabsExample);
