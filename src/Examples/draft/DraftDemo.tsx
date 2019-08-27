import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton, List } from 'react-native-paper';

type State = {};

export default class Example extends React.Component<any, State> {
  static title = 'DraftDemo';

  render() {
    return (
      <View style={[styles.container, { backgroundColor: '#f2f2f2' }]}>
        <List.Section>
          <List.Subheader>Draft</List.Subheader>
          <List.Item
            title="基本使用"
            onPress={() => this.props.navigation.navigate('DraftDetialDemo')}
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
