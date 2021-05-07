import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';
import GhostButton from '../components/GhostButton';
import { Input, Tab, TabView, Select, SelectItem, Datepicker, Icon } from '@ui-kitten/components';

const {width, height} = Dimensions.get('screen');

const SignIn = props => {
  const {navigation} = props;

  return (
    <>
      <Header title="Welcome to a world of Health & Wellness" />
      <View style={{
        ...StyleSheet.absoluteFillObject,
        top: height / 4,
        padding: 20,
        flex: 1,
      }}>
        <View style={{
          backgroundColor: '#FEF3F3',
          borderRadius: 30,
          flex: 1,
          padding: 20,
        }}>
          <Text size={28} color="#2E384D">Sign In</Text>
          <View style={{ paddingTop: 20, flex: 1, justifyContent: 'space-between' }}>
            <View>
              <View style={{ marginBottom: 15 }}>
                <Input
                  label={<Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>Username</Text>}
                  placeholder="My username"
                  style={{
                    borderRadius: 5,
                    fontSize: 13,
                  }}
                />
              </View>
              <Input
                label={<Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>Password</Text>}
                placeholder="Enter your password"
                secureTextEntry
              />
              <GhostButton onPress={() => navigation.navigate('ForgotPassword')}>
                Forgot Password?
              </GhostButton>
              <View style={{ marginBottom: 15 }}>
                <Button icon="arrow-forward-outline" onPress={() => navigation.navigate('Root')}>Login</Button>
                <GhostButton onPress={() => navigation.navigate('SignUp')}>
                  Or Create My Account
                </GhostButton>
              </View>
            </View>
            <View>
              <Text>
                <Text>
                  By continuing, I confirm that i have read & agree to the
                </Text>
                <Text bold> Terms & conditions</Text>
                <Text> and </Text>
                <Text bold>Privacy policy</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default SignIn;

const styles = StyleSheet.create({

});
