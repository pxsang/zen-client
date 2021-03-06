import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {Icon} from '@ui-kitten/components';
import Text from '../../../components/Text';
import Button from '../../../components/Button';

import theme from '../../../constants/theme';
import useTranslate from '../../../hooks/useTranslate';

const ConfirmAddress = ({address, onBack, onConfirm, onChange}) => {
  const t = useTranslate();

  return (
    <View>
      <TouchableWithoutFeedback onPress={onBack}>
        <View style={styles.backContainer}>
          <Icon
            style={styles.backIcon}
            fill={theme.color.primary}
            name="arrow-back"
          />
        </View>
      </TouchableWithoutFeedback>
      {/* <TouchableWithoutFeedback onPress={onChange}> */}
      <View style={styles.addressContainer}>
        <Icon style={styles.pinIcon} fill={theme.color.primary} name="pin" />
        <View
          style={{
            flexShrink: 1,
          }}>
          <Text semiBold>{address.title}</Text>
          <View height={5} />
          <Text color={theme.color.secondary} size={12}>
            {address.address}
          </Text>
        </View>
      </View>
      {/* </TouchableWithoutFeedback> */}
      <View style={styles.footer}>
        <Button icon="arrow-forward-outline" onPress={onConfirm}>
          {t('confirm')}
        </Button>
      </View>
    </View>
  );
};

export default ConfirmAddress;

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
