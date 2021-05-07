import React from 'react';
import {View, StyleSheet, ScrollView, Platform, Dimensions, TouchableOpacity, Linking} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Layout, Button as UIButton, Icon} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import Header from '../components/Header3';
import theme from '../constants/theme';

const {width, height} = Dimensions.get('screen');

const Settings = props => {
  return (
    <>
      <Header title="Settings" {...props} />
      <View style={{
        ...StyleSheet.absoluteFillObject,
        top: height / 4,
        flex: 1,
        paddingTop: 30,
      }}>
      <Layout style={[styles.container]}>
        <View
          style={styles.content}
        >
          <Text bold size={24} style={{ textAlign: 'center' }}>Coming Soon</Text>
        </View>
      </Layout>
      </View>
    </>
  )
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 64,
    borderTopRightRadius: 64,
  },
  content: {
    marginTop: 70,
    flex: 1,
    paddingHorizontal: 20,
  },
});
