import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';
import Image from './Image';
import {AppContext} from '../providers/AppProvider';
import theme from '../constants/theme';
import {priceFormat} from '../helpers/display';

const PaymentSummary = ({totalAmount}) => {
  const {t} = useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={theme.block.rowMiddle}>
        <Image
          source={require('../assets/icons/momo.png')}
          style={styles.icon}
        />
        <Text semiBold>{t('momo')}</Text>
      </View>
      <Text semiBold>{priceFormat(totalAmount)}</Text>
    </View>
  );
};

export default PaymentSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.color.border,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 15,
  },
});
