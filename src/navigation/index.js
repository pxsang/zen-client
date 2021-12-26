import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from '../screens/Splash';
import SignUpScreen from '../screens/SignUp';
import VerifyOTPScreen from '../screens/VerifyOTP';
import SignInScreen from '../screens/SignIn';
import TermOfUseScreen from '../screens/TermOfUse';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import NewPasswordScreen from '../screens/NewPassword';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import LoadingScreen from '../screens/Loading';

import {setFirstTime} from '../redux/actions/app';
import {getProfile} from '../redux/actions/user';

export default () => {
  const dispatch = useDispatch();
  const App = useSelector(state => state.App);
  const User = useSelector(state => state.User);
  let [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const isFirstTimeValue = await AsyncStorage.getItem('isFirstTime');
        if (!isFirstTimeValue) {
          dispatch(setFirstTime(true));
        } else {
          dispatch(setFirstTime(false));
        }
        setLoaded(true);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (User.loggedIn) {
      dispatch(getProfile());
    }
  }, [User.loggedIn, dispatch]);

  if (!loaded) return null;

  return (
    <NavigationContainer>
      <RootNavigator
        isFirstTime={App.isFirstTime}
        loggedIn={User.loggedIn}
        sessionStarted={User.sessionStarted}
      />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator();

const RootNavigator = ({isFirstTime, loggedIn, sessionStarted}) => {
  const renderScreen = () => {
    if (isFirstTime) {
      return <Stack.Screen name="Splash" component={SplashScreen} />;
    }
    if (!loggedIn) {
      return <Stack.Screen name="Auth" component={AuthNavigator} />;
    } else if (!sessionStarted) {
      return <Stack.Screen name="Loading" component={LoadingScreen} />;
    } else {
      return <Stack.Screen name="Root" component={MainNavigator} />;
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {renderScreen()}
    </Stack.Navigator>
  );
};
// (
//   <Stack.Navigator
//     screenOptions={{
//       headerShown: false,
//     }}>
//     <Stack.Screen name="Splash" component={SplashScreen} />
//     <Stack.Screen name="Root" component={MainNavigator} />
//     <Stack.Screen name="SignIn" component={SignInScreen} />
//     <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
//     <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//     <Stack.Screen name="TermOfUse" component={TermOfUseScreen} />
//     <Stack.Screen name="SignUp" component={SignUpScreen} />
//     <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
//   </Stack.Navigator>
// );
