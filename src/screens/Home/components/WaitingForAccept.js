import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../../components/Text';
import Image from '../../../components/Image';
import Button from '../../../components/Button';
import PaymentSummary from '../../../components/PaymentSummary';
import theme from '../../../constants/theme';

const WaitingForAccept = ({t, sessionDetail, onCancel}) => {
  return (
    <View>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Image
            source={require('../../../assets/images/looking.png')}
            style={styles.image}
          />
        </View>
        <View width={20} />
        <View>
          <Text semiBold>{t('looking_for_a_therapist')}</Text>
        </View>
      </View>
      <View height={20} />
      <PaymentSummary totalAmount={sessionDetail?.total_amount} />
      <View style={styles.footer}>
        <Button appearance="rounded" status="warning" onPress={onCancel}>
          {t('cancel_booking')}
        </Button>
      </View>
    </View>
  );
};

export default WaitingForAccept;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: theme.color.border,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  content: {
    backgroundColor: theme.color.primary,
    width: 85,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
  },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopColor: theme.color.border,
    borderTopWidth: 1,
  },
});
