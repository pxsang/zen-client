import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../../../components/Text';
import Image from '../../../components/Image';
import useTranslate from '../../../hooks/useTranslate';

const DisabledUser = () => {
  const t = useTranslate();

  return (
    <View style={styles.container}>
      <Text bold size={24}>
        {t('account_deactivated')}
      </Text>
      <Image
        source={require('../../../assets/images/enable-location.png')}
        style={styles.image}
      />
      <Text center>{t('contact_us')}</Text>
    </View>
  );
};

export default DisabledUser;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 15,
  },
  button: {
    width: '100%',
  },
});
