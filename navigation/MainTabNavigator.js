import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import GamesScreen from '../screens/GamesScreen';
import StatsScreen from '../screens/StatsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const GamesStack = createStackNavigator(
  {
    Games: GamesScreen,
  },
  config
);

GamesStack.navigationOptions = {
  tabBarLabel: 'Jogos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-football' : 'md-football'} />
  ),
};

GamesStack.path = '';

const StatsStack = createStackNavigator(
  {
    Stats: StatsScreen,
  },
  config
);

StatsStack.navigationOptions = {
  tabBarLabel: 'Estatísticas',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-stats' : 'md-stats'} />
  ),
};

StatsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  GamesStack,
  StatsStack,
});

tabNavigator.path = '';

export default tabNavigator;
