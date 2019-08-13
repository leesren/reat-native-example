import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton, Colors, withTheme, Theme, List } from 'react-native-paper';

type State = {};

class Example extends React.Component<any, State> {
  static title = 'FormExample';

  render() {
    const { colors } = this.props.theme;
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <List.Section>
          <List.Subheader>多选</List.Subheader>
          <List.Item
            title="Checkbox"
            onPress={() => this.props.navigation.navigate('CheckBoxExample')}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            onPress={() =>
              this.props.navigation.navigate('CheckboxGroupExample')
            }
            right={props => <List.Icon {...props} icon="chevron-right" />}
            title="CheckboxGroup"
          />
        </List.Section>
        <List.Section>
          <List.Subheader>单选按钮</List.Subheader>
          <List.Item
            title="Radio"
            onPress={() => this.props.navigation.navigate('RadioExample')}
            right={props => <List.Icon {...props} icon="chevron-right" />}
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

export default withTheme(Example);
