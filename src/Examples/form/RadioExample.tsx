import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  IconButton,
  Colors,
  withTheme,
  Theme,
  List,
  Button
} from 'react-native-paper';

import {
  CheckboxItem,
  checkBoxImgs,
  RadioItem,
  RadioGroupHoc
} from '../widgets';

type State = {};

class Example extends React.Component<any, State> {
  static title = 'RadioExample';
  state = {
    checked1: false,
    checked2: true,
    checked3: true,
    checked4: true,
    value: ''
  };
  render() {
    const { colors } = this.props.theme;
    let { checked1, checked2, checked3, checked4 } = this.state;
    return (
      <View style={[styles.container]}>
        <List.Section>
          <List.Subheader>水平模式</List.Subheader>
          <View style={{ flexDirection: 'row' }}>
            <RadioItem
              checkBoxImg={checkBoxImgs}
              iconContainer={{ paddingRight: 0, paddingLeft: 6 }}
              label="全选"
              checked={checked1}
              textContainer={{ flex: 0 }}
              style={{ paddingVertical: 10 }}
              onPress={() => {
                this.setState(
                  {
                    checked1: !checked1
                  },
                  () => {
                    console.log('checked1', this.state.checked1);
                  }
                );
              }}
            />

            <RadioItem
              iconContainer={{ paddingRight: 0, paddingLeft: 6 }}
              label="不可选"
              disabled={checked2}
              style={{ paddingVertical: 10 }}
              textContainer={{ flex: 0 }}
              onPress={() => {
                this.setState({
                  checked2: !checked2
                });
                console.log('checked2 不可选');
              }}
            />

            <RadioItem
              iconContainer={{ paddingRight: 0, paddingLeft: 6 }}
              label="不可选-已选择"
              disabled={checked3}
              textContainer={{ flex: 0 }}
              style={{ paddingVertical: 10 }}
              checked={checked3}
              onPress={() => {
                this.setState({
                  checked3: !checked3
                });
                console.log('不可选-已选择');
              }}
            />

            <RadioItem
              iconContainer={{ paddingRight: 0, paddingLeft: 6 }}
              label="已选择"
              textContainer={{ flex: 0 }}
              style={{ paddingVertical: 10 }}
              checked={checked4}
              onPress={() => {
                this.setState(
                  {
                    checked4: !checked4
                  },
                  () => {
                    console.log('checked4', this.state.checked4);
                  }
                );
              }}
            />
          </View>
        </List.Section>
        <List.Section>
          <List.Subheader>垂直模式</List.Subheader>
          <RadioItem
            checkBoxImg={checkBoxImgs}
            iconContainer={{ paddingRight: 0, paddingLeft: 6 }}
            label="全选"
            checked={checked1}
            style={{ paddingVertical: 10 }}
            onPress={() => {
              this.setState(
                {
                  checked1: !checked1
                },
                () => {
                  console.log('checked1', this.state.checked1);
                }
              );
            }}
          />

          <RadioItem
            iconContainer={{ paddingRight: 0, paddingLeft: 6 }}
            label="不可选"
            disabled={checked2}
            style={{ paddingVertical: 10 }}
            onPress={() => {
              this.setState({
                checked2: !checked2
              });
              console.log('checked2 不可选');
            }}
          />

          <RadioItem
            iconContainer={{ paddingRight: 0, paddingLeft: 6 }}
            label="不可选-已选择"
            disabled={true}
            style={{ paddingVertical: 10 }}
            checked={true}
            onPress={() => {
              this.setState({
                // checked3: !checked3
              });
              console.log('不可选-已选择');
            }}
          />

          <RadioItem
            iconContainer={{ paddingRight: 0, paddingLeft: 6 }}
            label="已选择"
            style={{ paddingVertical: 10 }}
            checked={checked4}
            onPress={() => {
              this.setState(
                {
                  checked4: !checked4
                },
                () => {
                  console.log('checked4', this.state.checked4);
                }
              );
            }}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>RadioGroup </List.Subheader>
          <View style={{ flexDirection: 'row' }}>
            <RadioGroupHoc
              list={[
                { label: '复核通过', value: '1' },
                { label: '按意见继续审查(驳回)', value: '2' }
              ]}
              value={this.state.value}
              onChange={(item, index) => {
                this.setState(
                  {
                    value: item.value
                  },
                  () => {
                    console.log('value', this.state.value);
                  }
                );
              }}
              renderItem={props => {
                return (
                  <RadioItem
                    key={props.index}
                    disabled={props.disabled}
                    iconContainer={{ paddingRight: 0, paddingLeft: 6 }}
                    label={props.item.label}
                    style={{
                      paddingVertical: 10,
                      marginLeft: props.index > 0 ? 40 : 0
                    }}
                    checked={props.checked}
                    onPress={props.onPress}
                  />
                );
              }}
            />
          </View>
        </List.Section>

        <View style={{}}>
          <Button
            onPress={() => {
              this.setState({
                value: '3'
              });
            }}
          >
            设置编辑-true
          </Button>
        </View>
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
