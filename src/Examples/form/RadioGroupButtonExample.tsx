import * as React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import {
  IconButton,
  Colors,
  withTheme,
  Theme,
  List,
  Button
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadioItem, RadioGroupHoc, Tag } from '../../widgets';
import { IBText, Line } from '../../widgets';

type State = {};

class Example extends React.Component<any, State> {
  static title = 'RadioGroupButtonExample';
  state = {
    value: '',
    list: []
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        list: [
          { label: '全部', id: '' },
          { label: '尽职调查', id: '1' },
          { label: '监管反馈', id: '2' },
          { label: '持续督导', id: '3' },
          {
            label: '3M上海研磨产品制造有限公司2019年IPO副主承销/分销564564321',
            id: '78043d56-0060-4f12-bb38-44d3f2c78780',
            dtjcount: '483'
          }
        ]
      });
    }, 600);
  }
  render() {
    const { colors } = this.props.theme;
    return (
      <ScrollView style={[styles.container]}>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            RadioGroup Button{' '}
          </List.Subheader>
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <RadioGroupHoc
                list={this.state.list}
                value={this.state.value}
                valueKey="id"
                onChange={(item, index) => {
                  this.setState(
                    {
                      value: item.id
                    },
                    () => {
                      console.log('value', this.state.value);
                    }
                  );
                }}
                renderItem={props => {
                  return (
                    <Tag
                      key={props.index}
                      shape={false}
                      style={{ marginRight: 10, marginBottom: 10 }}
                      bgColor={props.checked ? '#F7F0E1' : '#F6F6F6'}
                      color={props.checked ? '#D8B66A' : '#595B5F'}
                      fontSize={13}
                      onPress={props.onPress as any}
                      warpStyle={{
                        paddingHorizontal: 12,
                        paddingVertical: 10
                      }}
                    >
                      {props.item.label}
                    </Tag>
                  );
                }}
              />
            </View>
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

        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            RadioGroup Button{' '}
          </List.Subheader>
          <RadioGroupHoc
            list={this.state.list}
            value={this.state.value}
            valueKey="id"
            onChange={(item, index) => {
              this.setState(
                {
                  value: item.id
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
                  iconContainer={{ paddingRight: 0, paddingLeft: 6 }}
                  checked={props.checked}
                  onPress={props.onPress}
                  customContent={infoProps => {
                    return (
                      <View style={{}}>
                        <View
                          style={{
                            padding: 10,
                            flexDirection: 'row'
                          }}
                        >
                          <View style={{ flex: 1, paddingVertical: 5 }}>
                            <IBText
                              size={13}
                              color={infoProps.checked ? '#D8B66A' : '#595B5F'}
                              lineHeight={17}
                            >
                              {props.item.label}
                            </IBText>
                          </View>
                          <View style={{}}>
                            {infoProps.checked && (
                              <Icon size={22} name="check" color={'#D8B66A'} />
                            )}
                          </View>
                        </View>
                        <Line style={{ marginLeft: 15 }} />
                      </View>
                    );
                  }}
                />
              );
            }}
          />
        </List.Section>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withTheme(Example);
