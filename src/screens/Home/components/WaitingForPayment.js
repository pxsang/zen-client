import React, {useCallback} from 'react';
import {StyleSheet, View, Linking} from 'react-native';
import Text from '../../../components/Text';
import Image from '../../../components/Image';
import Button from '../../../components/Button';
import PaymentSummary from '../../../components/PaymentSummary';

import theme from '../../../constants/theme';
import useTranslate from '../../../hooks/useTranslate';

const WaitingForAccept = ({sessionDetail, onCancel}) => {
  const t = useTranslate();
  const handleRePayment = useCallback(
    () => Linking.openURL(sessionDetail.pay_url),
    [sessionDetail],
  );

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
          <Text semiBold>{t('waiting_for_payment')}</Text>
        </View>
      </View>
      <View height={20} />
      <PaymentSummary totalAmount={sessionDetail?.total_amount} />
      <View style={styles.footer}>
        <Button icon="arrow-forward-outline" onPress={handleRePayment}>
          {t('re_payment')}
        </Button>
        <View height={15} />
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
  },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopColor: theme.color.border,
    borderTopWidth: 1,
  },
});
