import * as React from "react";
import { FlatList, View, SectionList, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { List, Divider, withTheme, Theme } from "react-native-paper";
import ActivityIndicatorExample from "./Examples/ActivityIndicatorExample";

import AppbarExample from "./Examples/AppbarExample";
import AvatarExample from "./Examples/AvatarExample";
import BadgeExample from "./Examples/BadgeExample";
import BannerExample from "./Examples/BannerExample";
import BottomNavigationExample from "./Examples/BottomNavigationExample";
import ButtonExample from "./Examples/ButtonExample";
import CardExample from "./Examples/CardExample";
import CheckboxExample from "./Examples/CheckboxExample";
import ChipExample from "./Examples/ChipExample";
import DataTableExample from "./Examples/DataTableExample";
import DialogExample from "./Examples/DialogExample";
import DividerExample from "./Examples/DividerExample";
import FABExample from "./Examples/FABExample";
import IconButtonExample from "./Examples/IconButtonExample";
import ListAccordionExample from "./Examples/ListAccordionExample";
import ListSectionExample from "./Examples/ListSectionExample";
import MenuExample from "./Examples/MenuExample";
import ProgressBarExample from "./Examples/ProgressBarExample";
import RadioButtonExample from "./Examples/RadioButtonExample";
import RadioButtonGroupExample from "./Examples/RadioButtonGroupExample";
import SearchbarExample from "./Examples/SearchbarExample";
import SnackbarExample from "./Examples/SnackbarExample";
import SurfaceExample from "./Examples/SurfaceExample";
import SwitchExample from "./Examples/SwitchExample";
import TextExample from "./Examples/TextExample";
import TextInputExample from "./Examples/TextInputExample";
import ToggleButtonExample from "./Examples/ToggleButtonExample";
import TouchableRippleExample from "./Examples/TouchableRippleExample";
import { config as TabsExampleConfig } from "./Examples/scroll-tabs";
import { config as FormConfig } from "./Examples/form";
import { config as DraftConfig } from "./Examples/draft";

type Props = {
  theme: Theme;
  navigation: any;
};
export let initialRouteName = "";
// initialRouteName = "AddressEdit";
export const examples1 = {
  form: {
    title: "表单",
    data: {
      ...FormConfig,
    },
    icon: "menu",
  },
  draft: {
    title: "底稿",
    data: {
      ...DraftConfig,
    },
    icon: "menu",
  },
  base: {
    title: "基础组件",
    data: {
      activityIndicator: ActivityIndicatorExample,
      ...TabsExampleConfig,
      appbar: AppbarExample,
      avatar: AvatarExample,
      badge: BadgeExample,
      banner: BannerExample,
      bottomNavigation: BottomNavigationExample,
      button: ButtonExample,
      card: CardExample,
      checkbox: CheckboxExample,
      chip: ChipExample,
      dataTable: DataTableExample,
      dialog: DialogExample,
      divider: DividerExample,
      fab: FABExample,
      iconButton: IconButtonExample,
      listAccordion: ListAccordionExample,
      listSection: ListSectionExample,
      menu: MenuExample,
      progressbar: ProgressBarExample,
      radio: RadioButtonExample,
      radioGroup: RadioButtonGroupExample,
      searchbar: SearchbarExample,
      snackbar: SnackbarExample,
      surface: SurfaceExample,
      switch: SwitchExample,
      text: TextExample,
      textInput: TextInputExample,
      toggleButton: ToggleButtonExample,
      touchableRipple: TouchableRippleExample,
    },
    icon: "menu",
  },
  options: {
    title: "操作反馈",
    data: {},
    icon: "menu",
  },
  nav: {
    title: "导航相关",
    data: {},
    icon: "menu",
  },
  search: {
    title: "搜索相关",
    data: {},
    icon: "menu",
  },
  layer: {
    title: "层级相关",
    data: {},
    icon: "menu",
  },
};

export const examples = Object.keys(examples1).reduce((acc, current) => {
  let scene = examples1[current];
  let subScene = {};
  Object.keys(scene.data).map((el) => {
    if (scene.data[el] && !scene.data[el].page) {
      subScene = { ...subScene, [el]: scene.data[el] };
    } else {
      subScene = {
        ...subScene,
        [el]: scene.data[el].page,
        ...scene.data[el].data,
      };
    }
  });
  return Object.assign(acc, subScene);
}, {});

class ExampleList extends React.Component<Props> {
  static navigationOptions = {
    title: "Examples",
  };
  state = {
    expanded: -1,
  };

  _handlePress = (i) => {
    this.setState({ expanded: i });
  };

  _renderItem = ({ item, index, section }: any) => (
    <List.Item
      title={item.data.title}
      onPress={() => this.props.navigation.navigate(item.id)}
    />
  );
  _renderItem2 = (item, index) => (
    <List.Section key={index}>
      <List.Accordion
        title={item.title}
        expanded={this.state.expanded === index}
        onPress={() => {
          this._handlePress(this.state.expanded === index ? -1 : index);
        }}
      >
        {Object.keys(item.data).map((id, i) => {
          return (
            <List.Item
              key={i}
              title={id}
              // right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {
                this.props.navigation.navigate(id);
              }}
            />
          );
        })}
      </List.Accordion>
    </List.Section>
  );

  _keyExtractor = (item: { id: string }) => item.id;

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    return (
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}
        style={{ flex: 1, backgroundColor: "#f2f2f2" }}
      >
        {Object.keys(examples1).map((el, index) => {
          return this._renderItem2(examples1[el], index);
        })}
      </ScrollView>
    );
  }
}

export default withTheme(ExampleList);
