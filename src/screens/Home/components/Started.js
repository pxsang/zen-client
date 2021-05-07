import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Image} from 'react-native';
import {Icon} from '@ui-kitten/components';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import {numberFormat} from '../../../helpers/display';
import {STATUS} from '../../../constants/Constants';
import theme from '../../../constants/theme';

const Started = ({onStatusChange, onBack, onConfirm}) => {
  let [meaningTime, setMeaningTime] = useState(10);

  useEffect(() => {
    let interval = setInterval(() => {
      setMeaningTime(meaningTime - 1);
    }, 1000);

    if (meaningTime === 0) {
      onStatusChange(STATUS.COMPLETED);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [meaningTime, onStatusChange]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text semiBold>
            Therapy will end in
          </Text>
          <View style={{ backgroundColor: theme.color.gray, paddingVertical: 3, paddingHorizontal: 7, borderRadius: 20, marginLeft: 5 }}>
            <Text semiBold>{meaningTime} mins</Text>
          </View>
        </View>
        <Text size={13} color={theme.color.secondary}>Thai or Swedish</Text>
      </View>
      <View style={styles.content}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Image source={require('../../../assets/icons/user-avatar.png')} style={{ width: 64, height: 64, borderRadius: 14 }} />
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
      {/* <View style={{
        paddingVertical: 15
      }}>
        <View style={styles.massageTypeItemContainer}>
          <View>
            <Text semiBold>Thai or Swedish</Text>
            <View height={5} />
            <Text size={12}>60 mins</Text>
          </View>
          <View>
            <Text semiBold>{numberFormat(380000)}đ</Text>
          </View>
        </View>
      </View> */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.color.border,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        marginTop: 15,
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
});
