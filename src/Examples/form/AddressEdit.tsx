import * as React from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native";
import { withTheme } from "react-native-paper";
import { Table, IBText } from "../../widgets";

type State = {};

class Example extends React.Component<any, State> {
  static title = "AddressEdit";
  state = {
    showBorder: true,
  };
  render() {
    return (
      <ScrollView style={[styles.container, { backgroundColor: "#fff" }]}>
        <IBText size={13} lineHeight={15} color={"#343"}>
          AddressEdit
        </IBText>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withTheme(Example);
