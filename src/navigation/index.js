import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/Splash';
import SignUpScreen from '../screens/SignUp';
import VerifyOTPScreen from '../screens/VerifyOTP';
import SignInScreen from '../screens/SignIn';
import TermOfUseScreen from '../screens/TermOfUse';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import NewPasswordScreen from '../screens/NewPassword';

import MainNavigator from './MainNavigator';

export default () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Root" component={MainNavigator} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="TermOfUse" component={TermOfUseScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
  </Stack.Navigator>
);
