import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal as ModalBase,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { withTheme, Switch, Button } from 'react-native-paper';
import {
  Table,
  IBText,
  Line,
  ListItemAvatar,
  ListItemBase,
  TimelineBase
} from '../../widgets';
import { ListPanelHeader } from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
type State = {};

class Example extends React.Component<any, State> {
  static title = 'ModalDemo';
  state = {
    visible: false,
    visible2: false
  };
  onModalClose = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    let { visible, visible2 } = this.state;
    return (
      <ScrollView style={[styles.container, { backgroundColor: '#fff' }]}>
        <ListPanelHeader title={'ModalDemo'}>
          <Button
            onPress={() => {
              this.setState({
                visible: !this.state.visible
              });
            }}
          >
            open modal
          </Button>
        </ListPanelHeader>
        <ListPanelHeader title={'ModalDemo'}>
          <Button
            onPress={() => {
              this.setState({
                visible2: !this.state.visible2
              });
            }}
          >
            open modal2
          </Button>
        </ListPanelHeader>

        <Modal
          isVisible={visible}
          avoidKeyboard
          backdropOpacity={0.3}
          style={{
            justifyContent: 'flex-end',
            margin: 0
          }}
          swipeDirection="down"
          scrollOffsetMax={10}
          onBackdropPress={this.onModalClose}
          onSwipeComplete={this.onModalClose}
          onModalHide={this.onModalClose}
        >
          <View style={{ backgroundColor: '#fff' }}>
            <View style={{ paddingVertical: 12 }}>
              <IBText size={18} center color={'#333'} lineHeight={25}>
                提交复核
              </IBText>
            </View>
            <Line />
            <View style={{ padding: 15 }}>
              <View style={{ paddingBottom: 10 }}>
                <IBText size={14} color={'#E95F62'} lineHeight={20}>
                  提示：确认提交13个文件？
                </IBText>
              </View>
              <View style={{ height: 100 * 1, backgroundColor: '#fafafa' }} />
            </View>
            <View style={{}}>
              <Line />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20
                }}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  style={{ flex: 1 }}
                  onPress={this.onModalClose}
                >
                  <View style={{ paddingVertical: 12 }}>
                    <IBText center size={18} color={'#595B5F'} lineHeight={25}>
                      取消
                    </IBText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{ flex: 1 }}>
                  <View
                    style={{ paddingVertical: 12, backgroundColor: '#D8B66A' }}
                  >
                    <IBText center size={18} color={'#fff'} lineHeight={25}>
                      确认
                    </IBText>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <ModalBase
          visible={visible2}
          animationType="fade"
          transparent={true}
          onDismiss={this.onModalClose}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,.12)',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 4,
                overflow: 'hidden',
                width: Dimensions.get('window').width * 0.78
              }}
            >
              <View style={{}}>
                <ListItemBase
                  title={'审核记录'}
                  style={{ backgroundColor: '#fff' }}
                  // onPress={() => alert('onPress')}
                  showLine={false}
                  titleStyle={{ fontSize: 18 }}
                  itemIcon={
                    <TouchableWithoutFeedback
                      onPress={() => {
                        this.setState({ visible2: false });
                      }}
                    >
                      <Icon name="close" size={24} color="#D8B66A" />
                    </TouchableWithoutFeedback>
                  }
                />
              </View>
              <Line />
              <View
                style={{
                  height: 360
                }}
              >
                <ScrollView
                  contentContainerStyle={{ paddingVertical: 20 }}
                  style={{ flex: 1 }}
                >
                  <View style={{ paddingHorizontal: 25, paddingLeft: 40 }}>
                    <TimelineBase>
                      {Array(8)
                        .fill(4)
                        .map((el, index) => {
                          return (
                            <View key={index} style={{ paddingBottom: 20 }}>
                              <IBText
                                size={12}
                                color={'#9B9DA5'}
                                lineHeight={17}
                              >
                                2019-05-19 14:54:25 | 王光海
                              </IBText>
                              <IBText
                                style={{ marginTop: 4 }}
                                size={14}
                                color={'#666666'}
                                lineHeight={20}
                              >
                                复核退回 &#8594 重新提交
                              </IBText>
                            </View>
                          );
                        })}
                    </TimelineBase>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </ModalBase>
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
