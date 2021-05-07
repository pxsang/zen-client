import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Image} from 'react-native';
import {Icon} from '@ui-kitten/components';
import Text from '../../../components/Text';
import Button from '../../../components/Button';

import theme from '../../../constants/theme';

const WaitingForAccept = ({onBack, onConfirm}) => {
  return (
    <View>
      {/* <TouchableWithoutFeedback onPress={onBack}>
        <View style={styles.backContainer}>
          <Icon
            style={styles.backIcon}
            fill={theme.color.primary}
            name="arrow-back"
          />
        </View>
      </TouchableWithoutFeedback> */}
      <View style={{
        backgroundColor: theme.color.border,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <View style={{
          backgroundColor: theme.color.primary,
          width: 85,
          height: 72,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image source={require('../../../assets/images/looking.png')} style={{ width: 72, height: 72, resizeMode: 'contain' }} />
        </View>
        {/* <Icon style={styles.pinIcon} fill={theme.color.primary} name="pin" /> */}
        <View style={{
          marginLeft: 20,
        }}>
          <Text semiBold>Looking for a Therapist  </Text>
        </View>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.color.border,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        marginTop: 20,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Image source={require('../../../assets/icons/momo.png')} style={{ width: 32, height: 32, marginRight: 15 }} />
          <Text semiBold size={16}>MoMo</Text>
        </View>
        <Text semiBold>380,000đ</Text>
      </View>
      <View style={styles.footer}>
        <Button appearance="rounded" status="warning" onPress={onConfirm}>
          Cancel Booking
        </Button>
      </View>
    </View>
  );
};

export default WaitingForAccept;

const styles = StyleSheet.create({
  backContainer: {
    position: 'absolute',
    top: -70,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 28,
    height: 28,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.color.border,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  pinIcon: {
    width: 32,
    height: 32,
    marginRight: 15,
  },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopColor: theme.color.border,
    borderTopWidth: 1,
  },
});
