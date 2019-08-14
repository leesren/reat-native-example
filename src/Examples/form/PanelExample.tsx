import * as React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { IconButton, Colors, withTheme, Theme, List } from 'react-native-paper';
import { PanelHeader, Line, Img, ListItemAvatar } from '../../widgets';
import Icon from 'react-native-vector-icons/MaterialIcons';
type State = {};

class Example extends React.Component<any, State> {
  static title = 'PanelExample';

  render() {
    const { colors } = this.props.theme;
    return (
      <View style={[styles.container, { backgroundColor: '#f1f1f1' }]}>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            多选
          </List.Subheader>
          <PanelHeader
            IconComponent={
              <Icon name={'filter-tilt-shift'} size={24} color="#DABF85" />
            }
            onPress={() => alert('onPress')}
            title="团队仪表盘（0）"
          />
          <Line />
          <PanelHeader
            icon={
              'https://pic3.zhimg.com/v2-22b0a63f8c76bc96e0adcc0f6db8e019_im.jpg'
            }
            onPress={() => alert('onPress')}
            title="利益冲突自查（0）"
          />
          <Line />
          <PanelHeader onPress={() => alert('onPress')} title="流程待办（0）" />
          <Line />
          <PanelHeader showMore={false} title="流程待办（0）" />
          <Line />
          <PanelHeader
            IconComponent={
              <Icon name={'font-download'} size={23} color="#DABF85" />
            }
            onPress={() => alert('onPress')}
            title="任务待办（0）——背景"
            BgComponent={
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: 48,
                  width: Dimensions.get('window').width,
                  backgroundColor: '#fff',
                  opacity: 0.2
                }}
              >
                <Img
                  height={48}
                  width={Dimensions.get('window').width}
                  src={
                    'https://pic3.zhimg.com/v2-22b0a63f8c76bc96e0adcc0f6db8e019_im.jpg'
                  }
                />
              </View>
            }
          />
        </List.Section>
        <List.Section>
          <List.Subheader style={{ backgroundColor: '#f2f2f2' }}>
            panel 卡片
          </List.Subheader>
          <View style={{ backgroundColor: '#f1f1f1' }}>
            <View
              style={{
                borderRadius: 12,
                marginHorizontal: 12,
                backgroundColor: '#fff',
                marginBottom: 20,
                overflow: 'hidden'
              }}
            >
              <PanelHeader showMore={false} title="流程待办（0）" />
              <Line />
              <View style={{}}>
                <ListItemAvatar
                  title={'项目文档'}
                  style={{ backgroundColor: '#fff' }}
                  onPress={() => alert('onPress')}
                />
                <ListItemAvatar
                  title={'项目文档'}
                  style={{ backgroundColor: '#fff' }}
                  onPress={() => alert('onPress')}
                />
                <ListItemAvatar
                  title={'项目文档'}
                  style={{ backgroundColor: '#fff' }}
                  onPress={() => alert('onPress')}
                />
              </View>
            </View>
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
