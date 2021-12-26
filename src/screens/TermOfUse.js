import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';
import GhostButton from '../components/GhostButton';
import { Input, Tab, TabView, Select, SelectItem, Datepicker, Icon } from '@ui-kitten/components';

const {width, height} = Dimensions.get('screen');

const SignIn = props => {
  return (
    <>
      <Header {...props} title="Terms of Use" />
      <View style={{
        ...StyleSheet.absoluteFillObject,
        top: height / 4,
        flex: 1,
        paddingTop: 20,
      }}>
        <View style={{
          backgroundColor: '#FEF3F3',
          borderRadius: 64,
          flex: 1,
          padding: 40,
        }}>
          <View style={{ paddingTop: 20 }}>
            <View style={{ marginBottom: 30 }}>
              <Text>Creating Terms of Use is an essential way
to protect your company’s legal interests,
manage the use of your website or app,
and promote your business as a
professional and trustworthy
organization.</Text>
            </View>
            <View style={{ marginBottom: 30 }}>
              <Text>But it’s not easy to create a Terms of Use
agreement that is clear, legally binding,
and relevant to your business.
</Text>
            </View>
            <View>
              <Text>We’re going to talk you through
everything you need to include in your
Terms of Use agreement to make sure it’s
an effective, useful, and professional-
looking legal agreement.</Text>
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
