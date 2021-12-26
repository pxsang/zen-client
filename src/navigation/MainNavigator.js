import React, {useEffect, useState} from 'react';
import _ from 'underscore';
import {Layout} from '@ui-kitten/components';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import UpdateProfileScreen from '../screens/UpdateProfile';
import HistoryScreen from '../screens/History';
import RideDetailScreen from '../screens/RideDetail';
import RewardsScreen from '../screens/Rewards';
import SupportScreen from '../screens/Support';
import SettingsScreen from '../screens/Settings';
import NewPasswordScreen from '../screens/NewPassword';

import Drawer from '../components/Drawer';
import Text from '../components/Text';

const {Navigator, Screen} = createStackNavigator();

export default () => {
  const navigation = useNavigation();
  const UserState = useSelector(state => state.User);

  useEffect(() => {
    if (!_.isEmpty(UserState.userInfo)) {
      if (UserState.nextAction === 'new_password') {
        setTimeout(() => {
          navigation.navigate('NewPassword');
        }, 2000);
      } else {
        navigation.navigate('Root');
      }
    }
  }, [UserState.userInfo, UserState.nextAction, navigation]);

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Root" component={DrawerNavigation} />
      <Screen name="RideDetail" component={RideDetailScreen} />
      <Screen name="Profile" component={ProfileScreen} />
      <Screen name="UpdateProfile" component={UpdateProfileScreen} />
      <Screen name="NewPassword" component={NewPasswordScreen} />
      <Screen name="Settings" component={SettingsScreen} />
      <Screen name="Support" component={SupportScreen} />
      <Screen name="Rewards" component={RewardsScreen} />
      <Screen name="History" component={HistoryScreen} />
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
      drawerStyle={{width: 330}}
      drawerContent={props => <Drawer {...props} />}>
      <DrawerScreen name="Home" component={HomeScreen} />
    </DrawerNavigator>
  );
};

const ComingSoon = props => {
  return (
    <>
      <Layout
        style={{
          flex: 1,
          alignItems: 'center',
          paddingVertical: 40,
        }}>
        <Text bold size={24}>
          Coming Soon
        </Text>
      </Layout>
    </>
  );
};
