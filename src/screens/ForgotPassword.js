import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';
import GhostButton from '../components/GhostButton';
import { Input, Tab, TabView, Select, SelectItem, Datepicker, Icon } from '@ui-kitten/components';

import theme from '../constants/theme';

const {width, height} = Dimensions.get('screen');

const ForgotPassword = () => {
  const renderCountryCode = () => (
    <View style={styles.countryCodeContainer}>
      <Image source={require('../assets/icons/azerbaijan.png')} style={{ width: 24, height: 16, resizeMode: 'contain', marginHorizontal: 5 }} />
      <Text style={styles.countryCode}>+84</Text>
    </View>
  );

  return (
    <>
      <Header title="Forgot Password" />
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
          <Text size={12} color="#2E384D">Forgot Password?!</Text>
          <Text bold size={24} color="#2E384D">Don’t worry!</Text>
          <View style={{ paddingVertical: 20 }}>
            <View style={styles.formContainer}>
              <Input
                keyboardType="phone-pad"
                placeholder="Enter your phone number"
                accessoryLeft={renderCountryCode}
                size="large"
                textStyle={{
                  paddingVertical: 3,
                }}
                style={{
                  borderRadius: 12,
                }}
              />
              <View style={{ marginTop: 20 }}>
                <GhostButton>
                  <View>
                    <View style={styles.resendContainer}>
                      <Text>
                        <Text>No problem? </Text>
                        <Text bold>Sign In</Text>
                      </Text>
                    </View>
                  </View>
                </GhostButton>
              </View>
            </View>
            <View>
              <Button
                icon="arrow-forward-outline"
              >
                Continue
              </Button>
              <View style={{ alignItems: 'center' }}>
                <GhostButton>
                  Terms & Conditions
                </GhostButton>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: theme.color.border,
  },
  countryCodeIcon: {
    width: 24,
    height: 16,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  countryCode: {
    marginLeft: 5,
    fontSize: 18,
  },
});
