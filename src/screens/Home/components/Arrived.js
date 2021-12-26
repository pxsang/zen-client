import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../../components/Text';
import TherapistInfo from '../../../components/TherapistInfo';
import TherapistContact from '../../../components/TherapistContact';

import theme from '../../../constants/theme';

const Arrived = ({t, sessionDetail}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text semiBold>{t('therapist_has_arrived')}</Text>
      </View>
      <View style={styles.content}>
        <TherapistInfo data={sessionDetail?.therapist} />
      </View>
      <View style={styles.footer}>
        <TherapistContact data={sessionDetail?.therapist} />
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
