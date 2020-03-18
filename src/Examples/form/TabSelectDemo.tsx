import * as React from "react";
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    Animated,
    Platform,
    Easing,
    ScrollView,
    TouchableOpacity,
    ViewStyle,
    findNodeHandle,
    UIManager
} from "react-native";
import { withTheme, Switch } from "react-native-paper";
import { Table, CheckboxItem, checkBoxImgs, IBText } from "../../widgets";
import { ListPanelHeader } from "../components";
// import Popover from '../../widgets/base/Popover';
// import Popover from 'react-native-popover-view';
import { Popover } from 'react-native-modal-popover';
type State = {};
class Example extends React.Component<any, State> {
    static title = "TabSelectDemo";
    headersPosition = [];
    state = {
        isVisible: false,
        showBorder: true,
        fromRect: { x: 0, y: 0, width: 0, height: 0 },
        list: [
            {
                title: "2020年01月"
            },
            { title: "1-过会待发行日历" },
            { title: "客户" }
        ]
    };
    ref: ScrollView;
    closePopover = () => {
        this.setState({ isVisible: false });
    }
    render() {
        let { showBorder } = this.state;
        return (

            <View
                style={{
                    flex: 1,
                    marginTop: 30,
                    borderTopColor: "#ebebeb",
                    borderTopWidth: 1
                }}
            >
                <CustomTabHeader
                    onPress={item => {
                        console.log(item);
                    }}
                    bodyStyle={{ marginTop: 52 }}
                    renderTabContent={(index, props) => {
                        if (index === 0) {
                            return (
                                <CheckBoxItem
                                    onChange={(el, checkboxIndex) => {
                                        const item: any = this.state.list[index];
                                        item.title = el;
                                        this.state.list.splice(index, item);
                                        this.setState({
                                            list: this.state.list
                                        });
                                    }}
                                    list={["2020年01月", "2020年02月"]}
                                    tabToggleModal={props.toggle}
                                />
                            );
                        }
                        if (index === 1) {
                            return (
                                <CheckBoxItem
                                    list={["1-过会待发行日历", "2-已发行日历"]}
                                    tabToggleModal={props.toggle}
                                />
                            );
                        }
                        return null;
                    }}
                    list={this.state.list}
                >
                    <ScrollView ref={ref => this.ref = ref} style={[styles.container, { backgroundColor: "#fff" }]}>

                        {
                            Array(4).fill(0).map((item, i) => {
                                return <DayItem fromRect={(target) => {
                                    this.setState({
                                        fromRect: target
                                    }, () => {
                                        this.setState({
                                            isVisible: true,
                                        })
                                    })
                                }} key={i} getHeaderPosition={(layout) => {
                                    this.headersPosition[i] = layout;
                                }} />
                            })
                        }
                        <ListPanelHeader
                            title={"table base —— " + (showBorder ? "线条" : "无线条")}
                            footer={
                                <Switch
                                    value={showBorder}
                                    onValueChange={() => {
                                        this.setState({ showBorder: !showBorder });
                                    }}
                                />
                            }
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    // alert("...");
                                    this.headersPosition[1] && this.ref.scrollTo({ y: this.headersPosition[1].y, animated: true })
                                }}
                            >
                                <IBText size={15} lineHeight={19} color={"#333"}>
                                    店家我
                </IBText>
                            </TouchableOpacity>

                        </ListPanelHeader>
                        <Popover
                            visible={this.state.isVisible}
                            fromRect={this.state.fromRect} onClose={this.closePopover}>
                            <View style={{ height: 280, width: 350 }}>

                                <Text>I'm the content of this popover!</Text>
                            </View>
                        </Popover>
                    </ScrollView>
                </CustomTabHeader>
            </View>
        );
    }
}

interface CustomHomeTabHeaderProps {
    tabHeaderHeight?: number; // tab的高度
    tabContentHeight?: number; // tab 内容最大高度
    activeIndex?: number; // 当前激活的tab
    zIndexBase?: number; // z-index的值
    containerHeight?: number; // 容器高度
    tabWrapperStyle?: ViewStyle; //
    tabContentWrapperStyle?: ViewStyle; //
    tabContainerStyle?: ViewStyle; //
    tabStyle?: ViewStyle; //
    bodyStyle?: ViewStyle; //
    tabContainer?: ViewStyle; //
    onPress?: (index: number) => void; //
    list: Array<{ title: string }>; //
    renderTabContent?: (index: number, props: any) => React.ReactNode; //
    renderTabItem?: (el: any, index: number, active: boolean) => React.ReactNode;
    renderCustomItem?: (index: number) => React.ReactNode;
    collapsed?: boolean;
}
/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
export class CustomTabHeader extends React.Component<
    CustomHomeTabHeaderProps,
    any
    > {
    static defaultProps = {
        tabHeaderHeight: 47,
        tabContentHeight: 300,
        activeIndex: -1,
        zIndexBase: 1,
        containerHeight: Dimensions.get("window").height
    };
    constructor(props: CustomHomeTabHeaderProps) {
        super(props);
        this.state = {
            collapsed: props.collapsed,
            rotateValue: new Animated.Value(props.collapsed ? 0 : 1),
            activeIndex: props.activeIndex
        };
    }
    handlePress = (index, updateTab = true) => {
        const { onPress } = this.props;
        updateTab && onPress && onPress(index);
        updateTab &&
            index !== this.state.activeIndex &&
            this.setState({ activeIndex: index });
    };
    toggle = () => {
        let willDo = !this.state.collapsed;
        this.setState({ collapsed: willDo });
        Animated.timing(
            // Animate value over time
            this.state.rotateValue, // The value to drive
            {
                toValue: willDo ? 0 : 1, // Animate to final value of 1
                duration: 180, //从0到1的时间
                easing: Easing.out(Easing.linear) //线性变化，匀速旋转
            }
        ).start();
    };
    renderCommItem = (el, index) => {
        let { activeIndex, rotateValue } = this.state;
        return (
            <TouchableWithoutFeedback
                key={index}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                onPress={() => {
                    this.handlePress(index);
                    if (activeIndex != index) {
                        if (rotateValue._value == 1) {
                            this.toggle();
                        }
                        this.setState({
                            activeIndex: index
                        });
                    } else {
                        this.toggle();
                    }
                }}
            >
                <View style={{ position: "relative" }}>
                    <View style={{ paddingVertical: 12 }}>
                        <IBText
                            size={16}
                            color={index === activeIndex ? "red" : "#666"}
                            lineHeight={23}
                        >
                            {el.title}
                        </IBText>
                    </View>
                    <View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            flexDirection: "row",
                            justifyContent: "center"
                        }}
                    >
                        {index === activeIndex && (
                            <View
                                style={{
                                    width: 30,
                                    height: 2,
                                    backgroundColor: "red"
                                }}
                            />
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    renderCustomItem = (el, index) => {
        let { rotateValue } = this.state;
        return (
            <TouchableWithoutFeedback
                style={{}}
                hitSlop={{ top: 15, bottom: 15, left: 20, right: 20 }}
                onPress={() => {
                    this.toggle();
                    this.handlePress(index, false);
                }}
            >
                <Animated.View
                    style={{
                        position: "relative",
                        transform: [
                            {
                                rotate: rotateValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ["0deg", "-180deg"]
                                })
                            }
                        ]
                    }}
                >
                    <IBText size={13} lineHeight={15} color={"#222"}>
                        ↑
          </IBText>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    };
    render() {
        const {
            list = [],
            children,
            tabWrapperStyle,
            tabContainerStyle,
            tabStyle,
            containerHeight,
            zIndexBase,
            bodyStyle,
            tabContentWrapperStyle,
            renderTabContent,
            renderTabItem,
            tabHeaderHeight,
            renderCustomItem,
            tabContentHeight,
            tabContainer
        } = this.props;
        let { activeIndex, collapsed, rotateValue } = this.state;
        return (
            <View style={{ flex: 1, overflow: "hidden" }}>
                <View style={[{ flex: 1, marginTop: tabHeaderHeight }, bodyStyle]}>
                    {children}
                </View>
                <View
                    style={[
                        {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            zIndex: zIndexBase + 10
                        },
                        tabWrapperStyle
                    ]}
                >
                    <View
                        style={[
                            {
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-around",
                                position: "relative",
                                backgroundColor: "white",
                                shadowColor: "rgba(26, 26, 26, 0.06)",
                                shadowOpacity: 1,
                                shadowOffset: { width: 0, height: 5 },
                                elevation: Platform.OS === "android" ? 1 : 12
                            },
                            tabContainer
                        ]}
                    >
                        {list.map((el, index) => {
                            return renderTabItem
                                ? renderTabItem(el, index, activeIndex === index)
                                : this.renderCommItem(el, index);
                        })}
                        {renderCustomItem
                            ? renderCustomItem(activeIndex)
                            : this.renderCustomItem(null, list.length)}
                    </View>
                </View>
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            height: containerHeight,
                            width: "100%",
                            top: 0,
                            bottom: 0,
                            flexDirection: "column",
                            zIndex: zIndexBase + 5,
                            // backgroundColor: 'rgba(26, 26, 26, 0.6)',
                            transform: [
                                {
                                    translateY: rotateValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [tabHeaderHeight, -containerHeight]
                                    })
                                }
                            ]
                        },
                        tabContentWrapperStyle
                    ]}
                >
                    <View
                        style={[
                            {
                                backgroundColor: "white",
                                shadowColor: "rgba(26, 26, 26, 0.06)",
                                shadowOpacity: 1,
                                shadowOffset: { width: 0, height: 10 },
                                elevation: Platform.OS === "android" ? 1 : 20
                            },
                            tabContainerStyle
                        ]}
                    >
                        <View style={tabStyle}>
                            {list.map((el, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={{ display: activeIndex == index ? "flex" : "none" }}
                                    >
                                        {renderTabContent &&
                                            renderTabContent(this.state.activeIndex, {
                                                toggle: this.toggle
                                            })}
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                    {collapsed && (
                        <TouchableOpacity
                            style={{
                                flex: 1
                                // backgroundColor: "yellow"
                            }}
                            activeOpacity={1}
                            onPress={this.toggle}
                        />
                    )}
                </Animated.View>
            </View>
        );
    }
}

class CheckBoxItem extends React.Component<any, any> {
    static defaultProps = {
        TAB_HEIGHT: 50
    };

    constructor(props: any) {
        super(props);
        this.state = {
            displayIndex: -1
        };
    }
    render() {
        let { displayIndex } = this.state;
        let { list, tabToggleModal, currentTabIndex, onChange } = this.props;
        return (
            <View style={{}}>
                {list.map((el, index) => {
                    return (
                        <CheckboxItem
                            key={index}
                            checkBoxImg={checkBoxImgs}
                            iconContainer={{ paddingRight: 0, paddingLeft: 6 }}
                            label={el}
                            checked={index === displayIndex}
                            style={{ paddingVertical: 10 }}
                            onPress={() => {
                                this.setState(
                                    {
                                        displayIndex: index
                                    },
                                    () => {
                                        onChange && onChange(el, index);
                                        setTimeout(() => {
                                            tabToggleModal && tabToggleModal();
                                        }, 80);
                                    }
                                );
                            }}
                        />
                    );
                })}
            </View>
        );
    }
}

class DayItem extends React.PureComponent<any, any> {
    color = {

    }
    constructor(props: any) {
        super(props);
    }

    componentWillMount() { }
    render() {
        const { getHeaderPosition, fromRect } = this.props;
        return (
            <View onLayout={(e) => {
                getHeaderPosition && getHeaderPosition(e.nativeEvent.layout);
            }} style={{}}>
                <View style={{ flexDirection: "row" }}>
                    {Array(5)
                        .fill(5)
                        .map((el, index) => {
                            return (
                                <View
                                    key={index}
                                    style={[
                                        {
                                            flex: 1,
                                            paddingVertical: 5,
                                            width: "20%",
                                            borderTopWidth: StyleSheet.hairlineWidth,
                                            borderTopColor: "#EBEBEB"
                                        },
                                        index != 0
                                            ? {
                                                borderLeftWidth: StyleSheet.hairlineWidth,
                                                borderLeftColor: "#EBEBEB"
                                            }
                                            : null
                                    ]}
                                >
                                    <IBText size={11} center lineHeight={13} color={"#999999"}>
                                        周一
                  </IBText>
                                    <IBText size={11} center lineHeight={13} color={"#999999"}>
                                        （02-10）
                  </IBText>
                                </View>
                            );
                        })}
                </View>
                <View style={{ borderTopColor: '#FF3355', borderTopWidth: StyleSheet.hairlineWidth, borderBottomColor: '#3399FF', borderBottomWidth: StyleSheet.hairlineWidth }}>
                    {[{ color: '#FF3355' }, { color: '#FF3355' }, { color: '#3399FF' }]
                        .map((el, i) => {
                            return (
                                <View key={i} style={[{
                                    flexDirection: "row",

                                }, i !== 0 && {
                                    borderTopColor: el.color,
                                    borderTopWidth: StyleSheet.hairlineWidth,
                                }]}>
                                    {Array(5)
                                        .fill({

                                        })
                                        .map((item, index) => {
                                            const desc = '招商局蛇口工业区控股股份有限公司'.slice(0, Math.ceil(Math.random() * '招商局蛇口工业区控股股份有限公司'.length));
                                            const name = '20招商蛇口MTN001'.slice(0, Math.ceil(Math.random() * '20招商蛇口MTN001'.length))
                                            return (
                                                <View
                                                    key={index}
                                                    style={[
                                                        {
                                                            flex: 1,
                                                            padding: 8,
                                                            width: "20%"
                                                        },
                                                        index != 0
                                                        && {
                                                            borderLeftWidth: StyleSheet.hairlineWidth,
                                                            borderLeftColor: el.color,
                                                        }
                                                    ]}
                                                >

                                                    <TouchableOpacity onPress={(e) => {
                                                        const handle = findNodeHandle(e.target)

                                                        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                                                            console.log('相对父视图位置x:', x);
                                                            console.log('相对父视图位置y:', y);
                                                            console.log('组件宽度width:', width);
                                                            console.log('组件高度height:', height);
                                                            console.log('距离屏幕的绝对位置x:', pageX);
                                                            console.log('距离屏幕的绝对位置y:', pageY);
                                                            const { width: w, height: h } = Dimensions.get('screen')
                                                            console.log('屏幕宽度:', w);
                                                            console.log('屏幕高度:', h);
                                                            fromRect && fromRect({
                                                                x: pageX, y: pageY, width: width, height: height
                                                            })
                                                        })
                                                        // console.log(e.target..pageX,e.pageY);
                                                    }}>


                                                        <View style={{ height: 34 }}>
                                                            <IBText
                                                                size={12}
                                                                lineHeight={17}
                                                                numberOfLines={2}
                                                                color={el.color}
                                                            >
                                                                {name}
                                                            </IBText>
                                                        </View>
                                                        <View style={{ flex: 1 }}>

                                                            <View style={{}}>
                                                                <IBText
                                                                    size={10}
                                                                    numberOfLines={3}
                                                                    lineHeight={14}
                                                                    color={"#807375"}
                                                                >
                                                                    {desc}
                                                                </IBText>
                                                            </View>
                                                            <View style={{}}>
                                                                <IBText
                                                                    size={10}
                                                                    numberOfLines={1}
                                                                    lineHeight={14}
                                                                    color={"#B3A1A4"}
                                                                >
                                                                    还有9项…
                          </IBText>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            );
                                        })}
                                </View>
                            );
                        })}
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
