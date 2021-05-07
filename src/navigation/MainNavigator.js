import React, {useEffect, useState} from 'react';
import {Layout} from '@ui-kitten/components';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import HistoryScreen from '../screens/History';
import RideDetailScreen from '../screens/RideDetail';
import RewardsScreen from '../screens/Rewards';
import SupportScreen from '../screens/Support';
import SettingsScreen from '../screens/Settings';

import Drawer from '../components/Drawer';
import Text from '../components/Text';

const {Navigator, Screen} = createStackNavigator();

export default () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Root" component={DrawerNavigation} />
      <Screen name="RideDetail" component={RideDetailScreen} />
      <Screen name="Profile" component={ProfileScreen} />
    </Navigator>
  );
};

const {
  Navigator: DrawerNavigator,
  Screen: DrawerScreen,
} = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <DrawerNavigator
      drawerStyle={{ width: 330 }}
      drawerContent={props => <Drawer {...props} />}>
      <DrawerScreen name="Home" component={HomeScreen} />
      <DrawerScreen name="Settings" component={SettingsScreen} />
      <DrawerScreen name="Support" component={SupportScreen} />
      <DrawerScreen name="Rewards" component={RewardsScreen} />
      <DrawerScreen name="History" component={HistoryScreen} />
    </DrawerNavigator>
  );
};

const ComingSoon = (props) => {
  return (
    <>
      <Layout style={{
        flex: 1,
        alignItems: 'center',
        paddingVertical: 40,
      }}>
        <Text bold size={24}>Coming Soon</Text>
      </Layout>
    </>
  );
};
