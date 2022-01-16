import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import dateformat from 'dateformat';
import {useSelector, useDispatch} from 'react-redux';
import {Layout, Spinner, Icon} from '@ui-kitten/components';

import BookingInfo from '../components/BookingInfo';
import Text from '../components/Text';
import Header from '../components/Header3';
import theme from '../constants/theme';
import {getSessionDetail} from '../redux/actions/session';
import {priceFormat} from '../helpers/display';
import useTranslate from '../hooks/useTranslate';

const {height} = Dimensions.get('screen');

const RideDetail = props => {
  const t = useTranslate();
  const {route} = props;
  const {sessionId} = route.params || {};
  const dispatch = useDispatch();
  const SessionState = useSelector(state => state.Session);
  const {
    historyDetail: {isLoading, data},
  } = SessionState;

  useEffect(() => {
    dispatch(getSessionDetail(sessionId));
  }, [dispatch, sessionId]);

  return (
    <>
      <Header title={t('transaction_detail')} {...props} small hideRightMenu />
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          top: height / 4,
          flex: 1,
          paddingTop: 30,
        }}>
        <Layout style={[styles.container]}>
          {isLoading ? (
            <View style={[theme.block.rowCenter, theme.block.marginTop(20)]}>
              <Spinner />
            </View>
          ) : (
            <>
              <View
                style={{
                  top: -50,
                  paddingHorizontal: 20,
                }}>
                <BookingInfo
                  data={[
                    {
                      label: t('therapist_name'),
                      value: data?.therapist_name || '--',
                    },
                    {
                      label: t('booking_address'),
                      value: data?.client_address,
                    },
                  ]}
                />
              </View>
              <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}>
                <View
                  style={[
                    theme.block.blockMiddleBetween,
                    {
                      paddingBottom: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: theme.color.border,
                      marginBottom: 20,
                    },
                  ]}>
                  <View>
                    <Text color={theme.color.gray}>{t('time')}:</Text>
                    <Text bold size={18}>
                      {t('mins', {
                        mins: data?.request_services[0]?.duration || '--',
                      })}
                    </Text>
                  </View>
                  <View>
                    <Text color={theme.color.gray}>{t('price')}:</Text>
                    <Text bold size={18}>
                      {priceFormat(data?.total_amount)}
                    </Text>
                  </View>
                  <View>
                    <Text color={theme.color.gray}>{t('distance')}:</Text>
                    <Text bold size={18}>
                      2,8 km
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingBottom: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.color.border,
                    marginBottom: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      marginBottom: 15,
                    }}>
                    <Text size={15}>{t('date_and_time')}</Text>
                    <Text size={13}>
                      {dateformat(data?.created_at, 'dd/mm/yyyy hh:MM')}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      marginBottom: 15,
                    }}>
                    <Text size={15}>{t('type_of_massage')}</Text>
                    <Text size={13}>
                      {data?.request_services[0]?.group_service_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      marginBottom: 15,
                    }}>
                    <Text size={15}>{t('special_request')}</Text>
                    <Text size={13}>{data?.note || '--'}</Text>
                  </View>
                </View>
                {/* <View>
                  <Text size={12} color={theme.color.primary}>This session was towards your area you received Guaranteed fee.</Text>
                </View> */}
                <View style={theme.block.rowMiddleCenter}>
                  {Array(5)
                    .fill('')
                    .map((_, index) => (
                      <Icon
                        style={styles.starIcon}
                        fill={
                          index + 1 <= data?.therapist_rating
                            ? '#FAD647'
                            : '#8F9BB3'
                        }
                        name="star"
                      />
                    ))}
                </View>
              </ScrollView>
            </>
          )}
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
  starIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 3,
  },
});
