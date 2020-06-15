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
import { Table, CheckboxItem, checkBoxImgs, IBText, Line } from "../../widgets";
import { ListPanelHeader } from "../components";
// import Popover from '../../widgets/base/Popover';
// import Popover from 'react-native-popover-view';
import { Popover } from "react-native-modal-popover";
import { dataBook } from "./mock-data/bk";
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
            { title: "1-过会待发行日历" }
        ]
    };
    ref: ScrollView;
    closePopover = () => {
        this.setState({ isVisible: false });
    };
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
                    renderCustomItem={() => {
                        return <TitleTips />;
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
                    <ScrollView
                        ref={ref => (this.ref = ref)}
                        style={[styles.container, { backgroundColor: "#fff" }]}
                    >
                        <DayItem
                            fromRect={target => {
                                this.setState(
                                    {
                                        fromRect: target
                                    },
                                    () => {
                                        this.setState({
                                            isVisible: true
                                        });
                                    }
                                );
                            }}
                            list={dataBook}
                            getHeaderPosition={layout => {
                                // this.headersPosition[i] = layout;
                            }}
                        />
                        <Popover
                            visible={this.state.isVisible}
                            fromRect={this.state.fromRect}
                            onClose={this.closePopover}
                        >
                            <View
                                style={{
                                    height: 280,
                                    width: 350,
                                    padding: 10,
                                    borderRadius: 4
                                }}
                            >
                                <View style={{ flex: 1 }}>
                                    <ScrollView style={{ flex: 1 }}>
                                        <IBText size={14} lineHeight={17} color={"#FF3355"}>
                                            20招商蛇口MTN001
                    </IBText>
                                        <IBText size={12} lineHeight={17} color={"#807375"}>
                                            杭州银行股份有限公司
                    </IBText>
                                        <IBText size={12} lineHeight={17} color={"#807375"}>
                                            基础资产：个人住房抵押贷款
                    </IBText>
                                        <IBText size={12} lineHeight={17} color={"#807375"}>
                                            -->优先A-1档，2.17亿，0.89年，(2.5%-3.7%)，AAA/AA+
                    </IBText>
                                        <IBText size={12} lineHeight={17} color={"#807375"}>
                                            -->优先A-2档，18.95亿，3.81年，(2.5%-3.7%)，AAA/AAA
                    </IBText>
                                        <IBText size={12} lineHeight={17} color={"#807375"}>
                                            【簿记】招商银行
                    </IBText>
                                        <IBText size={12} lineHeight={17} color={"#807375"}>
                                            【联主等】平安证券、华泰证券
                    </IBText>
                                    </ScrollView>
                                </View>
                                <Line />
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <TouchableOpacity
                                        style={{ flex: 1, paddingTop: 10, paddingBottom: 5 }}
                                    >
                                        <IBText center size={14} lineHeight={20} color={"#D8B66A"}>
                                            备用模式
                    </IBText>
                                    </TouchableOpacity>
                                    <View
                                        style={{ height: 10, width: 1, backgroundColor: "#ebebeb" }}
                                    ></View>
                                    <TouchableOpacity
                                        style={{ flex: 1, paddingTop: 10, paddingBottom: 5 }}
                                    >
                                        <IBText center size={14} lineHeight={20} color={"#D8B66A"}>
                                            查看项目详情 >
                    </IBText>
                                    </TouchableOpacity>
                                </View>
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

export class DayItem extends React.PureComponent<any, any> {
    color = {};
    constructor(props: any) {
        super(props);
    }

    componentWillMount() { }
    render() {
        const { getHeaderPosition, fromRect, list } = this.props;
        return (
            <View
                onLayout={e => {
                    getHeaderPosition && getHeaderPosition(e.nativeEvent.layout);
                }}
                style={{}}
            >
                {list.map((week, monthIndex) => {
                    const maxWeekItems = Math.max(
                        ...week.map(el => el.issueInfoVoList.length)
                    );
                    return (
                        <View key={monthIndex} style={{}}>
                            <View style={{ flexDirection: 'row' }}>
                                {week.map((items, wIndex) => {
                                    return (
                                        <View key={wIndex} style={{ width: '20%', flex: 1 }}>
                                            <View
                                                style={[
                                                    {
                                                        paddingVertical: 5,
                                                        borderTopWidth: StyleSheet.hairlineWidth,
                                                        borderTopColor: '#EBEBEB',
                                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                                        borderBottomColor: '#EBEBEB'
                                                    },
                                                    wIndex != 0
                                                        ? {
                                                            borderLeftWidth: StyleSheet.hairlineWidth,
                                                            borderLeftColor: '#EBEBEB'
                                                        }
                                                        : null
                                                ]}
                                            >
                                                <IBText
                                                    size={11}
                                                    center
                                                    lineHeight={13}
                                                    color={'#999999'}
                                                >
                                                    {items.week}
                                                </IBText>
                                                <IBText
                                                    size={11}
                                                    center
                                                    lineHeight={13}
                                                    color={'#999999'}
                                                >
                                                    10-22
                          </IBText>
                                            </View>
                                            {items.issueInfoVoList.length === 0 && wIndex === 2 && (
                                                <View style={{ paddingVertical: 20 }}>
                                                    <IBText size={13} lineHeight={15} color={'#666'}>
                                                        暂无数据...
                            </IBText>
                                                </View>
                                            )}
                                            {items.issueInfoVoList
                                                .concat(
                                                    Array(
                                                        maxWeekItems - items.issueInfoVoList.length
                                                    ).fill(null)
                                                )
                                                .map((day, dayIndex) => {
                                                    const desc = '招商局蛇口工业区控股股份有限公司'.slice(
                                                        0,
                                                        Math.ceil(
                                                            Math.random() *
                                                            '招商局蛇口工业区控股股份有限公司'.length
                                                        )
                                                    );
                                                    const name = '20招商蛇口MTN001'.slice(
                                                        0,
                                                        Math.ceil(Math.random() * '20招商蛇口MTN001'.length)
                                                    );
                                                    const bColor = [
                                                        { color: '#FF3355' },
                                                        { color: '#FF3355' },
                                                        { color: '#3399FF' }
                                                    ];
                                                    return (
                                                        <View
                                                            key={dayIndex}
                                                            style={[
                                                                {
                                                                    padding: 8,
                                                                    borderColor: '#FF3355',
                                                                    borderWidth: StyleSheet.hairlineWidth,
                                                                    backgroundColor: 'rgba(255,51,85,0.05)',
                                                                    borderRightWidth: 0,
                                                                    borderTopWidth: 0,
                                                                    height: 102
                                                                }
                                                            ]}
                                                        >
                                                            {!Boolean(day) ? (
                                                                <View style={{}}></View>
                                                            ) : (
                                                                    <TouchableOpacity
                                                                        onPress={e => {
                                                                            const handle = findNodeHandle(e.target);

                                                                            UIManager.measure(
                                                                                handle,
                                                                                (x, y, width, height, pageX, pageY) => {
                                                                                    console.log('相对父视图位置x:', x);
                                                                                    console.log('相对父视图位置y:', y);
                                                                                    console.log('组件宽度width:', width);
                                                                                    console.log('组件高度height:', height);
                                                                                    console.log(
                                                                                        '距离屏幕的绝对位置x:',
                                                                                        pageX
                                                                                    );
                                                                                    console.log(
                                                                                        '距离屏幕的绝对位置y:',
                                                                                        pageY
                                                                                    );
                                                                                    const {
                                                                                        width: w,
                                                                                        height: h
                                                                                    } = Dimensions.get('screen');
                                                                                    console.log('屏幕宽度:', w);
                                                                                    console.log('屏幕高度:', h);
                                                                                    fromRect &&
                                                                                        fromRect({
                                                                                            x: pageX,
                                                                                            y: pageY,
                                                                                            width: width,
                                                                                            height: height
                                                                                        });
                                                                                }
                                                                            );
                                                                            // console.log(e.target..pageX,e.pageY);
                                                                        }}
                                                                    >
                                                                        <View style={{}}>
                                                                            <IBText
                                                                                size={12}
                                                                                lineHeight={17}
                                                                                numberOfLines={2}
                                                                                color={'red'}
                                                                            >
                                                                                {name}
                                                                            </IBText>
                                                                        </View>
                                                                        <View style={{}}>
                                                                            <View style={{}}>
                                                                                <IBText
                                                                                    size={10}
                                                                                    numberOfLines={3}
                                                                                    lineHeight={14}
                                                                                    color={'#807375'}
                                                                                >
                                                                                    {desc}
                                                                                </IBText>
                                                                            </View>
                                                                            <View style={{}}>
                                                                                <IBText
                                                                                    size={10}
                                                                                    numberOfLines={1}
                                                                                    lineHeight={14}
                                                                                    color={'#B3A1A4'}
                                                                                >
                                                                                    还有9项…
                                        </IBText>
                                                                            </View>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                )}
                                                        </View>
                                                    );
                                                })}
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }
}

function TitleTips({ }) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            {[
                {
                    name: "主场",
                    bgColor: "rgba(255,51,85,0.07)",
                    borColor: "rgba(255,51,85,0.5)"
                },
                {
                    name: "客场",
                    bgColor: "rgba(51,153,255,0.1)",
                    borColor: "rgba(51,153,255,0.5)"
                }
            ].map((el, index) => {
                return (
                    <View
                        key={index}
                        style={{
                            marginLeft: index == 0 ? 0 : 8,
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: el.bgColor,
                                width: 12,
                                height: 12,
                                marginRight: 4,
                                borderColor: el.borColor,
                                borderWidth: StyleSheet.hairlineWidth
                            }}
                        ></View>
                        <IBText size={13} lineHeight={15} color={"#333"}>
                            {el.name}
                        </IBText>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default withTheme(Example);
