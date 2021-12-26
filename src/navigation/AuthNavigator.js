import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignUpScreen from '../screens/SignUp';
import VerifyOTPScreen from '../screens/VerifyOTP';
import SignInScreen from '../screens/SignIn';
import TermOfUseScreen from '../screens/TermOfUse';
import ForgotPasswordScreen from '../screens/ForgotPassword';

const {Navigator, Screen} = createStackNavigator();

export default () => (
  <Navigator
    initialRouteName="Welcome"
    screenOptions={{
      headerShown: false,
    }}>
    <Screen name="SignIn" component={SignInScreen} />
    <Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Screen name="TermOfUse" component={TermOfUseScreen} />
    <Screen name="SignUp" component={SignUpScreen} />
    <Screen name="VerifyOTP" component={VerifyOTPScreen} />
  </Navigator>
);
