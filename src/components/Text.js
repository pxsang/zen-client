import React from 'react';
import {StyleSheet, Text as RNText} from 'react-native';
import I18n from '../i18n';

const Text = ({
  semiBold,
  bold,
  extraBold,
  children,
  center,
  size,
  color,
  style,
  i18nKey,
  ...otherProps
}) => {
  let textStyles = [styles.defaultStyle, style];

  if (semiBold) textStyles.push(styles.semiBold);
  if (bold) textStyles.push(styles.bold);
  if (extraBold) textStyles.push(styles.extraBold);

  if (center) textStyles.push(styles.center);

  if (size) textStyles.push(styles.size(size));

  if (color) textStyles.push({ color });

  return (
    <RNText {...otherProps} style={textStyles}>{children}</RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: 'Baloo2-Regular',
  },
  bold: {
    fontFamily: 'Baloo2-SemiBold',
  },
  semiBold: {
    fontFamily: 'Baloo2-Medium',
  },
  extraBold: {
    fontFamily: 'Baloo2-Bold',
  },
  center: {
    textAlign: 'center',
  },
  size: fontSize => ({
    fontSize,
  }),
});
