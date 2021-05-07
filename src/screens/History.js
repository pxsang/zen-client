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
import Text from '../components/Text';
import Header from '../components/Header3';
import theme from '../constants/theme';

const {width, height} = Dimensions.get('screen');

const HistoryItem = ({navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('RideDetail')}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: theme.color.border,
        paddingBottom: 15,
        borderBottomWidth: 1,
      }}>
        <View style={{
          flexDirection: 'row'
        }}>
          <View style={{
            alignItems: 'center',
            marginRight: 20,
          }}>
            <Text>2:12</Text>
            <View height={5} />
            <View style={{
              width: 35,
              height: 18,
              backgroundColor: '#F2F5F7',
              borderRadius: 9,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text size={11} color="#7F7F7F">AM</Text>
            </View>
          </View>
          <View>
            <Text size={16}>Catriona Gray</Text>
            <View height={5} />
              <Text size={12} color="#797979">Paid by Card</Text>
          </View>
        </View>
        <View>
          <Text size={16}>380,000d</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const Profile = props => {
  return (
    <>
      <Header title="Session & Payment History" {...props} />
      <View style={{
        ...StyleSheet.absoluteFillObject,
        top: height / 4,
        flex: 1,
        paddingTop: 30,
      }}>
        <Layout style={[styles.container]}>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}>
            <View style={{
              paddingHorizontal: 20,
              marginBottom: 20,
            }}>
              <Text size={16} color="#797979">Mon, 01 March 2021</Text>
              <View height={10} />
              <HistoryItem {...props} />
              <View height={15} />
              <HistoryItem {...props} />
            </View>
            <View style={{
              paddingHorizontal: 20,
              marginBottom: 20,
            }}>
              <Text size={16} color="#797979">Mon, 01 March 2021</Text>
              <View height={10} />
              <HistoryItem {...props} />
              <View height={15} />
              <HistoryItem {...props} />
            </View>
          </ScrollView>
        </Layout>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 64,
    borderTopRightRadius: 64,
  },
  content: {
    marginTop: 70,
    flex: 1,
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
