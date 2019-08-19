import * as React from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { withTheme, Switch } from 'react-native-paper';
import { Table } from '../../widgets';
import { ListPanelHeader } from '../components';

type State = {};

class Example extends React.Component<any, State> {
  static title = 'TableDemo';
  state = {
    showBorder: true
  };
  render() {
    let { showBorder } = this.state;
    return (
      <ScrollView style={[styles.container, { backgroundColor: '#fff' }]}>
        <ListPanelHeader
          title={'table base —— ' + (showBorder ? '线条' : '无线条')}
          footer={
            <Switch
              value={showBorder}
              onValueChange={() => {
                this.setState({ showBorder: !showBorder });
              }}
            />
          }
        >
          <Table
            labelWidth={140}
            selectable={!showBorder}
            list={[
              {
                label: '公司名称',
                value: '深圳市腾讯计算机系统有限公司北京分 公司'
              },
              {
                label: '统一社会信用代码',
                value: '212121212'
              },
              {
                label: '企业类型',
                value: '私营'
              },
              {
                label: '住所',
                value: '深圳市南山区'
              }
            ]}
          />
        </ListPanelHeader>
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
