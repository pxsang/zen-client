import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const SwitchLanguage = () => {
  let [language, setLanguage] = useState('en');

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setLanguage('vi')}>
        <View style={styles.flagContainer}>
          {language !== 'vi' && <View style={styles.overlay} />}
          <Image source={require('../assets/icons/vietnam.png')} style={{ width: 36, height: 24, resizeMode: 'contain' }} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setLanguage('en')}>
        <View style={styles.flagContainer}>
          {language !== 'en' && <View style={styles.overlay} />}
          <Image source={require('../assets/icons/united-kingdom.png')} style={{ width: 36, height: 24, resizeMode: 'contain' }} />
        </View>
      </TouchableWithoutFeedback>
    </View>
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
});
