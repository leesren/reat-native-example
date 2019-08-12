import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Appbar } from 'react-native-paper';
import ExampleList, { examples } from './ExampleList';

const routes = Object.keys(examples)
  .map(id => ({ id, item: examples[id] }))
  .reduce((acc, { id, item }) => {
    const Comp = item;
    const Screen = (props: any) => <Comp {...props} />;

    Screen.navigationOptions = (props: any) => ({
      header: (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => props.navigation.goBack()} />
          <Appbar.Content title={(Comp as any).title} />
          <Appbar.Action icon="message" onPress={() => {}} />
        </Appbar.Header>
      ),
      ...(typeof Comp.navigationOptions === 'function'
        ? Comp.navigationOptions(props)
        : Comp.navigationOptions)
    });

    return {
      ...acc,
      [id]: { screen: Screen }
    };
  }, {});

export default createStackNavigator(
  {
    home: { screen: ExampleList },
    // ...examples,
    ...routes
  },
  {
    defaultNavigationOptions: ({ navigation }: any) => ({
      gestureResponseDistance: {
        horizontal: 45
      },
      header: (
        <Appbar.Header>
          <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
          <Appbar.Content title="Examples" />
        </Appbar.Header>
      )
    })
  }
);
