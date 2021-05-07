import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';
import GhostButton from '../components/GhostButton';
import { Input, Tab, TabView, Select, SelectItem, Datepicker, Icon } from '@ui-kitten/components';

import theme from '../constants/theme';

const {width, height} = Dimensions.get('screen');

const NewPassword = () => {
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
          <Text bold size={24} color="#2E384D">Enter your new password</Text>
          <View style={{ paddingVertical: 20 }}>
            <View style={styles.formContainer}>
              <View style={{ marginTop: 20 }}>
                <View style={{ marginBottom: 15 }}>
                  <Input
                    label={<Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>New password</Text>}
                    placeholder="Enter new password"
                  />
                </View>
                <View style={{ marginBottom: 30 }}>
                  <Input
                    label={<Text size={12} color="#8C98A9" style={{fontWeight: '400'}}>Confirm password</Text>}
                    placeholder="Enter confirm password"
                  />
                </View>
              </View>
            </View>
            <View>
              <Button
                icon="arrow-forward-outline"
              >
                Continue
              </Button>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default NewPassword;

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
