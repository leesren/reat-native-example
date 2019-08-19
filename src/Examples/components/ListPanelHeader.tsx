import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { List } from 'react-native-paper';
type Props = {
  title: string;
  footer?: React.ReactNode;
  style?: ViewStyle;
};
type State = {};

export class ListPanelHeader extends React.Component<Props, State> {
  render() {
    const { footer, title, style } = this.props;
    return (
      <List.Section>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f2f2f2',
            paddingHorizontal: 15
          }}
        >
          <List.Subheader style={{}}>{title}</List.Subheader>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            {footer}
          </View>
        </View>
        <View style={[{ padding: 12 }, style]}>{this.props.children}</View>
      </List.Section>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
