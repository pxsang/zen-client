import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../../components/Text';
import TherapistInfo from '../../../components/TherapistInfo';
import PaymentSummary from '../../../components/PaymentSummary';
import theme from '../../../constants/theme';
import useTranslate from '../../../hooks/useTranslate';

const Started = ({sessionDetail}) => {
  const t = useTranslate();

  const getMeaningTime = useCallback(() => {
    const delta = new Date().getTime() - sessionDetail?.started_at;
    const remaining =
      sessionDetail?.request_services[0].duration - delta / 60000;

    return remaining <= 0 ? 0 : Math.ceil(remaining);
  }, [sessionDetail]);

  let [meaningTime, setMeaningTime] = useState(getMeaningTime());

  useEffect(() => {
    let interval = setInterval(() => {
      setMeaningTime(getMeaningTime());
    }, 60 * 1000);

    if (meaningTime <= 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [meaningTime, sessionDetail, getMeaningTime]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={theme.block.rowMiddle}>
          <Text semiBold>{t('therapy_will_end_in')}</Text>
          <View style={styles.remainingContainer}>
            <Text semiBold>{t('mins', {mins: meaningTime})}</Text>
          </View>
        </View>
        <Text size={13} color={theme.color.secondary}>
          {sessionDetail?.request_services[0].group_service_name}
        </Text>
      </View>
      <View style={styles.content}>
        <TherapistInfo data={sessionDetail?.therapist} />
      </View>
      <View height={15} />
      <PaymentSummary totalAmount={sessionDetail?.total_amount} />
    </View>
  );
};

export default Started;

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
  },
  phoneIcon: {
    width: 24,
    height: 24,
  },
  massageTypeItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'rgba(241, 140, 142, 0.04)',
    borderRadius: 8,
    borderColor: theme.color.primary,
    borderWidth: 1,
  },
  remainingContainer: {
    backgroundColor: theme.color.gray,
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 20,
    marginLeft: 5,
  },
});
