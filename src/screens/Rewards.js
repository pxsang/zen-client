import React from 'react';
import {View, StyleSheet, ScrollView, Platform, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Layout, Button as UIButton, Icon} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import Header from '../components/Header3';
import theme from '../constants/theme';

const {width, height} = Dimensions.get('screen');

const Rewards = props => {
  const bookingCount = 3;

  const progressPercent = (bookingCount / 10) * 100;

  return (
    <>
      <Header title="Rewards" {...props} />
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
          <View style={{
            borderWidth: 1,
            borderColor: theme.color.primary,
            borderRadius: 8,
            padding: 15,
          }}>
            <Text bold size={24 }>BOOK 10 GET 1</Text>
            <View height={10} />
            <View style={{ position: 'relative', height: 44, justifyContent: 'center', alignItems: 'center', }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{
                  width: `${progressPercent}%`,
                  height: 8,
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                  backgroundColor: theme.color.primary
                }} />
                <View style={{
                  width: `${100 - progressPercent}%`,
                  height: 8,
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                  backgroundColor: theme.color.border
                }} />
              </View>
              <View style={{
                position: 'absolute',
                top: -18,
                left: `${progressPercent}%`,
                top: '50%',
                width: 44,
                height: 44,
                borderRadius: 16,
                padding: 4,
                backgroundColor: theme.color.primary,
                transform: [{
                  translateX: progressPercent === 0 ? 0 : progressPercent === 100 ? -44 : -22 ,
                }, {
                  translateY: -22,
                }]
              }}>
                <View style={{
                  backgroundColor: 'white',
                  flex: 1,
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Icon
                    name="gift"
                    style={{
                      width: 32,
                      height: 32,
                    }}
                    fill={theme.color.info}
                  />
                </View>
              </View>
            </View>
            <View height={10} />
            <Text>
              <Text semiBold size={18} color={theme.color.primary}>
                {bookingCount}/10
              </Text>
              <Text semiBold> bookings</Text>
            </Text>
          </View>
        </View>
      </Layout>
      </View>
    </>
  )
}

export default Rewards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 64,
    borderTopRightRadius: 64,
  },
  content: {
    marginTop: 70,
    paddingVertical: 0,
    flex: 1,
    paddingHorizontal: 20,
  },
});
