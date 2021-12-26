import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import theme from '../constants/theme';

import Image from './Image';
import Text from './Text';

const {width} = Dimensions.get('screen');

const Slide = ({title, description, image}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text center style={styles.title} i18nKey="welcome">{title}</Text>
        {/* <Text style={styles.description}>{description}</Text> */}
      </View>
      <Image
        source={image}
        style={styles.image}
      />
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.color.primary,
    marginBottom: 20,
  },
  description: {
    fontSize: 20,
    color: theme.color.primary,
    textAlign: 'center',
  },
  image: {
    width: width - 80,
    height: width - 80,
    resizeMode: 'contain',
  },
});
