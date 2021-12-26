import React, {useContext} from 'react';
import {StyleSheet, View, ScrollView, Image, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {Layout} from '@ui-kitten/components';
import Button from '../components/Button';
import UserAvatar from '../components/UserAvatar';
import Text from '../components/Text';
import Header from '../components/Header3';
import theme from '../constants/theme';
import {AppContext} from '../providers/AppProvider';
import {phoneNumberFormat, ratingFormat} from '../helpers/display';

const {height} = Dimensions.get('screen');

const Profile = props => {
  const UserState = useSelector(state => state.User);
  const {userInfo} = UserState;
  const {t, logout} = useContext(AppContext);

  return (
    <>
      <Header title={t('my_account')} {...props} small hideRightMenu />
      <View style={styles.container}>
        <Layout style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <UserAvatar style={styles.avatarImage} />
            </View>
          </View>
          <ScrollView
            style={styles.content}
            contentContainerStyle={{paddingBottom: 40}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text bold center style={styles.fullname}>
                {userInfo.name}
              </Text>
              <Text bold center style={styles.rating}>
                {ratingFormat(userInfo?.rating || 0)}
              </Text>
            </View>
            <View style={styles.section}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>{t('phone_number')}</Text>
                <Text style={styles.contactValue}>
                  {phoneNumberFormat(userInfo.phone_number)}
                </Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>{t('email')}</Text>
                <Text style={styles.contactValue}>
                  {userInfo.email || '--'}
                </Text>
              </View>
              <View style={[styles.contactInfo, styles.contactInfoLast]}>
                <Text style={styles.contactLabel}>{t('language')}</Text>
                <Text style={styles.contactValue}>Vietnamese, English</Text>
              </View>
            </View>
            <View style={styles.footer}>
              <Button appearance="rounded" onPress={logout}>
                {t('logout')}
              </Button>
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
    ...StyleSheet.absoluteFillObject,
    top: height / 4,
    flex: 1,
    paddingTop: 30,
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 64,
    borderTopRightRadius: 64,
  },
  content: {
    marginTop: 71,
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
  header: {
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
