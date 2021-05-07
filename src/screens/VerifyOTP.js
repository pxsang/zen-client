import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../components/Header';
import Text from '../components/Text';
import OTP from '../components/OTP';
import GhostButton from '../components/GhostButton';
import Button from '../components/Button';
import { Input, Tab, TabView, Select, SelectItem, Datepicker, Icon } from '@ui-kitten/components';

const {width, height} = Dimensions.get('screen');

const VerifyOTP = props => {
  const {navigation} = props;
  const safeArea = useSafeAreaInsets();

  return (
    <>
      <Header title="Welcome to a world of Health & Wellness" />
      <View style={{
        ...StyleSheet.absoluteFillObject,
        top: height / 4,
        padding: 20,
        paddingBottom: safeArea.bottom > 20 ? safeArea.bottom : 20,
        flex: 1,
      }}>
        <View style={{
          backgroundColor: '#FEF3F3',
          borderRadius: 30,
          flex: 1,
          padding: 20,
        }}>
          <Text size={12} color="#2E384D">Phone Verification</Text>
          <Text bold size={24} color="#2E384D">Enter your OTP code</Text>
          <View style={{ paddingVertical: 20 }}>
            <Text>Enter the 4-digit code sent to you at +84 0909074793.
              <Text bold color="#F18C8E"> Did you enter the correct number?</Text>
            </Text>
            <View style={styles.formContainer}>
              <OTP
                autoFocus
                isNumberInput
                length={4}
              />
              <View>
                <GhostButton>
                  <View>
                    <View style={styles.resendContainer}>
                      <Text>Resend Code in </Text>
                      <Text bold>10 seconds</Text>
                    </View>
                  </View>
                </GhostButton>
              </View>
            </View>
            <Button
              icon="arrow-forward-outline"
              onPress={() => navigation.navigate('Root')}
            >
              Continue
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  formContainer: {
    paddingVertical: 20,
  },
  otpContainer: {
    marginVertical: 40,
  },
  resendContainer: {
    flexDirection: 'row',
  },
});
