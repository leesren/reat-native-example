import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton, Colors, withTheme, Theme, List } from 'react-native-paper';
import {
  checkBoxImgs,
  CheckboxItem,
  CheckBoxGroupHoc,
  CheckBoxHoc
} from '../../widgets';

type State = {};

class Example extends React.Component<any, State> {
  static title = 'CheckBoxExample';
  state = {
    checked1: false,
    checked2: true,
    checked3: true,
    checked4: true,
    selectedList: [],
    list: [
      {
        name: '股权持续督导',
        survType: 1,
        label: '股权持续督导',
        value: 1
      },
      {
        name: '债券存续期',
        survType: 2,
        label: '债券存续期',
        value: 2
      },
      {
        name: 'ABS存续期',
        survType: 3,
        label: 'ABS存续期',
        value: 3
      },
      {
        name: '新三板持续督导',
        survType: 4,
        label: '新三板持续督导',
        value: 4
      }
    ]
  };
  render() {
    const { colors } = this.props.theme;
    let { checked1, checked2, checked3, checked4 } = this.state;
    return (
      <View style={[styles.container]}>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            水平模式
          </List.Subheader>
          <View style={{ flexDirection: 'row' }}>
            <CheckboxItem
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

            <CheckboxItem
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

            <CheckboxItem
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

            <CheckboxItem
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
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            垂直模式
          </List.Subheader>
          <CheckboxItem
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

          <CheckboxItem
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

          <CheckboxItem
            iconContainer={{ paddingRight: 0, paddingLeft: 6 }}
            label="不可选-已选择"
            disabled={checked3}
            style={{ paddingVertical: 10 }}
            checked={checked3}
            onPress={() => {
              this.setState({
                checked3: !checked3
              });
              console.log('不可选-已选择');
            }}
          />

          <CheckboxItem
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
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            checkboxgroup
          </List.Subheader>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <CheckBoxHoc
              value={this.state.selectedList}
              list={this.state.list}
              onChange={selectedList => {
                console.log('selectedList', selectedList);
              }}
              renderItem={props => {
                return (
                  <CheckboxItem
                    key={props.index}
                    iconContainer={{ paddingRight: 0, paddingLeft: 6 }}
                    label={props.item.label}
                    textContainer={{ flex: 0 }}
                    style={{ paddingVertical: 10 }}
                    checked={props.checked}
                    onPress={props.onPress}
                  />
                );
              }}
            />
          </View>
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
