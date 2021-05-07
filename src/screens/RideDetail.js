import React, {useState, useRef} from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Layout, Button as UIButton, Icon} from '@ui-kitten/components';
import Button from '../components/Button';
import BookingInfo from '../components/BookingInfo';
import Text from '../components/Text';
import Header from '../components/Header3';
import theme from '../constants/theme';

const {width, height} = Dimensions.get('screen');

const RideDetail = props => {
  return (
    <>
      <Header title="Transaction detail" {...props} small hideRightMenu />
      <View style={{
        ...StyleSheet.absoluteFillObject,
        top: height / 4,
        flex: 1,
        paddingTop: 30,
      }}>
        <Layout style={[styles.container]}>
          <View style={{
            top: -50,
            paddingHorizontal: 20,
          }}>
            <BookingInfo />
          </View>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}>
            <View style={[theme.block.blockMiddleBetween, {
              paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: theme.color.border, marginBottom: 20
            }]}>
              <View>
                <Text color={theme.color.gray}>Time:</Text>
                <Text bold size={18}>60 min</Text>
              </View>
              <View>
                <Text color={theme.color.gray}>Price:</Text>
                <Text bold size={18}>380,000</Text>
              </View>
              <View>
                <Text color={theme.color.gray}>Distance:</Text>
                <Text bold size={18}>2,8 km</Text>
              </View>
            </View>
            <View style={{ paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: theme.color.border, marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 15 }}>
                <Text size={15}>Date & Time</Text>
                <Text size={13}>28 February 2021 at 9:42am</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 15 }}>
                <Text size={15}>Type of Massage</Text>
                <Text size={13}>Thai Massage</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 15 }}>
                <Text size={15}>Special Request</Text>
                <Text size={13}>Avoid knee area due to injury.</Text>
              </View>
            </View>
            <View>
              <Text size={12} color={theme.color.primary}>This session was towards your area you received Guaranteed fee.</Text>
            </View>
          </ScrollView>
        </Layout>
      </View>
    </>
  );
};

export default RideDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 64,
    borderTopRightRadius: 64,
  },
  content: {
    marginTop: -20,
    paddingHorizontal: 20,
  },
  fullname: {
    fontSize: 23,
  },
  therapist: {
    color: theme.color.gray,
  },
  rating: {
    fontSize: 16,
    color: theme.color.primary,
    marginTop: 5,
  },
  section: {
    borderBottomColor: theme.color.border,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  sectionHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: theme.color.gray,
  },
  summaryValue: {
    marginTop: 5,
    fontSize: 18,
  },
  headerIOS: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    top: -71,
    height: 142,
    zIndex: 99,
  },
  headerAndroid: {
    height: 142,
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  avatarContainer: {
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: '#FFFFFF',
  },
  avatarImage: {
    width: 142,
    height: 142,
    borderRadius: 71,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  contactInfoLast: {
    marginBottom: 0,
  },
  contactLabel: {
    fontSize: 15,
  },
  contactValue: {
    fontSize: 15,
  },
});
