import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Image} from 'react-native';
import {Icon} from '@ui-kitten/components';
import Text from '../../../components/Text';
import Button from '../../../components/Button';

import theme from '../../../constants/theme';

const Arrived = ({onBack, onConfirm}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text semiBold>Therapist has arrived</Text>
      </View>
      <View style={styles.content}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Image source={require('../../../assets/icons/user-avatar.png')} style={{ width: 64, height: 64, borderRadius: 14, }} />
          <View style={{
            marginLeft: 15,
          }}>
            <Text semiBold size={18}>Cris Sang</Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Icon
                style={styles.starIcon}
                fill="#FAD647"
                name="star"
              />
              <View width={5} />
              <Text semiBold size={13}>4.9</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: theme.color.border,
          borderBottomWidth: 1,
          paddingBottom: 15,
          marginBottom: 15,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.color.border,
            height: 44,
            paddingHorizontal: 10,
            borderRadius: 8,
            flex: 1,
            marginRight: 15,
          }}>
            <Icon
              style={styles.chatIcon}
              fill="#8F9BB3"
              name="message-square-outline"
            />
            <Text size={12} color={theme.color.secondary}>Chat with your Therapist</Text>
          </View>
          <View style={{
            height: 44,
            width: 44,
            borderRadius: 8,
            borderColor: "#8F9BB3",
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Icon
              style={styles.phoneIcon}
              fill="#8F9BB3"
              name="phone-outline"
            />
          </View>
        </View>
        <Button appearance="rounded" status="warning" onPress={onConfirm}>
          Cancel Booking
        </Button>
      </View>
    </View>
  );
};

export default Arrived;

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.color.border,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: -20,
    marginRight: -20,
    marginTop: -15,
  },
  starIcon: {
    width: 18,
    height: 18,
  },
  content: {
    paddingVertical: 15,
    borderBottomColor: theme.color.border,
    borderBottomWidth: 1,
  },
  chatIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  footer: {
    paddingVertical: 15,
    paddingBottom: 0,
  },
  phoneIcon: {
    width: 24,
    height: 24,
  },
});
