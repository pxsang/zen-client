import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Icon} from '@ui-kitten/components';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import TherapistContact from '../../../components/TherapistContact';
import TherapistInfo from '../../../components/TherapistInfo';

import theme from '../../../constants/theme';
import useTranslate from '../../../hooks/useTranslate';

const Accepted = ({sessionDetail, onCancel}) => {
  const t = useTranslate();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text semiBold>{t('therapist_is_coming')}</Text>
      </View>
      <View style={styles.content}>
        <TherapistInfo data={sessionDetail?.therapist} />
      </View>
      <View style={styles.footer}>
        <View style={styles.contactContainer}>
          <TherapistContact data={sessionDetail?.therapist} />
        </View>
        <Button appearance="rounded" status="warning" onPress={onCancel}>
          {t('cancel_booking')}
        </Button>
      </View>
    </View>
  );
};

export default Accepted;

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
  image: {
    width: 64,
    height: 64,
    borderRadius: 14,
  },
  contactContainer: {
    borderBottomColor: theme.color.border,
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 15,
  },
});
