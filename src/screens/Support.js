import React from 'react';
import {View, StyleSheet, ScrollView, Platform, Dimensions, TouchableOpacity, Linking} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Layout, Button as UIButton, Icon} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import Header from '../components/Header3';
import theme from '../constants/theme';

const {width, height} = Dimensions.get('screen');

const Support = props => {
  return (
    <>
      <Header title="Support" {...props} />
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
          <TouchableOpacity>
          <View style={{
            padding: 25,
            borderRadius: 12,
            backgroundColor: 'white',
            shadowColor: '#303030',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 10,
            marginBottom: 40,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Icon
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 15,
                }}
                fill='#47D1C3'
                name='message-square-outline'
              />
              <Text semiBold size={16}>Chat with Therapist Services HQ</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${'0981346304'}`)}>
          <View style={{
            padding: 25,
            borderRadius: 12,
            backgroundColor: 'white',
            shadowColor: '#303030',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 10,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Icon
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 15,
                }}
                fill='#47D1C3'
                name='phone-outline'
              />
              <Text semiBold size={16}>Call us (8 AM - 5 PM)</Text>
            </View>
          </View>
        </TouchableOpacity>
        </View>
      </Layout>
      </View>
    </>
  )
}

export default Support;

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