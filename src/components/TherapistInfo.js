import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Icon} from '@ui-kitten/components';
import Text from './Text';
import theme from '../constants/theme';
import {ratingFormat} from '../helpers/display';

const TherapistInfo = ({data}) => {
  return (
    <View style={theme.block.rowMiddle}>
      <Image
        source={
          data?.avatar
            ? {uri: data.avatar}
            : require('../assets/icons/user-avatar.png')
        }
        style={styles.avatar}
      />
      <View width={15} />
      <View>
        <Text semiBold size={18}>
          {data?.name}
        </Text>
        <View style={theme.block.rowMiddle}>
          <Icon style={styles.starIcon} fill="#FAD647" name="star" />
          <View width={5} />
          <Text semiBold size={13}>
            {ratingFormat(data?.rating)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TherapistInfo;

const styles = StyleSheet.create({
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 14,
  },
  starIcon: {
    width: 18,
    height: 18,
  },
});
