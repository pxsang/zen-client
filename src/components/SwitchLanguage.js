import React, {useContext, useState} from 'react';
import {View, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {AppContext} from '../providers/AppProvider';
import {LANGUAGE, LANGUAGE_LIST} from '../constants/Constants';

const vietnameseFlag = require('../assets/icons/vietnam.png');
const englandFlag = require('../assets/icons/united-kingdom.png');

const SwitchLanguage = () => {
  const {language, switchLanguage} = useContext(AppContext);

  return (
    <>
      <View style={styles.container}>
        {LANGUAGE_LIST.map(({value}) => {
          const flag =
            value === LANGUAGE.ENGLISH ? englandFlag : vietnameseFlag;
          const isSelected = value === language;

          return (
            <TouchableWithoutFeedback
              key={value}
              onPress={() => switchLanguage(value)}>
              <View style={styles.flagContainer}>
                {!isSelected && <View style={styles.overlay} />}
                <Image source={flag} style={styles.flag} />
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </>
  );
};

export default SwitchLanguage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagContainer: {
    marginHorizontal: 5,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 1,
  },
  flag: {
    width: 36,
    height: 24,
    resizeMode: 'contain',
  },
});
